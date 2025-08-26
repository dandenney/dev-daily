import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Conditional Render Empty State Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/conditional-render-empty/starter/JokeList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function JokeList')
  })

  it('should destructure jokes from props', () => {
    const filePath = path.join(process.cwd(), 'content/react/conditional-render-empty/starter/JokeList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/\{\s*jokes\s*\}/i)
  })

  it('should check jokes.length for conditional rendering', () => {
    const filePath = path.join(process.cwd(), 'content/react/conditional-render-empty/starter/JokeList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/jokes\.length/i)
  })

  it('should return empty state message', () => {
    const filePath = path.join(process.cwd(), 'content/react/conditional-render-empty/starter/JokeList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/Add your first one-liner/i)
  })

  it('should map over jokes when not empty', () => {
    const filePath = path.join(process.cwd(), 'content/react/conditional-render-empty/starter/JokeList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/jokes\.map/i)
  })

  it('should use proper keys in list items', () => {
    const filePath = path.join(process.cwd(), 'content/react/conditional-render-empty/starter/JokeList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/key=\{.*\.id\}/i)
  })
})