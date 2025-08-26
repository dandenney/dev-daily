# React useEffect Dependencies: Watch Two Things Challenge

A toggle shows either all jokes or only told jokes. Watch both showTold and allJokes to compute filtered.

## Requirements

1. Create a toggle button to switch between "all jokes" and "told only"
2. Use useEffect to watch both `showTold` and `allJokes` dependencies
3. Update filtered state based on the toggle value
4. Render the filtered list with proper keys

## Getting Started

Open the files in the `starter/` folder and implement the requirements. Run tests to check your progress.

## Learning Goals

- Multiple dependencies in useEffect
- Conditional state derivation
- Toggle button interactions

## Skills Practiced

- **Dependency arrays**: Watching multiple values in useEffect
- **Conditional derive**: Computing state based on conditions

## Stretch Goal

Add a count display for `filtered.length`.