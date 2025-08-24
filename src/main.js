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

        try {
            const response = await fetch(`/api/test/${projectId}`, { method: 'POST' })
            const result = await response.json()
            
            if (result.success) {
                alert(`Tests passed! ✅\n${result.results}`)
                if (project.status !== 'completed') {
                    await this.updateProjectStatus(projectId, 'completed')
                    await this.recordCompletion(projectId)
                }
            } else {
                alert(`Tests failed ❌\n${result.error || result.results}`)
            }
        } catch (error) {
            console.error('Failed to run tests:', error)
            alert('Failed to run tests. Please try again.')
        }
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