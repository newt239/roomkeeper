import { desc, eq } from "drizzle-orm";

import Register from "@/components/Register";
import { db } from "@/db/connect";
import { activitiesTable, guestsTable } from "@/db/schema";

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

  return (
    <div>
      {guests.length === 1 ? (
        <Register activity_type={activity_type} guest_id={guests[0].id} />
      ) : (
        <>このIDは存在しません。</>
      )}
    </div>
  );
}
