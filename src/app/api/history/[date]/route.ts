import { NextResponse } from "next/server";

import dayjs from "dayjs";
import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "@/db/connect";
import { activitiesTable, eventsTable, guestsTable } from "@/db/schema";

type Context = {
  params: {
    date: string;
  };
};

export async function GET(request: Request, context: Context) {
  const date =
    context.params.date === "today"
      ? dayjs(dayjs().format("YYYY-MM-DD"))
      : dayjs(context.params.date);
  const results = await db
    .select()
    .from(activitiesTable)
    .leftJoin(eventsTable, eq(eventsTable.id, activitiesTable.event_id))
    .leftJoin(guestsTable, eq(guestsTable.id, activitiesTable.guest_id))
    .where(
      and(
        eq(activitiesTable.available, true),
        sql`${activitiesTable.timestamp} > ${date.format(
          "YYYY-MM-DD HH:mm:ss"
        )}`,
        sql`${activitiesTable.timestamp} < ${date
          .add(1, "day")
          .format("YYYY-MM-DD HH:mm:ss")}`
      )
    )
    .orderBy(desc(activitiesTable.timestamp));

  const activities = results.map((result) => {
    return {
      id: result.activities.id,
      guest_id: result.activities.guest_id,
      guest_name: result.guests?.name || "削除されたゲスト",
      event_name: result.events?.name || "削除されたイベント",
      type: result.activities.type,
      timestamp: result.activities.timestamp,
    };
  });

  return NextResponse.json({
    date: date.format("YYYY-MM-DD"),
    activities,
  });
}
