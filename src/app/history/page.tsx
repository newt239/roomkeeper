import { desc } from "drizzle-orm";

import Title from "@/components/common/Title";
import ActivityRow from "@/components/feature/ActivityRow";
import ExportActivities from "@/components/feature/ExportActivities";
import ResetActivities from "@/components/feature/ResetActivities";
import { db } from "@/db/connect";
import { activitiesTable } from "@/db/schema";
import { css } from "@panda/css";

export default async function HistoryPage() {
  const activities = await db
    .select()
    .from(activitiesTable)
    .orderBy(desc(activitiesTable.timestamp));

  let latestIdList: string[] = [];
  let guestList: string[] = [];
  activities.map((activity) => {
    if (!guestList.includes(activity.guest_id)) {
      latestIdList.push(activity.id);
      guestList.push(activity.guest_id);
    }
  });

  return (
    <div>
      <Title level="h2">スキャン履歴</Title>
      <Title level="h3">一覧</Title>
      {activities.length === 0 ? (
        <p>履歴がありません。</p>
      ) : (
        <table className={css({ mt: 4 })}>
          <thead>
            <tr>
              <th>ゲストID</th>
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
      <ExportActivities activities={activities} />
      <ResetActivities />
    </div>
  );
}
