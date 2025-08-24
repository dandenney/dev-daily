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
                if (error) {
                    // Check if it's a test failure vs execution error
                    if (error.code === 1 && stdout.includes('FAILED')) {
                        resolve({
                            success: false,
                            results: stdout + stderr,
                            error: 'Some tests failed'
                        })
                    } else {
                        resolve({
                            success: false,
                            error: error.message,
                            results: stderr
                        })
                    }
                } else {
                    // All tests passed
                    resolve({
                        success: true,
                        results: stdout
                    })
                }
            })
        })
    }
}