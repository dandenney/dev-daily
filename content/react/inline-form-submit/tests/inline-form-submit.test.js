import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Inline Form Submit Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/inline-form-submit/starter/JokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function JokeForm')
  })

  it('should import useState from react', () => {
    const filePath = path.join(process.cwd(), 'content/react/inline-form-submit/starter/JokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { useState } from "react"')
  })

  it('should destructure onAdd from props', () => {
    const filePath = path.join(process.cwd(), 'content/react/inline-form-submit/starter/JokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/\{\s*onAdd\s*\}/i)
  })

  it('should prevent default in submit handler', () => {
    const filePath = path.join(process.cwd(), 'content/react/inline-form-submit/starter/JokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/e\.preventDefault\s*\(\s*\)/i)
  })

  it('should call onAdd with text', () => {
    const filePath = path.join(process.cwd(), 'content/react/inline-form-submit/starter/JokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/onAdd\s*\(\s*text/i)
  })

  it('should clear input after submission', () => {
    const filePath = path.join(process.cwd(), 'content/react/inline-form-submit/starter/JokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/setText\s*\(\s*[""'']/i)
  })

  it('should have form with onSubmit handler', () => {
    const filePath = path.join(process.cwd(), 'content/react/inline-form-submit/starter/JokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/<form.*onSubmit=\{submit\}/i)
  })

  it('should have submit button with proper type', () => {
    const filePath = path.join(process.cwd(), 'content/react/inline-form-submit/starter/JokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/<button.*type=["']submit["']/i)
  })
})