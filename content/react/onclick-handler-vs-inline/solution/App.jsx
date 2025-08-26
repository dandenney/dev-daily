export default function App() {
  const handleClick = () => console.log("Clicked!");
  return (
    <div>
      <button onClick={handleClick}>A</button>
      <button onClick={() => console.log("Clicked!")}>B</button>
    </div>
  );
}