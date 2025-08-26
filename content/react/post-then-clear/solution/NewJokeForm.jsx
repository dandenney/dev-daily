import { useState } from "react";

function createJoke(text) {
  return Promise.resolve({ id: Date.now(), text, told: false });
}

export default function NewJokeForm() {
  const [text, setText] = useState("");
  const handleSave = async () => {
    await createJoke(text);
    setText("");
  };
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={!text.trim()} onClick={handleSave}>Save</button>
    </div>
  );
}