import Link from "next/link";

import { desc, eq } from "drizzle-orm";

import Title from "@/components/common/Title";
import ActivityRow from "@/components/feature/ActivityRow";
import ExportActivities from "@/components/feature/ExportActivities";
import ResetActivities from "@/components/feature/ResetActivities";
import { db } from "@/db/connect";
import { activitiesTable, eventsTable } from "@/db/schema";
import { css } from "@panda/css";

export const revalidate = 0;

export default async function HistoryPage() {
  const results = await db
    .select()
    .from(activitiesTable)
    .leftJoin(eventsTable, eq(eventsTable.id, activitiesTable.event_id))
    .where(eq(activitiesTable.available, true))
    .orderBy(desc(activitiesTable.timestamp))
    .limit(20);

  let latestIdList: string[] = [];
  let guestList: string[] = [];
  const activities = results.map((result) => {
    if (!guestList.includes(result.activities.guest_id)) {
      latestIdList.push(result.activities.id);
      guestList.push(result.activities.guest_id);
    }
    return {
      id: result.activities.id,
      guest_id: result.activities.guest_id,
      event_name: result.events?.name || "削除されたイベント",
      type: result.activities.type,
      timestamp: result.activities.timestamp,
    };
  });

  return (
    <div>
      <Title level="h2">スキャン履歴</Title>
      <Title level="h3">一覧</Title>
      {results.length === 0 ? (
        <p>履歴がありません。</p>
      ) : (
        <table className={css({ mt: 4 })}>
          <thead>
            <tr>
              <th>ゲストID</th>
              <th>イベント名</th>
              <th>種別</th>
              <th>タイムスタンプ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <ActivityRow
                activity={activity}
                key={activity.id}
                latestIdList={latestIdList}
              />
            ))}
          </tbody>
        </table>
      )}
      <p className={css({ my: 4 })}>
        <Link href="/history/all">すべての履歴を見る</Link>
      </p>
      <ExportActivities activities={activities} />
      <ResetActivities />
    </div>
  );
}
