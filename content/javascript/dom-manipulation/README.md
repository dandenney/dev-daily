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

## Testing Guidelines

This project uses automated tests to verify your solution. The tests are designed to be **result-focused**, not implementation-specific.

### What the tests check:
- ✅ An `h1` element exists in the document
- ✅ The `h1` contains the exact text: "Adding content to HTML with JavaScript"
- ✅ The basic HTML structure is preserved

### What the tests DON'T check:
- ❌ Which specific DOM selector you use (`.content`, `main.content`, etc.)
- ❌ Which DOM manipulation method you choose (`appendChild`, `innerHTML`, etc.)
- ❌ Variable names or code structure
- ❌ Where exactly the `h1` appears (as long as it's in the document)

### Why this approach?
This testing philosophy allows you to:
- **Learn multiple approaches** - Try different DOM manipulation techniques
- **Focus on results** - What matters is the end result, not the specific code path
- **Build confidence** - Your solution works if it produces the correct output
- **Avoid frustration** - Tests won't fail due to minor implementation differences

### Running tests:
The tests run automatically when you submit your code. If they pass, your solution is correct regardless of which approach you used!