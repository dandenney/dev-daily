# DOM Manipulation Challenge

## Objective

Learn basic DOM manipulation by using JavaScript to dynamically add content to an HTML page.

## Task

Use JavaScript to add an `h1` element to the `main` element with class "content". The `h1` should contain the text: **"Adding content to HTML with JavaScript"**

## Getting Started

1. Open the `starter/` directory
2. You'll find:
   - `index.html` - Contains a `main` element with class "content"
   - `main.js` - Where you'll write your JavaScript code

## Requirements

- Use JavaScript to create an `h1` element
- Add the text "Adding content to HTML with JavaScript" to the `h1`
- Append the `h1` element to the `main.content` element
- The final result should have exactly one `h1` inside the `main.content` element

## Hints

- Use `document.querySelector()` to select the main element
- Use `document.createElement()` to create the h1 element
- Use `textContent` or `innerText` to set the text
- Use `appendChild()` to add the h1 to the main element

## Solution Approach

There are multiple ways to solve this challenge:
1. Create element, set text, append to parent
2. Use `innerHTML` to directly insert HTML
3. Use template literals with `insertAdjacentHTML()`

Choose the approach that makes the most sense to you!