import { db } from "@/db/connect";
import { guestsTable } from "@/db/schema";

export default async function HistoryPage() {
  const guests = await db.select().from(guestsTable);

  return (
    <>
      {guests.map((guest) => (
        <div key={guest.id}>{guest.name}</div>
      ))}
    </>
  );
}
