import LoadCSV from "@/components/client/LoadCSV";
import Title from "@/components/common/Title";
import { db } from "@/db/connect";
import { guestsTable } from "@/db/schema";

export default async function GuestSettingsPage() {
  const guests = await db
    .select()
    .from(guestsTable)
    .orderBy(guestsTable.name)
    .limit(20);

  return (
    <div>
      <Title level="h2">ゲスト管理</Title>
      <LoadCSV />
      <Title level="h3">一覧</Title>
      <ul>
        {guests.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}
