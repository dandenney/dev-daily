import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Keys Repeated Element Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/keys-repeated-element/starter/ItemList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function ItemList')
  })

  it('should destructure items from props', () => {
    const filePath = path.join(process.cwd(), 'content/react/keys-repeated-element/starter/ItemList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/\{\s*items\s*\}/i)
  })

  it('should not have key on ul element', () => {
    const filePath = path.join(process.cwd(), 'content/react/keys-repeated-element/starter/ItemList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).not.toMatch(/<ul.*key=/i)
  })

  it('should have key on li elements', () => {
    const filePath = path.join(process.cwd(), 'content/react/keys-repeated-element/starter/ItemList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/<li.*key=\{.*\.id\}/i)
  })

  it('should map over items array', () => {
    const filePath = path.join(process.cwd(), 'content/react/keys-repeated-element/starter/ItemList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/items\.map/i)
  })

  it('should display item names', () => {
    const filePath = path.join(process.cwd(), 'content/react/keys-repeated-element/starter/ItemList.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/\{item\.name\}/i)
  })
})