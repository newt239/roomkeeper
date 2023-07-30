import { sql } from "drizzle-orm";

import Title from "@/components/common/Title";
import { db } from "@/db/connect";

export default async function EventsPage() {
  const result = await db.execute(sql`
    SELECT guest_id, enter_at, name
    FROM (
      SELECT guest_id, max(timestamp) as enter_at
      FROM activities
      WHERE guest_id in (
        SELECT guest_id
        FROM activities
        GROUP BY guest_id
        HAVING count(guest_id) % 2 = 1
      )
      GROUP BY guest_id
    ) as r
    JOIN guests ON guests.id = r.guest_id;
  `);

  const guests = result.rows as {
    guest_id: string;
    enter_at: Date;
    name: string;
  }[];

  return (
    <div>
      <Title level="h2">滞在状況</Title>
      {result.rowCount === 0 ? (
        <p>現在、滞在中のゲストはいません。</p>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.guest_id}>
              {guest.name} ({guest.guest_id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
