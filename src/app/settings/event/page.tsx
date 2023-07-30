import { createEvent } from "@/app/actions";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Title from "@/components/common/Title";
import { db } from "@/db/connect";
import { eventsTable } from "@/db/schema";

export default async function EventSettingsPage() {
  const events = await db
    .select()
    .from(eventsTable)
    .orderBy(eventsTable.name)
    .limit(20);

  return (
    <div>
      <Title level="h2">イベント管理</Title>
      <Title level="h3">作成</Title>
      <form action={createEvent}>
        <Input name="event_name" type="text" />
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
