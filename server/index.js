import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { Database } from './db.js'
import { TestRunner } from './test-runner.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3001

// Initialize database and test runner
const db = new Database()
const testRunner = new TestRunner()

app.use(cors())
app.use(express.json())
app.use('/content', express.static(path.join(__dirname, '../content')))

// Get all projects with their status
app.get('/api/projects', (req, res) => {
    try {
        const projects = db.getProjects()
        res.json(projects)
    } catch (error) {
        console.error('Failed to get projects:', error)
        res.status(500).json({ error: 'Failed to load projects' })
    }
})

// Update project status
app.patch('/api/projects/:id/status', (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        
        if (!['not-started', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' })
        }
        
        db.updateProjectStatus(id, status)
        res.json({ success: true })
    } catch (error) {
        console.error('Failed to update project status:', error)
        res.status(500).json({ error: 'Failed to update project status' })
    }
})

// Run tests for a project
app.post('/api/test/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params
        const result = await testRunner.runProjectTests(projectId)
        res.json(result)
    } catch (error) {
        console.error('Failed to run tests:', error)
        res.status(500).json({ error: 'Failed to run tests' })
    }
})

// Record completion
app.post('/api/completions', (req, res) => {
    try {
        const { projectId } = req.body
        db.recordCompletion(projectId)
        res.json({ success: true })
    } catch (error) {
        console.error('Failed to record completion:', error)
        res.status(500).json({ error: 'Failed to record completion' })
    }
})

// Get user stats
app.get('/api/stats', (req, res) => {
    try {
        const stats = db.getStats()
        res.json(stats)
    } catch (error) {
        console.error('Failed to get stats:', error)
        res.status(500).json({ error: 'Failed to load stats' })
    }
})

app.listen(port, () => {
    console.log(`🎯 Dev Daily server running at http://localhost:${port}`)
    console.log(`📊 Frontend at http://localhost:3000`)
})