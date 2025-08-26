import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Map to Markup Challenge', () => {
  let componentCode

  it('should export a default function', async () => {
    const filePath = path.join(process.cwd(), 'content/react/map-to-markup/starter/VenuesList.jsx')
    componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function VenuesList')
  })

  it('should use map method to render list items', () => {
    const filePath = path.join(process.cwd(), 'content/react/map-to-markup/starter/VenuesList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/venues\.map\s*\(/i)
  })

  it('should render li elements with venue names', () => {
    const filePath = path.join(process.cwd(), 'content/react/map-to-markup/starter/VenuesList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('<li')
    expect(componentCode).toMatch(/venue\.name/i)
  })

  it('should use venue id as key prop', () => {
    const filePath = path.join(process.cwd(), 'content/react/map-to-markup/starter/VenuesList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/key=\{venue\.id\}/i)
  })

  it('should return a ul element', () => {
    const filePath = path.join(process.cwd(), 'content/react/map-to-markup/starter/VenuesList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('<ul>')
    expect(componentCode).toContain('</ul>')
  })
})