import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

describe('DOM Manipulation Challenge', () => {
  let dom, document, window

  beforeAll(() => {
    const htmlPath = path.join(process.cwd(), 'content/javascript/dom-manipulation/starter/index.html')
    const jsPath = path.join(process.cwd(), 'content/javascript/dom-manipulation/starter/main.js')
    
    const html = fs.readFileSync(htmlPath, 'utf-8')
    const js = fs.readFileSync(jsPath, 'utf-8')
    
    // Create DOM with the HTML
    dom = new JSDOM(html, {
      runScripts: "outside-only",
      resources: "usable"
    })
    document = dom.window.document
    window = dom.window
    
    // Execute the JavaScript directly in the window context
    dom.window.eval(js)
  })

  it('should have a main element with class "content"', () => {
    const main = document.querySelector('main.content')
    expect(main).not.toBeNull()
    expect(main.tagName.toLowerCase()).toBe('main')
    expect(main.classList.contains('content')).toBe(true)
  })

  it('should add an h1 element with the correct text', () => {
    const h1 = document.querySelector('h1')
    
    expect(h1).not.toBeNull()
    expect(h1.tagName.toLowerCase()).toBe('h1')
    expect(h1.textContent.trim()).toBe('Adding content to HTML with JavaScript')
  })
})