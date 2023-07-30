import Link from "next/link";

import Title from "@/components/common/Title";
import { db } from "@/db/connect";
import { eventsTable } from "@/db/schema";

export default async function EventsPage() {
  const events = await db.select().from(eventsTable);

  return (
    <div>
      <Title level="h2">滞在状況</Title>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`events/${event.id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
