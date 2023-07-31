import { eq } from "drizzle-orm";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Title from "@/components/common/Title";
import { db } from "@/db/connect";
import { eventsTable } from "@/db/schema";
import { createEvent } from "@/utils/actions";
import { css } from "@panda/css";

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
        <Button type="submit">作成する</Button>
      </form>
      <Title level="h3">一覧</Title>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}
