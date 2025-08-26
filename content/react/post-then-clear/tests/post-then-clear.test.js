import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React POST then Clear Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/post-then-clear/starter/NewJokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function NewJokeForm')
  })

  it('should import useState from react', () => {
    const filePath = path.join(process.cwd(), 'content/react/post-then-clear/starter/NewJokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { useState } from "react"')
  })

  it('should have createJoke function that returns a Promise', () => {
    const filePath = path.join(process.cwd(), 'content/react/post-then-clear/starter/NewJokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/function createJoke/i)
    expect(componentCode).toMatch(/Promise\.resolve/i)
  })

  it('should have async handleSave function', () => {
    const filePath = path.join(process.cwd(), 'content/react/post-then-clear/starter/NewJokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/const handleSave = async|async.*handleSave/i)
  })

  it('should call createJoke and setText in handleSave', () => {
    const filePath = path.join(process.cwd(), 'content/react/post-then-clear/starter/NewJokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/createJoke\s*\(/i)
    expect(componentCode).toMatch(/setText\s*\(\s*[""'']/i)
  })

  it('should have controlled input and save button', () => {
    const filePath = path.join(process.cwd(), 'content/react/post-then-clear/starter/NewJokeForm.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/value=\{text\}/i)
    expect(componentCode).toMatch(/onChange=\{/i)
    expect(componentCode).toMatch(/onClick=\{handleSave\}/i)
  })
})