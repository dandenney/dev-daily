class DevDaily {
    constructor() {
        this.projects = []
        this.stats = {
            totalCompleted: 0,
            currentStreak: 0,
            longestStreak: 0
        }
        this.currentFilter = 'all'
        this.init()
    }

    async init() {
        await this.loadProjects()
        await this.loadStats()
        this.renderProjects()
        this.renderStats()
        this.bindEvents()
    }

    async loadProjects() {
        try {
            const response = await fetch('/api/projects')
            this.projects = await response.json()
        } catch (error) {
            console.error('Failed to load projects:', error)
            this.projects = []
        }
    }

    async loadStats() {
        try {
            const response = await fetch('/api/stats')
            this.stats = await response.json()
        } catch (error) {
            console.error('Failed to load stats:', error)
        }
    }

    renderStats() {
        document.getElementById('totalCompleted').textContent = this.stats.totalCompleted
        document.getElementById('currentStreak').textContent = this.stats.currentStreak
        document.getElementById('longestStreak').textContent = this.stats.longestStreak
        document.querySelector('.streak-count').textContent = this.stats.currentStreak
    }

    renderProjects() {
        const grid = document.getElementById('projectsGrid')
        const filteredProjects = this.currentFilter === 'all' 
            ? this.projects 
            : this.projects.filter(p => p.category === this.currentFilter)

        if (filteredProjects.length === 0) {
            grid.innerHTML = '<div class="loading">No projects found</div>'
            return
        }

        grid.innerHTML = filteredProjects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-card-header">
                    <div>
                        <div class="project-title">${project.name}</div>
                        <div class="project-category">${project.category}</div>
                    </div>
                    <div class="project-status ${project.status}">
                        ${this.formatStatus(project.status)}
                    </div>
                </div>
                <div class="project-card-body">
                    <div class="project-description">${project.description}</div>
                    <div class="project-actions">
                        <button class="btn btn-primary" onclick="devDaily.openProject('${project.id}')">
                            ${project.status === 'not-started' ? 'Start' : 'Continue'}
                        </button>
                        <button class="btn btn-secondary" onclick="devDaily.runTests('${project.id}')" 
                                ${project.status === 'not-started' ? 'disabled' : ''}>
                            Run Tests
                        </button>
                    </div>
                </div>
            </div>
        `).join('')
    }

    formatStatus(status) {
        return status.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }

    bindEvents() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.filter-btn.active').classList.remove('active')
                e.target.classList.add('active')
                this.currentFilter = e.target.dataset.category
                this.renderProjects()
            })
        })
    }

    async openProject(projectId) {
        const project = this.projects.find(p => p.id === projectId)
        if (!project) return

        // Open project in new window/tab
        const projectUrl = `/content/${project.category}/${project.id}/starter/index.html`
        window.open(projectUrl, '_blank')

        // Mark as in progress if not started
        if (project.status === 'not-started') {
            await this.updateProjectStatus(projectId, 'in-progress')
        }
    }

    async runTests(projectId) {
        const project = this.projects.find(p => p.id === projectId)
        if (!project) return

        // Show loading state
        const button = document.querySelector(`button[onclick="devDaily.runTests('${projectId}')"]`)
        const originalText = button.textContent
        button.textContent = 'Running Tests...'
        button.disabled = true

        try {
            const response = await fetch(`/api/test/${projectId}`, { method: 'POST' })
            const result = await response.json()
            
            this.showTestResults(result, project)
            
            if (result.success && project.status !== 'completed') {
                await this.updateProjectStatus(projectId, 'completed')
                await this.recordCompletion(projectId)
            }
        } catch (error) {
            console.error('Failed to run tests:', error)
            this.showTestResults({
                success: false,
                message: 'Failed to run tests. Please try again.',
                error: 'Network or server error'
            })
        } finally {
            // Restore button state
            button.textContent = originalText
            button.disabled = false
        }
    }

    showTestResults(result, project) {
        // Create modal overlay
        const modal = document.createElement('div')
        modal.className = 'test-modal-overlay'
        modal.innerHTML = `
            <div class="test-modal">
                <div class="test-modal-header">
                    <h3>${result.success ? '🎉 Tests Passed!' : '🔍 Tests Need Work'}</h3>
                    <button class="close-modal" onclick="this.closest('.test-modal-overlay').remove()">&times;</button>
                </div>
                <div class="test-modal-body">
                    <p class="test-message">${result.message || (result.success ? 'All tests passed!' : 'Some tests failed')}</p>
                    ${result.summary ? `<p class="test-summary">${result.summary}</p>` : ''}
                    ${result.failedTests && result.failedTests.length > 0 ? `
                        <div class="failed-tests">
                            <h4>Failed Tests:</h4>
                            <ul>
                                ${result.failedTests.map(test => `
                                    <li>
                                        <strong>${test.name}</strong>
                                        ${test.error ? `<div class="test-error">${this.formatTestError(test.error)}</div>` : ''}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${result.details ? `<details><summary>Technical Details</summary><pre>${result.details}</pre></details>` : ''}
                </div>
                <div class="test-modal-footer">
                    ${result.success ? 
                        '<button class="btn btn-primary" onclick="this.closest(\'.test-modal-overlay\').remove()">Awesome!</button>' :
                        '<button class="btn btn-primary" onclick="this.closest(\'.test-modal-overlay\').remove()">I\'ll fix this</button>'
                    }
                </div>
            </div>
        `
        
        document.body.appendChild(modal)
        
        // Auto-remove on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove()
            }
        })
    }

    formatTestError(error) {
        // Clean up common vitest error patterns to be more user-friendly
        return error
            .replace(/Error: /g, '')
            .replace(/AssertionError: /g, '')
            .replace(/\u001b\[[0-9;]*m/g, '') // Remove any remaining ANSI codes
            .replace(/\[22m/g, '') // Clean up specific ANSI remnants
            .replace(/Expected.*Received.*/gs, (match) => {
                return `<div class="assertion-error">${match}</div>`
            })
            .replace(/\n/g, '<br>')
            .trim()
    }

    async updateProjectStatus(projectId, status) {
        try {
            await fetch(`/api/projects/${projectId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })
            
            // Update local state
            const project = this.projects.find(p => p.id === projectId)
            if (project) {
                project.status = status
                this.renderProjects()
            }
        } catch (error) {
            console.error('Failed to update project status:', error)
        }
    }

    async recordCompletion(projectId) {
        try {
            await fetch('/api/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId })
            })
            
            // Reload stats to update streaks
            await this.loadStats()
            this.renderStats()
        } catch (error) {
            console.error('Failed to record completion:', error)
        }
    }
}

// Initialize the app
window.devDaily = new DevDaily()