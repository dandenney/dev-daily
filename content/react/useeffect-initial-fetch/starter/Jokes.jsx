import { useEffect, useState } from "react";

function getAllJokes() {
  return Promise.resolve([
    { id: 1, text: "I told a joke about pizza. It was cheesy.", told: true },
    { id: 2, text: "Parallel lines have so much in common.", told: false },
  ]);
}

export default function Jokes() {
  const [allJokes, setAllJokes] = useState(/* pick the safe initial value */);

  // fetch on initial render only

  return (
    <ul>
      {/* render jokes */}
    </ul>
  );
}