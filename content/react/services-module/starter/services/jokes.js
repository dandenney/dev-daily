export function getAllJokes() {
  return Promise.resolve([
    { id: 1, text: "Cheesy", told: true },
    { id: 2, text: "Parallel lines", told: false },
  ]);
}

export function createJoke(text) {
  return Promise.resolve({ id: Date.now(), text, told: false });
}