export default function JokeBuckets({ allJokes }) {
  // derive told and untold via .filter
  return (
    <section>
      <h3>Untold (n)</h3>
      <ul>{/* untold */}</ul>

      <h3>Told (n)</h3>
      <ul>{/* told */}</ul>
    </section>
  );
}