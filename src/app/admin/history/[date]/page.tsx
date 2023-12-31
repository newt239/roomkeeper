import dayjs from "dayjs";
import { and, desc, eq, sql } from "drizzle-orm";

import Title from "@/components/common/Title";
import ActivityRow from "@/components/feature/ActivityRow";
import ExportActivities from "@/components/feature/ExportActivities";
import ResetActivities from "@/components/feature/ResetActivities";
import { db } from "@/db/connect";
import { activitiesTable, eventsTable, guestsTable } from "@/db/schema";
import { css } from "@panda/css";

export const revalidate = 0;

type Params = {
  date: string;
};

export default async function SpecificDateHistoryPage({
  params,
}: {
  params: Params;
}) {
  const date =
    params.date === "today"
      ? dayjs(dayjs().format("YYYY-MM-DD"))
      : dayjs(params.date);
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
    .orderBy(desc(activitiesTable.timestamp))
    .limit(200);

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

  return (
    <div>
      <Title level="h2">{date.format("YYYY年MM月DD日")}のスキャン履歴</Title>
      <ExportActivities activities={activities} />
      <Title level="h3">一覧</Title>
      {activities.length === 0 ? (
        <p>履歴がありません。</p>
      ) : (
        <table className={css({ mt: 4 })}>
          <thead>
            <tr>
              <th>ゲストID</th>
              <th>ゲスト名</th>
              <th>イベント名</th>
              <th>種別</th>
              <th>タイムスタンプ</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <ActivityRow
                activity={activity}
                key={activity.id}
                latestIdList={[]}
              />
            ))}
          </tbody>
        </table>
      )}
      <ResetActivities date={date.format("YYYY-MM-DD")} />
    </div>
  );
}
