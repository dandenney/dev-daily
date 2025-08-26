import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import VenuesList from '../starter/VenuesList.jsx'

describe('React Map to Markup Challenge', () => {
  it('should render a ul element', () => {
    const { container } = render(<VenuesList />)
    const ul = container.querySelector('ul')
    
    expect(ul).not.toBeNull()
    expect(ul.tagName.toLowerCase()).toBe('ul')
  })

  it('should render li elements for each venue', () => {
    const { container } = render(<VenuesList />)
    const liElements = container.querySelectorAll('li')
    
    expect(liElements.length).toBe(2)
  })

  it('should display venue names in list items', () => {
    const { container } = render(<VenuesList />)
    const liElements = container.querySelectorAll('li')
    
    expect(liElements[0].textContent).toBe('Zanies')
    expect(liElements[1].textContent).toBe('The Comedy Bar')
  })

  it('should use venue id as key prop', () => {
    const { container } = render(<VenuesList />)
    const liElements = container.querySelectorAll('li')
    
    // Test that each li element exists and has proper content
    // The key prop itself can't be directly tested as it's internal to React
    expect(liElements.length).toBe(2)
    expect(liElements[0].textContent).toBe('Zanies')
    expect(liElements[1].textContent).toBe('The Comedy Bar')
  })
})