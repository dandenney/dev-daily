import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Controlled Input Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/controlled-input/starter/NewJoke.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function NewJoke')
  })

  it('should import useState from react', () => {
    const filePath = path.join(process.cwd(), 'content/react/controlled-input/starter/NewJoke.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { useState } from "react"')
  })

  it('should use useState hook', () => {
    const filePath = path.join(process.cwd(), 'content/react/controlled-input/starter/NewJoke.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/useState\s*\(/i)
  })

  it('should have an input with onChange handler', () => {
    const filePath = path.join(process.cwd(), 'content/react/controlled-input/starter/NewJoke.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('<input')
    expect(componentCode).toMatch(/onChange=\{/i)
  })

  it('should have an input with value prop', () => {
    const filePath = path.join(process.cwd(), 'content/react/controlled-input/starter/NewJoke.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/value=\{/i)
  })

  it('should display preview text in paragraph', () => {
    const filePath = path.join(process.cwd(), 'content/react/controlled-input/starter/NewJoke.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/<p>Preview:\s*\{.*\}<\/p>/i)
  })
})