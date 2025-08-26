export default function VenuesList() {
  const venues = [
    { id: 1, name: "Zanies" },
    { id: 2, name: "The Comedy Bar" },
  ];
  return (
    <ul>
      {venues.map((venue) => (
        <li key={venue.id}>{venue.name}</li>
      ))}
    </ul>
  );
}