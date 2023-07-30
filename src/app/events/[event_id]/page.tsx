import { eq, sql } from "drizzle-orm";

import Title from "@/components/common/Title";
import EventGuestRow from "@/components/feature/EventGuestRow";
import { db } from "@/db/connect";
import { eventsTable } from "@/db/schema";
import { css } from "@panda/css";

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
      <Title level="h2">滞在状況</Title>
      <Title level="h3">{events[0].name}</Title>
      {result.rowCount === 0 ? (
        <p>現在滞在中のゲストはいません。</p>
      ) : (
        <table className={css({ mt: 4 })}>
          <thead>
            <tr>
              <th>ゲストID</th>
              <th>ゲスト名</th>
              <th>入室時刻</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <EventGuestRow
                event_id={params.event_id}
                guest={guest}
                key={guest.guest_id}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
