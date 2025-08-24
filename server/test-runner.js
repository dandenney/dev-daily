import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class TestRunner {
    constructor() {
        this.contentPath = path.join(__dirname, '../content')
    }

    async runProjectTests(projectId) {
        try {
            // Find the project directory
            const projectPath = this.findProjectPath(projectId)
            if (!projectPath) {
                return {
                    success: false,
                    error: `Project '${projectId}' not found`
                }
            }

            const testsPath = path.join(projectPath, 'tests')
            if (!fs.existsSync(testsPath)) {
                return {
                    success: false,
                    error: 'No tests found for this project'
                }
            }

            // Run vitest on the specific test directory
            const result = await this.executeTests(testsPath)
            return result
        } catch (error) {
            console.error('Test execution error:', error)
            return {
                success: false,
                error: error.message
            }
        }
    }

    findProjectPath(projectId) {
        // Search through all categories
        const categories = fs.readdirSync(this.contentPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)

        for (const category of categories) {
            const categoryPath = path.join(this.contentPath, category)
            const projectPath = path.join(categoryPath, projectId)
            
            if (fs.existsSync(projectPath)) {
                return projectPath
            }
        }

        return null
    }

    executeTests(testsPath) {
        return new Promise((resolve) => {
            const command = `npx vitest run "${testsPath}" --reporter=verbose`
            
            exec(command, { 
                cwd: path.join(__dirname, '..'),
                timeout: 30000 // 30 second timeout
            }, (error, stdout, stderr) => {
                const result = this.parseTestOutput(stdout + stderr, !!error)
                
                if (error && !result.hasTestResults) {
                    // True execution error, not test failures
                    resolve({
                        success: false,
                        error: 'Failed to run tests',
                        message: 'There was an issue running your tests. Check your code and try again.',
                        details: stderr || error.message
                    })
                } else if (error || result.failedTests.length > 0) {
                    // Test failures
                    const failedCount = result.failedTests.length
                    const passedCount = result.passedTests
                    const totalCount = result.totalTests
                    
                    let message
                    if (failedCount === 1) {
                        message = passedCount > 0 ? 
                            `${passedCount}/${totalCount} tests passing - just 1 more to go! 💪` :
                            'One test failed - you\'re close! 💪'
                    } else {
                        message = passedCount > 0 ? 
                            `${passedCount}/${totalCount} tests passing - ${failedCount} still need work! 💪` :
                            `${failedCount} tests failed - keep going! 💪`
                    }
                    
                    resolve({
                        success: false,
                        ...result,
                        message
                    })
                } else {
                    // All tests passed
                    resolve({
                        success: true,
                        ...result,
                        message: result.totalTests === 1 ? 
                            'Perfect! Your test is passing! 🎉' :
                            `Excellent! All ${result.totalTests} tests are passing! 🎉`
                    })
                }
            })
        })
    }

    parseTestOutput(output, hasErrors = false) {
        const lines = output.split('\n')
        
        // Count passed tests (✓) and failed tests (×)
        const passedCount = (output.match(/✓/g) || []).length
        const failedCount = (output.match(/×/g) || []).length
        
        // Parse failed tests - look for × symbols and test names
        const failedTests = []
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim()
            
            if (line.includes('×') && line.includes('>')) {
                // Extract test name after the last > and clean up ANSI codes
                const testNameMatch = line.match(/.*> (.*)$/)
                if (testNameMatch) {
                    const testName = this.cleanAnsiCodes(testNameMatch[1].trim())
                    
                    // Look for the error message on the next line
                    let errorMessage = 'Test failed'
                    
                    // Check next line for the → symbol with error details
                    if (i + 1 < lines.length) {
                        const nextLine = lines[i + 1].trim()
                        if (nextLine.startsWith('→')) {
                            errorMessage = this.cleanAnsiCodes(nextLine.replace(/^→\s*/, '').trim())
                        }
                    }
                    
                    failedTests.push({
                        name: testName,
                        error: errorMessage
                    })
                }
            }
        }
        
        const totalTests = passedCount + failedCount
        const hasTestResults = totalTests > 0 || output.includes('Test Files') || output.includes('RUN')
        
        return {
            totalTests,
            passedTests: passedCount,
            failedTests,
            summary: `${passedCount}/${totalTests} tests passed`,
            hasTestResults
        }
    }

    cleanAnsiCodes(text) {
        // Remove ANSI escape sequences (color codes, formatting, etc.)
        return text
            .replace(/\u001b\[[0-9;]*m/g, '') // Standard ANSI codes
            .replace(/\[22m/g, '') // Specific ANSI remnant we're seeing
            .replace(/\[2m/g, '') // Another common one
            .trim()
    }
}