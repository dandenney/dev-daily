import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React useState Counter Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/usestate-counter/starter/Counter.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function Counter')
  })

  it('should import useState from react', () => {
    const filePath = path.join(process.cwd(), 'content/react/usestate-counter/starter/Counter.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { useState } from "react"')
  })

  it('should use useState hook', () => {
    const filePath = path.join(process.cwd(), 'content/react/usestate-counter/starter/Counter.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/useState\s*\(/i)
  })

  it('should display count in paragraph', () => {
    const filePath = path.join(process.cwd(), 'content/react/usestate-counter/starter/Counter.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/<p>Count:\s*\{.*\}<\/p>/i)
  })

  it('should have a button with onClick handler', () => {
    const filePath = path.join(process.cwd(), 'content/react/usestate-counter/starter/Counter.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('<button')
    expect(componentCode).toMatch(/onClick=\{/i)
  })

  it('should use setCount to update state', () => {
    const filePath = path.join(process.cwd(), 'content/react/usestate-counter/starter/Counter.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/setCount/i)
  })
})