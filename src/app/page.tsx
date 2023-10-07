import Link from "next/link";

import { eq } from "drizzle-orm";

import Title from "@/components/common/Title";
import { db } from "@/db/connect";
import { eventsTable } from "@/db/schema";

const APP_VERSION = "0.6.0";
const LAST_UPDATE = "2023/10/07 23:00";

export default async function HomePage() {
  const events = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.available, true));

  return (
    <div>
      <Title level="h2">簡易入退室記録システム</Title>
      <Title level="h3">イベント選択</Title>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`events/${event.id}`} key={event.id}>
              {event.name}
            </Link>
          </li>
        ))}
      </ul>
      <Title level="h3">使い方</Title>
      <ul>
        <li>
          イベントの削除は事前に入退室記録をすべて削除してから実行してください。
        </li>
      </ul>
      <Title level="h3">アプリ情報</Title>
      <ul>
        <li>v{APP_VERSION}</li>
        <li>最終更新: {LAST_UPDATE}</li>
        <li>
          <a href="https://github.com/newt239/roomkeeper" target="_blank">
            newt239/roomkeeper - GitHub
          </a>
        </li>
      </ul>
    </div>
  );
}
