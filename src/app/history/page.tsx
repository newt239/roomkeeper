import dayjs from "dayjs";
import { desc } from "drizzle-orm";

import { db } from "@/db/connect";
import { activitiesTable } from "@/db/schema";
import { css } from "@panda/css";

export default async function HistoryPage() {
  const activities = await db
    .select()
    .from(activitiesTable)
    .orderBy(desc(activitiesTable.timestamp))
    .limit(20);

  return (
    <div>
      <h2
        className={css({
          fontSize: "3xl",
          mt: 4,
        })}
      >
        スキャン履歴
      </h2>
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
    </div>
  );
}
