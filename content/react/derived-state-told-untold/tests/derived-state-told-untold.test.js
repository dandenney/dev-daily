import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Derived State Told vs Untold Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/derived-state-told-untold/starter/JokeBuckets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function JokeBuckets')
  })

  it('should destructure allJokes from props', () => {
    const filePath = path.join(process.cwd(), 'content/react/derived-state-told-untold/starter/JokeBuckets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/\{\s*allJokes\s*\}/i)
  })

  it('should filter allJokes into told and untold', () => {
    const filePath = path.join(process.cwd(), 'content/react/derived-state-told-untold/starter/JokeBuckets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/allJokes\.filter/i)
    expect(componentCode).toMatch(/!j\.told|j\.told\s*===\s*false/i)
    expect(componentCode).toMatch(/j\.told\s*(?:===\s*true)?(?!\s*===\s*false)/i)
  })

  it('should display counts in headings', () => {
    const filePath = path.join(process.cwd(), 'content/react/derived-state-told-untold/starter/JokeBuckets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/<h3>.*\{.*\.length\}.*<\/h3>/i)
  })

  it('should map over both told and untold arrays', () => {
    const filePath = path.join(process.cwd(), 'content/react/derived-state-told-untold/starter/JokeBuckets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    const mapMatches = componentCode.match(/\.map\(/g)
    expect(mapMatches).not.toBeNull()
    expect(mapMatches.length).toBeGreaterThanOrEqual(2)
  })

  it('should use keys in list items', () => {
    const filePath = path.join(process.cwd(), 'content/react/derived-state-told-untold/starter/JokeBuckets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/key=\{.*\.id\}/i)
  })
})