# Dev Daily

A local-first daily coding practice app that helps developers maintain consistent practice with bite-sized projects.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the app: `npm run dev`
4. Open `http://localhost:3000` in your browser

The app will automatically create a local database to track your progress and streaks.

## Creating New Projects

To add new practice projects to the app:

### 1. Create the Project Structure

```bash
mkdir -p content/[category]/[project-id]/starter
mkdir -p content/[category]/[project-id]/solution
mkdir -p content/[category]/[project-id]/tests
```

Where:
- `[category]` is one of: `html-css`, `javascript`, `react`
- `[project-id]` is a unique identifier (kebab-case)

### 2. Add Project Files

Create the following files:

**`content/[category]/[project-id]/README.md`**
```markdown
# Project Name

Brief description of what students will build.

## Requirements

- List specific requirements
- Include expected behavior
- Mention any constraints

## Getting Started

1. Navigate to the starter directory: `cd content/[category]/[project-id]/starter`
2. Open `index.html` in your browser
3. Edit the files to meet the requirements
4. Run tests to verify completion

## Testing

From the main app, click "Run Tests" to verify your solution.
```

**`content/[category]/[project-id]/starter/`**
- Add starter files (usually `index.html`, `styles.css`, `main.js`)
- Include minimal boilerplate to get students started

**`content/[category]/[project-id]/solution/`**
- Add complete working solution
- Use as reference for tests

**`content/[category]/[project-id]/tests/[project-id].test.js`**
- Write Vitest tests that validate the solution
- Tests should check DOM elements, functionality, styling, etc.

### 3. Add to Project Registry

Add your project to `data/projects.json`:

```json
{
  "id": "your-project-id",
  "name": "Your Project Name", 
  "category": "javascript",
  "description": "Brief description of the project.<br><br>Setup: <code>cd content/javascript/your-project-id/starter</code>"
}
```

### 4. Test Your Project

1. Restart the dev server: `npm run dev`
2. Your project should appear in the app
3. Click "Start" to open the starter files
4. Click "Run Tests" to verify the test suite works

## Project Categories

- **html-css**: Static HTML/CSS projects focusing on layout, styling, and responsive design
- **javascript**: Vanilla JavaScript projects for DOM manipulation, algorithms, and interactivity  
- **react**: React component and application projects

## Example Project Structure

```
content/
├── javascript/
│   └── todo-list/
│       ├── README.md
│       ├── starter/
│       │   ├── index.html
│       │   ├── styles.css
│       │   └── main.js
│       ├── solution/
│       │   ├── index.html
│       │   ├── styles.css
│       │   └── main.js
│       └── tests/
│           └── todo-list.test.js
```
