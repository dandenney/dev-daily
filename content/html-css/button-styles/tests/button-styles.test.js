import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

describe('Button Styles Challenge', () => {
  let dom, document, window

  beforeAll(() => {
    const htmlPath = path.join(process.cwd(), 'content/html-css/button-styles/starter/index.html')
    const cssPath = path.join(process.cwd(), 'content/html-css/button-styles/starter/styles.css')
    
    const html = fs.readFileSync(htmlPath, 'utf-8')
    const css = fs.readFileSync(cssPath, 'utf-8')
    
    dom = new JSDOM(html)
    document = dom.window.document
    window = dom.window
    
    // Add CSS to the document
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  })

  it('should have proper button structure', () => {
    const buttons = document.querySelectorAll('.btn')
    expect(buttons.length).toBe(3)
    
    const primaryBtns = document.querySelectorAll('.btn-primary')
    expect(primaryBtns.length).toBe(2)
    
    const secondaryBtns = document.querySelectorAll('.btn-secondary')
    expect(secondaryBtns.length).toBe(1)
  })

  it('should have CSS custom properties defined', () => {
    const styles = document.querySelector('style').textContent
    expect(styles).toMatch(/:root\s*{/)
  })

  it('should have base button styles', () => {
    const styles = document.querySelector('style').textContent
    expect(styles).toMatch(/\.btn\s*{/)
  })

  it('should have hover and focus states', () => {
    const styles = document.querySelector('style').textContent
    expect(styles).toMatch(/\.btn:hover/)
    expect(styles).toMatch(/\.btn:focus/)
  })

  it('should have disabled state styling', () => {
    const styles = document.querySelector('style').textContent
    expect(styles).toMatch(/\.btn:disabled/)
  })
})