import { desc } from "drizzle-orm";

import { deleteAllActivities } from "../actions";

import ActivityRow from "@/components/client/ActivityRow";
import ExportActivities from "@/components/client/ExportActivities";
import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { db } from "@/db/connect";
import { activitiesTable } from "@/db/schema";
import { css } from "@panda/css";

export default async function HistoryPage() {
  const activities = await db
    .select()
    .from(activitiesTable)
    .orderBy(desc(activitiesTable.timestamp));
  const parsedActivities = activities.reduce(
    (accumulator, activity) => {
      if (!accumulator.guestList.includes(activity.guest_id)) {
        accumulator.idList.push(activity.id);
        accumulator.guestList.push(activity.guest_id);
      }
      return accumulator;
    },
    { idList: [], guestList: [] } as { idList: string[]; guestList: string[] }
  );

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
                latestIdList={parsedActivities.idList}
              />
            ))}
          </tbody>
        </table>
      )}
      <ExportActivities activities={activities} />
      <Title level="h3">データリセット</Title>
      <form action={deleteAllActivities}>
        <Button type="submit" variant="danger">
          リセットする
        </Button>
      </form>
    </div>
  );
}
