import Link from "next/link";

import dayjs from "dayjs";
import { desc, eq } from "drizzle-orm";

import Title from "@/components/common/Title";
import DeleteButton from "@/components/feature/DeleteButton";
import { db } from "@/db/connect";
import { activitiesTable, eventsTable, guestsTable } from "@/db/schema";
import { css } from "@panda/css";

export const revalidate = 0;

type Params = {
  event_id: string;
};

export default async function EventIDPage({ params }: { params: Params }) {
  const events = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, params.event_id))
    .limit(1);

  if (events.length !== 1) {
    return (
      <div>
        <Title level="h2">イベント</Title>
        <p>イベントが存在しません。</p>
      </div>
    );
  }

  const event = events[0];
  const activities = await db
    .select()
    .from(activitiesTable)
    .leftJoin(guestsTable, eq(guestsTable.id, activitiesTable.guest_id))
    .where(eq(activitiesTable.event_id, params.event_id))
    .orderBy(desc(activitiesTable.timestamp))
    .limit(200);

  return (
    <div>
      <Title level="h2">{event.name}</Title>
      <Title level="h3">イベントID</Title>
      <p>{event.id}</p>
      <Title level="h3">スキャン</Title>
      <Link href={`/events/${event.id}`}>「{event.name}」のスキャンをする</Link>
      <Title level="h3">履歴</Title>
      {activities.length === 0 ? (
        <p>履歴がありません。</p>
      ) : (
        <div className={css({ mb: 4 })}>
          <table>
            <thead>
              <tr>
                <th>ゲスト名</th>
                <th>タイプ</th>
                <th>タイムスタンプ</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.activities.id}>
                  <td>{activity.guests?.name}</td>
                  <td>{activity.activities.type}</td>
                  <td>
                    {dayjs(activity.activities.timestamp).format(
                      "YYYY/MM/DD hh:mm:ss"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Title level="h3">イベントを削除</Title>
      <p className={css({ mb: 3 })}>
        このイベントを削除します。この操作は取り消せません。
      </p>
      <DeleteButton id={event.id} type="event" />
    </div>
  );
}
