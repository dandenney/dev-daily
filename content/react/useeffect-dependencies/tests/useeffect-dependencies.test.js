import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React useEffect Dependencies Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-dependencies/starter/FilteredJokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function FilteredJokes')
  })

  it('should import useEffect and useState from react', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-dependencies/starter/FilteredJokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { useEffect, useState } from "react"')
  })

  it('should use useEffect with dependency array', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-dependencies/starter/FilteredJokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/useEffect\s*\(/i)
    expect(componentCode).toMatch(/\}\s*,\s*\[.*showTold.*allJokes.*\]/i)
  })

  it('should filter allJokes based on showTold', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-dependencies/starter/FilteredJokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/allJokes\.filter/i)
    expect(componentCode).toMatch(/j\.told/i)
  })

  it('should have toggle button with conditional text', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-dependencies/starter/FilteredJokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/showTold\s*\?\s*["']Show All["']/i)
    expect(componentCode).toMatch(/["']Show Told Only["']/i)
  })

  it('should render filtered jokes with keys', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-dependencies/starter/FilteredJokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/filtered\.map/i)
    expect(componentCode).toMatch(/key=\{.*\.id\}/i)
  })
})