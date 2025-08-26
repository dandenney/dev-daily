import { useEffect, useState } from "react";
import { getAllJokes, createJoke } from "./services/jokes";

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