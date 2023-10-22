import { and, eq, sql } from "drizzle-orm";

import Title from "@/components/common/Title";
import DirectInput from "@/components/feature/DirectInput";
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
    .where(
      and(eq(eventsTable.id, params.event_id), eq(eventsTable.available, true))
    );
  const result = await db.execute(sql`
    SELECT guest_id, enter_at, name
    FROM (
      SELECT guest_id, max(timestamp) as enter_at
      FROM activities
      WHERE guest_id in (
        SELECT guest_id
        FROM activities
        WHERE event_id = ${params.event_id} AND available = true
        GROUP BY guest_id
        HAVING count(guest_id) % 2 = 1
      )
      GROUP BY guest_id
    ) as r
    JOIN guests ON guests.id = r.guest_id;
  `);

  const guests = result as unknown as {
    guest_id: string;
    enter_at: Date;
    name: string;
  }[];

  if (events.length !== 1) {
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
      <Title level="h3">IDを直接入力する</Title>
      <DirectInput event_id={params.event_id} />
      <Title level="h3">滞在中のゲスト</Title>
      {result.length === 0 ? (
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
