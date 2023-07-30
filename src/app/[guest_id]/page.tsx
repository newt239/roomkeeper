import Link from "next/link";

import { desc, eq } from "drizzle-orm";

import Button from "@/components/common/Button";
import Register from "@/components/feature/Register";
import { db } from "@/db/connect";
import { activitiesTable, eventsTable, guestsTable } from "@/db/schema";
import { css } from "@panda/css";

type Params = {
  guest_id: string;
};

export default async function StudentIDPage({ params }: { params: Params }) {
  const guests = await db
    .select()
    .from(guestsTable)
    .where(eq(guestsTable.id, params.guest_id));

  const activities = await db
    .select()
    .from(activitiesTable)
    .where(eq(activitiesTable.guest_id, params.guest_id))
    .orderBy(desc(activitiesTable.timestamp));

  const activity_type: "enter" | "exit" =
    activities.length === 0
      ? "enter"
      : activities[0].type === "enter"
      ? "exit"
      : "enter";

  const events = await db
    .select({
      id: eventsTable.id,
      name: eventsTable.name,
    })
    .from(eventsTable)
    .orderBy(desc(eventsTable.name))
    .limit(20);

  return (
    <div>
      {guests.length === 1 ? (
        <Register
          activity_type={activity_type}
          enter_at={
            activities.length > 0 && activities[0].type === "enter"
              ? activities[0].timestamp
              : null
          }
          events={events}
          guest_id={guests[0].id}
        />
      ) : (
        <div
          className={css({
            my: 4,
          })}
        >
          <p>入力された「{params.guest_id}」というIDは存在しません。</p>
          <div
            className={css({
              w: "100%",
              display: "flex",
              justifyContent: "flex-end",
            })}
          >
            <Link href="/scan">
              <Button>スキャンし直す</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
