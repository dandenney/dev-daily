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
    
    // Execute the JavaScript in the context of the DOM
    const script = document.createElement('script')
    script.textContent = js
    document.head.appendChild(script)
  })

  it('should have a main element with class "content"', () => {
    const main = document.querySelector('main.content')
    expect(main).not.toBeNull()
    expect(main.tagName.toLowerCase()).toBe('main')
    expect(main.classList.contains('content')).toBe(true)
  })

  it('should add an h1 element to the main.content element', () => {
    const main = document.querySelector('main.content')
    const h1 = main.querySelector('h1')
    
    expect(h1).not.toBeNull()
    expect(h1.tagName.toLowerCase()).toBe('h1')
  })

  it('should have the correct text content in the h1', () => {
    const main = document.querySelector('main.content')
    const h1 = main.querySelector('h1')
    
    expect(h1.textContent.trim()).toBe('Adding content to HTML with JavaScript')
  })

  it('should only have one h1 element in the main.content', () => {
    const main = document.querySelector('main.content')
    const h1Elements = main.querySelectorAll('h1')
    
    expect(h1Elements.length).toBe(1)
  })
})