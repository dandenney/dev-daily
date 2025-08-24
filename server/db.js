import SQLiteDatabase from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class Database {
    constructor() {
        const dbPath = path.join(__dirname, '../data/dev-daily.db')
        
        // Ensure data directory exists
        const dataDir = path.dirname(dbPath)
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }
        
        this.db = new SQLiteDatabase(dbPath)
        this.init()
        this.seedProjects()
    }

    init() {
        // Projects table
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT NOT NULL,
                status TEXT DEFAULT 'not-started',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)

        // Completions table for tracking daily practice
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS completions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id TEXT NOT NULL,
                completed_at DATE NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (project_id) REFERENCES projects (id),
                UNIQUE(project_id, completed_at)
            )
        `)

        // Trigger to update project updated_at
        this.db.exec(`
            CREATE TRIGGER IF NOT EXISTS update_project_timestamp 
            AFTER UPDATE ON projects
            BEGIN
                UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
            END
        `)
    }

    seedProjects() {
        // Load projects from JSON file
        const projectsPath = path.join(__dirname, '../data/projects.json')
        if (!fs.existsSync(projectsPath)) {
            console.warn('projects.json not found, skipping project seeding')
            return
        }

        const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'))
        
        // Add any new projects that don't exist
        const insertOrUpdate = this.db.prepare(`
            INSERT OR REPLACE INTO projects (id, name, category, description, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, 
                COALESCE((SELECT status FROM projects WHERE id = ?), 'not-started'),
                COALESCE((SELECT created_at FROM projects WHERE id = ?), CURRENT_TIMESTAMP),
                CURRENT_TIMESTAMP
            )
        `)

        projects.forEach(project => {
            insertOrUpdate.run(
                project.id, project.name, project.category, project.description,
                project.id, project.id  // For the COALESCE queries
            )
        })
    }

    getProjects() {
        return this.db.prepare(`
            SELECT * FROM projects 
            ORDER BY category, name
        `).all()
    }

    updateProjectStatus(projectId, status) {
        const stmt = this.db.prepare(`
            UPDATE projects 
            SET status = ? 
            WHERE id = ?
        `)
        return stmt.run(status, projectId)
    }

    recordCompletion(projectId) {
        const today = new Date().toISOString().split('T')[0]
        
        try {
            this.db.prepare(`
                INSERT INTO completions (project_id, completed_at)
                VALUES (?, ?)
            `).run(projectId, today)
            
            // Update project status to completed
            this.updateProjectStatus(projectId, 'completed')
        } catch (error) {
            // Ignore duplicate completions for the same day
            if (!error.message.includes('UNIQUE constraint failed')) {
                throw error
            }
        }
    }

    getStats() {
        // Total completed projects
        const totalCompleted = this.db.prepare(`
            SELECT COUNT(DISTINCT project_id) as count 
            FROM completions
        `).get().count

        // Current streak calculation
        const currentStreak = this.calculateCurrentStreak()
        
        // Longest streak calculation
        const longestStreak = this.calculateLongestStreak()

        return {
            totalCompleted,
            currentStreak,
            longestStreak
        }
    }

    calculateCurrentStreak() {
        const completions = this.db.prepare(`
            SELECT DISTINCT completed_at 
            FROM completions 
            ORDER BY completed_at DESC
        `).all()

        if (completions.length === 0) return 0

        const today = new Date()
        const todayStr = today.toISOString().split('T')[0]
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        let streak = 0
        let currentDate = new Date()

        // Check if we practiced today or yesterday
        if (completions[0].completed_at === todayStr) {
            streak = 1
            currentDate.setDate(currentDate.getDate() - 1)
        } else if (completions[0].completed_at === yesterdayStr) {
            streak = 1
            currentDate.setDate(currentDate.getDate() - 2)
        } else {
            return 0 // Streak broken
        }

        // Count consecutive days
        for (let i = 1; i < completions.length; i++) {
            const expectedDate = currentDate.toISOString().split('T')[0]
            if (completions[i].completed_at === expectedDate) {
                streak++
                currentDate.setDate(currentDate.getDate() - 1)
            } else {
                break
            }
        }

        return streak
    }

    calculateLongestStreak() {
        const completions = this.db.prepare(`
            SELECT DISTINCT completed_at 
            FROM completions 
            ORDER BY completed_at ASC
        `).all()

        if (completions.length === 0) return 0

        let longestStreak = 1
        let currentStreak = 1

        for (let i = 1; i < completions.length; i++) {
            const prevDate = new Date(completions[i - 1].completed_at)
            const currDate = new Date(completions[i].completed_at)
            
            // Check if dates are consecutive
            const diffTime = currDate.getTime() - prevDate.getTime()
            const diffDays = diffTime / (1000 * 60 * 60 * 24)

            if (diffDays === 1) {
                currentStreak++
            } else {
                longestStreak = Math.max(longestStreak, currentStreak)
                currentStreak = 1
            }
        }

        return Math.max(longestStreak, currentStreak)
    }
}