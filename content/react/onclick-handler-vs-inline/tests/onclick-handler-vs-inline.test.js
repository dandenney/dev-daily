import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React onClick Handler vs Inline Challenge', () => {
  it('should export a default function', () => {
    const filePath = path.join(process.cwd(), 'content/react/onclick-handler-vs-inline/starter/App.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function App')
  })

  it('should define a named handleClick function', () => {
    const filePath = path.join(process.cwd(), 'content/react/onclick-handler-vs-inline/starter/App.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/const handleClick|function handleClick/i)
  })

  it('should have two buttons', () => {
    const filePath = path.join(process.cwd(), 'content/react/onclick-handler-vs-inline/starter/App.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    const buttonMatches = componentCode.match(/<button/g)
    expect(buttonMatches).not.toBeNull()
    expect(buttonMatches.length).toBe(2)
  })

  it('should use onClick on both buttons', () => {
    const filePath = path.join(process.cwd(), 'content/react/onclick-handler-vs-inline/starter/App.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    const onClickMatches = componentCode.match(/onClick=/g)
    expect(onClickMatches).not.toBeNull()
    expect(onClickMatches.length).toBe(2)
  })

  it('should use both named function and inline arrow function', () => {
    const filePath = path.join(process.cwd(), 'content/react/onclick-handler-vs-inline/starter/App.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/onClick=\{handleClick\}/i)
    expect(componentCode).toMatch(/onClick=\{\(\) =>/i)
  })
})