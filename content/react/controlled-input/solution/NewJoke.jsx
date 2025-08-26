import { useState } from "react";

export default function NewJoke() {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="New One Liner"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <p>Preview: {text}</p>
    </div>
  );
}