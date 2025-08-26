export default function JokeList({ jokes }) {
  if (!jokes.length) return <p>Add your first one-liner.</p>;
  return <ul>{jokes.map(j => <li key={j.id}>{j.text}</li>)}</ul>;
}