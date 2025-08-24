// Solution: Add an h1 element to the main.content element
// The h1 should contain the text: "Adding content to HTML with JavaScript"

// Get the main element with class "content"
const main = document.querySelector('main.content');

// Create an h1 element
const h1 = document.createElement('h1');

// Set the text content
h1.textContent = 'Adding content to HTML with JavaScript';

// Append the h1 to the main element
main.appendChild(h1);