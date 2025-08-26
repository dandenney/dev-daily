import { useState } from "react";

export default function JokeForm({ onAdd }) {
  const [text, setText] = useState("");
  const submit = (e) => {
    // prevent default, call onAdd(text), clear
  };
  return (
    <form onSubmit={submit}>
      <input value={text} onChange={(e)=>setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}