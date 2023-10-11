import dayjs from "dayjs";
import { eq } from "drizzle-orm";

import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { db } from "@/db/connect";
import { activitiesTable, guestsTable } from "@/db/schema";
import { deleteAllGuests } from "@/utils/actions";
import { css } from "@panda/css";

export const revalidate = 0;

type Params = {
  guest_id: string;
};

export default async function GuestIDPage({ params }: { params: Params }) {
  const guests = await db
    .select()
    .from(guestsTable)
    .where(eq(guestsTable.id, params.guest_id))
    .orderBy(guestsTable.id)
    .limit(1);
  if (guests.length !== 1) {
    return (
      <div>
        <Title level="h2">ゲスト</Title>
        <p>ゲストが存在しません。</p>
      </div>
    );
  }
  const guest = guests[0];
  const activities = await db
    .select()
    .from(activitiesTable)
    .where(eq(activitiesTable.guest_id, params.guest_id))
    .orderBy(activitiesTable.timestamp);

  return (
    <div>
      <Title level="h2">{guest.name}</Title>
      <Title level="h3">ゲストID</Title>
      <p>{guest.id}</p>
      <Title level="h3">履歴</Title>
      {activities.length === 0 ? (
        <p>履歴がありません。</p>
      ) : (
        <div className={css({ mb: 4 })}>
          <table>
            <thead>
              <tr>
                <th>イベント名</th>
                <th>タイプ</th>
                <th>タイムスタンプ</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.event_id}</td>
                  <td>{activity.type}</td>
                  <td>
                    {dayjs(activity.timestamp).format("YYYY/MM/DD hh:mm:ss")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Title level="h3">ゲストを削除</Title>
      <p className={css({ mb: 3 })}>
        このゲストを削除します。この操作は取り消せません。
      </p>
      <form action={deleteAllGuests}>
        <Button type="submit" variant="danger">
          削除する
        </Button>
      </form>
    </div>
  );
}
