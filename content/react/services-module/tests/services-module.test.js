import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('React Services Module Challenge', () => {
  it('should have a services/jokes.js file', () => {
    const filePath = path.join(process.cwd(), 'content/react/services-module/starter/services/jokes.js')
    const serviceCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(serviceCode).toContain('export function getAllJokes')
    expect(serviceCode).toContain('export function createJoke')
  })

  it('should export getAllJokes function that returns a Promise', () => {
    const filePath = path.join(process.cwd(), 'content/react/services-module/starter/services/jokes.js')
    const serviceCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(serviceCode).toMatch(/export function getAllJokes/i)
    expect(serviceCode).toMatch(/Promise\.resolve/i)
  })

  it('should export createJoke function that returns a Promise', () => {
    const filePath = path.join(process.cwd(), 'content/react/services-module/starter/services/jokes.js')
    const serviceCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(serviceCode).toMatch(/export function createJoke/i)
    expect(serviceCode).toMatch(/Promise\.resolve/i)
  })

  it('should import services in component', () => {
    const filePath = path.join(process.cwd(), 'content/react/services-module/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('import { getAllJokes, createJoke } from "./services/jokes"')
  })

  it('should use the imported functions', () => {
    const filePath = path.join(process.cwd(), 'content/react/services-module/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toMatch(/getAllJokes\s*\(/i)
    expect(componentCode).toMatch(/createJoke\s*\(/i)
  })

  it('should have the same component structure as before', () => {
    const filePath = path.join(process.cwd(), 'content/react/services-module/starter/JokeApp.jsx')
    const componentCode = fs.readFileSync(filePath, 'utf-8')
    
    expect(componentCode).toContain('export default function JokeApp')
    expect(componentCode).toContain('useState')
    expect(componentCode).toContain('useEffect')
  })
})