import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { eq } from "drizzle-orm";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Title from "@/components/common/Title";
import EachEvent from "@/components/feature/EachEvent";
import { db } from "@/db/connect";
import { eventsTable } from "@/db/schema";
import { createEvent } from "@/utils/actions";
import { css } from "@panda/css";

export const revalidate = 0;

export default async function EventSettingsPage() {
  const events = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.available, true))
    .orderBy(eventsTable.name);

  return (
    <div>
      <Title level="h2">イベント管理</Title>
      <Title level="h3">作成</Title>
      <form
        action={createEvent}
        className={css({
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2,
        })}
      >
        <Input name="event_name" placeholder="出欠管理" type="text" />
        <Button type="submit">
          <IconSquareRoundedPlus />
          作成する
        </Button>
      </form>
      <Title level="h3">一覧</Title>
      <p
        className={css({
          mb: 3,
        })}
      >
        イベントを削除すると、関連する入退室記録が全て削除されます。この操作は取り消せません。
      </p>
      <table>
        <thead>
          <tr>
            <th>イベントID</th>
            <th>イベント名</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <EachEvent
              event_id={event.id}
              event_name={event.name}
              key={event.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
