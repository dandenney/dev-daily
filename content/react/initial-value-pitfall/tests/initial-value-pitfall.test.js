import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Initial Value Pitfall Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/initial-value-pitfall/starter/Tickets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function Tickets')
  })

  it('should import useState from react', () => {
    const filePath = path.join(process.cwd(), 'content/react/initial-value-pitfall/starter/Tickets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { useState } from "react"')
  })

  it('should initialize useState with empty array', () => {
    const filePath = path.join(process.cwd(), 'content/react/initial-value-pitfall/starter/Tickets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/useState\s*\(\s*\[\s*\]\s*\)/i)
  })

  it('should not initialize with undefined', () => {
    const filePath = path.join(process.cwd(), 'content/react/initial-value-pitfall/starter/Tickets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).not.toMatch(/useState\s*\(\s*\)/i)
    expect(componentCode).not.toMatch(/useState\s*\(\s*undefined\s*\)/i)
  })

  it('should use map method on allTickets', () => {
    const filePath = path.join(process.cwd(), 'content/react/initial-value-pitfall/starter/Tickets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/allTickets\.map/i)
  })

  it('should render tickets with keys and titles', () => {
    const filePath = path.join(process.cwd(), 'content/react/initial-value-pitfall/starter/Tickets.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/key=\{.*\.id\}/i)
    expect(componentCode).toMatch(/\{.*\.title\}/i)
  })
})