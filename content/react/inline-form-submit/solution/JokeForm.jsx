import { useState } from "react";

export default function JokeForm({ onAdd }) {
  const [text, setText] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };
  return (
    <form onSubmit={submit}>
      <input value={text} onChange={(e)=>setText(e.target.value)} />
      <button type="submit" disabled={!text.trim()}>Add</button>
    </form>
  );
}