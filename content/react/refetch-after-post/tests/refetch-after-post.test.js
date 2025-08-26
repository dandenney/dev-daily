import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Re-fetch After POST Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/refetch-after-post/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function JokeApp')
  })

  it('should import useEffect and useState from react', () => {
    const filePath = path.join(process.cwd(), 'content/react/refetch-after-post/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { useEffect, useState } from "react"')
  })

  it('should have both getAllJokes and createJoke functions', () => {
    const filePath = path.join(process.cwd(), 'content/react/refetch-after-post/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/function getAllJokes/i)
    expect(componentCode).toMatch(/function createJoke/i)
  })

  it('should use useEffect to fetch jokes on mount', () => {
    const filePath = path.join(process.cwd(), 'content/react/refetch-after-post/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/useEffect\s*\(/i)
    expect(componentCode).toMatch(/getAllJokes\(\)\.then/i)
  })

  it('should call getAllJokes again in handleSave', () => {
    const filePath = path.join(process.cwd(), 'content/react/refetch-after-post/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    const getAllJokesMatches = componentCode.match(/getAllJokes\s*\(\s*\)/g)
    expect(getAllJokesMatches).not.toBeNull()
    expect(getAllJokesMatches.length).toBeGreaterThanOrEqual(2)
  })

  it('should have controlled input and add button', () => {
    const filePath = path.join(process.cwd(), 'content/react/refetch-after-post/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/value=\{text\}/i)
    expect(componentCode).toMatch(/onClick=\{handleSave\}/i)
  })
})