import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React useEffect Initial Fetch Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-initial-fetch/starter/Jokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function Jokes')
  })

  it('should import useEffect and useState from react', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-initial-fetch/starter/Jokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { useEffect, useState } from "react"')
  })

  it('should initialize state with empty array', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-initial-fetch/starter/Jokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/useState\s*\(\s*\[\s*\]\s*\)/i)
  })

  it('should use useEffect with empty dependency array', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-initial-fetch/starter/Jokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/useEffect\s*\(/i)
    expect(componentCode).toMatch(/\}\s*,\s*\[\s*\]\s*\)/i)
  })

  it('should call getAllJokes in useEffect', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-initial-fetch/starter/Jokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/getAllJokes\s*\(\s*\)/i)
  })

  it('should render jokes using map with keys', () => {
    const filePath = path.join(process.cwd(), 'content/react/useeffect-initial-fetch/starter/Jokes.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/allJokes\.map/i)
    expect(componentCode).toMatch(/key=\{.*\.id\}/i)
    expect(componentCode).toContain('<li')
  })
})