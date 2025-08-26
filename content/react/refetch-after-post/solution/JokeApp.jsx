import { useEffect, useState } from "react";

function getAllJokes() {
  return Promise.resolve([
    { id: 1, text: "I told a joke about pizza. It was cheesy.", told: true },
    { id: 2, text: "Parallel lines have so much in common.", told: false },
  ]);
}

function createJoke(text) {
  return Promise.resolve({ id: Date.now(), text, told: false });
}

export default function JokeApp() {
  const [allJokes, setAllJokes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => { getAllJokes().then(setAllJokes); }, []);

  const handleSave = async () => {
    await createJoke(text);
    await getAllJokes().then(setAllJokes);
    setText("");
  };

  return (
    <>
      <input value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={handleSave}>Add</button>
      <ul>{allJokes.map(j => <li key={j.id}>{j.text}</li>)}</ul>
    </>
  );
}