import { db } from "@/db/connect";
import { guestsTable } from "@/db/schema";

export default async function Home() {
  const guests = await db.select().from(guestsTable);

  return (
    <>
      QRコードをスキャンしてください
      {guests.map((guest) => (
        <div key={guest.id}>{guest.name}</div>
      ))}
    </>
  );
}
