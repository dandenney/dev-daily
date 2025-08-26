import { useState } from "react";

export default function NewJoke() {
  // text state
  return (
    <div>
      <input
        type="text"
        placeholder="New One Liner"
        // onChange here
        // value here
      />
      <p>Preview: {/* text here */}</p>
    </div>
  );
}