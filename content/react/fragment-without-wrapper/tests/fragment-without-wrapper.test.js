import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Fragment Without Wrapper Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/fragment-without-wrapper/starter/Tips.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function Tips')
  })

  it('should use React Fragment syntax', () => {
    const filePath = path.join(process.cwd(), 'content/react/fragment-without-wrapper/starter/Tips.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/<>|<React\.Fragment>/i)
  })

  it('should return two p elements', () => {
    const filePath = path.join(process.cwd(), 'content/react/fragment-without-wrapper/starter/Tips.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    const pMatches = componentCode.match(/<p>/g)
    expect(pMatches).not.toBeNull()
    expect(pMatches.length).toBe(2)
  })

  it('should not use div wrapper', () => {
    const filePath = path.join(process.cwd(), 'content/react/fragment-without-wrapper/starter/Tips.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).not.toContain('<div>')
  })
})