import { cookies } from "next/headers";
import Link from "next/link";

import { and, desc, eq } from "drizzle-orm";

import Button from "@/components/common/Button";
import Register from "@/components/feature/Register";
import { db } from "@/db/connect";
import { activitiesTable, eventsTable, guestsTable } from "@/db/schema";
import { css } from "@panda/css";

type Params = {
  guest_id: string;
};

export const revalidate = 0;

export default async function StudentIDPage({ params }: { params: Params }) {
  const cookieStore = cookies();
  const default_event_id = cookieStore.get("default_event_id")?.value || "";

  const guests = await db
    .select()
    .from(guestsTable)
    .where(
      and(eq(guestsTable.id, params.guest_id), eq(guestsTable.available, true))
    )
    .limit(1);

  let activity_type: "enter" | "exit" = "enter";
  let enter_at: Date | null = null;

  if (default_event_id !== "") {
    const activities = await db
      .select()
      .from(activitiesTable)
      .where(
        and(
          eq(activitiesTable.guest_id, params.guest_id),
          eq(activitiesTable.event_id, default_event_id),
          eq(activitiesTable.available, true)
        )
      )
      .orderBy(desc(activitiesTable.timestamp))
      .limit(1);
    if (activities.length === 1 && activities[0].type === "enter") {
      activity_type = "exit";
      enter_at = activities[0].timestamp;
    }
  }

  const events = await db
    .select({
      id: eventsTable.id,
      name: eventsTable.name,
    })
    .from(eventsTable)
    .where(eq(eventsTable.available, true))
    .orderBy(desc(eventsTable.name))
    .limit(20);

  return (
    <div>
      {guests.length === 1 ? (
        <Register
          activity_type={activity_type}
          default_event_id={default_event_id}
          enter_at={enter_at}
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
