import dayjs from "dayjs";
import { desc } from "drizzle-orm";

import { deleteAllActivities } from "../actions";

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
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.guest_id}</td>
                <td>{activity.type === "enter" ? "入室" : "退室"}</td>
                <td>{dayjs(activity.timestamp).format("MM月DD日 HH:mm:ss")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ExportActivities activities={activities} />
      <Title level="h3">データリセット</Title>
      <p>※この操作は取り消せません。</p>
      <form action={deleteAllActivities} className={css({ mt: 4 })}>
        <Button type="submit">リセットする</Button>
      </form>
    </div>
  );
}
