export default function ItemList({ items }) {
  return (
    <ul key="list">
      {items.map(item => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
}