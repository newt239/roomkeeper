import { eq, sql } from "drizzle-orm";

import Title from "@/components/common/Title";
import { db } from "@/db/connect";
import { eventsTable } from "@/db/schema";

type Params = {
  event_id: string;
};

export default async function EventIdPage({ params }: { params: Params }) {
  const events = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, params.event_id));
  const result = await db.execute(sql`
    SELECT guest_id, enter_at, name
    FROM (
      SELECT guest_id, max(timestamp) as enter_at
      FROM activities
      WHERE guest_id in (
        SELECT guest_id
        FROM activities
        WHERE event_id = ${params.event_id}
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

  if (events.length === 0) {
    return (
      <div>
        <Title level="h2">イベント</Title>
        <p>イベントが存在しません。</p>
      </div>
    );
  }

  return (
    <div>
      <Title level="h2">{events[0].name}</Title>
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
