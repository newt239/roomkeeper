import { desc } from "drizzle-orm";

import Title from "@/components/common/Title";
import ActivityRow from "@/components/feature/ActivityRow";
import { db } from "@/db/connect";
import { activitiesTable } from "@/db/schema";
import { css } from "@panda/css";

export const revalidate = 0;

export default async function AllHistoryPage() {
  const activities = await db
    .select()
    .from(activitiesTable)
    .orderBy(desc(activitiesTable.timestamp));

  return (
    <div>
      <Title level="h2">すべてのスキャン履歴</Title>
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
                latestIdList={[]}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
