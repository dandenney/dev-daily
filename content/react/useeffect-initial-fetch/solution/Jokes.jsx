import { useEffect, useState } from "react";

function getAllJokes() {
  return Promise.resolve([
    { id: 1, text: "I told a joke about pizza. It was cheesy.", told: true },
    { id: 2, text: "Parallel lines have so much in common.", told: false },
  ]);
}

export default function Jokes() {
  const [allJokes, setAllJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then(setAllJokes);
  }, []);

  return (
    <ul>
      {allJokes.map(j => <li key={j.id}>{j.text}</li>)}
    </ul>
  );
}