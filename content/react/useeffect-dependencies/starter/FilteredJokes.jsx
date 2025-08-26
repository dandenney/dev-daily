import { useEffect, useState } from "react";

export default function FilteredJokes({ allJokes }) {
  const [showTold, setShowTold] = useState(false);
  const [filtered, setFiltered] = useState([]);

  // useEffect here

  return (
    <>
      <button onClick={() => setShowTold(s => !s)}>
        {showTold ? "Show All" : "Show Told Only"}
      </button>
      <ul>{filtered.map(j => <li key={j.id}>{j.text}</li>)}</ul>
    </>
  );
}