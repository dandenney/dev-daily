export default function JokeBuckets({ allJokes }) {
  const untold = allJokes.filter(j => !j.told);
  const told = allJokes.filter(j => j.told);
  return (
    <section>
      <h3>Untold ({untold.length})</h3>
      <ul>{untold.map(j => <li key={j.id}>{j.text}</li>)}</ul>

      <h3>Told ({told.length})</h3>
      <ul>{told.map(j => <li key={j.id}>{j.text}</li>)}</ul>
    </section>
  );
}