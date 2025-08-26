import { useState } from "react";

export default function Tickets() {
  const [allTickets, setAllTickets] = useState([]);
  return (
    <article>
      {allTickets.map(t => <section key={t.id}>{t.title}</section>)}
    </article>
  );
}