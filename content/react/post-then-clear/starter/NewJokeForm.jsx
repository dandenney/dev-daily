import { useState } from "react";

function createJoke(text) {
  // mock api: return Promise.resolve({ id: Date.now(), text, told: false })
}

export default function NewJokeForm() {
  const [text, setText] = useState("");
  const handleSave = async () => {
    // call createJoke, then clear input
  };
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}