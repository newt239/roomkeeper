"use server";

import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { db } from "@/db/connect";
import { activitiesTable, eventsTable, guestsTable } from "@/db/schema";

export async function importGuests(guests: string[][]) {
  const guestList = guests
    .filter((guest) => guest.length >= 2)
    .map((guest) => {
      return {
        id: guest[0],
        name: guest[1],
        available: true,
      };
    })
    .filter((guest) => typeof guest.id === "string" && guest.id !== "");
  if (guestList.length !== 0) {
    const result = await db.insert(guestsTable).values(guestList);
    return `${result.rowCount}件のデータをインポートしました。`;
  } else {
    return "エラーが発生しました。データ型が不適切か、すでにデータベースに同じIDが登録されている可能性があります。";
  }
}

export async function deleteGuest(id: string) {
  const result = await db.delete(guestsTable).where(eq(guestsTable.id, id));
  return `${result.rowCount}件のゲストを削除しました。`;
}

export async function deleteAllGuests() {
  const result = await db.delete(guestsTable);
  return `${result.rowCount}件のゲストを削除しました。`;
}

export async function addActivity({
  event_id,
  guest_id,
  type,
}: {
  event_id: string;
  guest_id: string;
  type: "enter" | "exit";
}) {
  await db.insert(activitiesTable).values({
    id: nanoid(),
    guest_id,
    event_id,
    type,
    timestamp: new Date(),
    available: true,
  });
}

export async function executeExitAction(guest_id: string, event_id: string) {
  await db.insert(activitiesTable).values({
    id: nanoid(),
    guest_id,
    event_id,
    type: "exit",
    timestamp: new Date(),
    available: true,
  });
}

export async function createEvent(formData: FormData) {
  const name = formData.get("event_name");
  const eventId = nanoid();
  if (typeof name !== "string") {
    return "イベント名が不適切です。";
  }
  await db.insert(eventsTable).values({
    id: eventId,
    name,
    available: true,
  });
  return `${name}というイベントを作成しました。`;
}

export async function deleteActivity(id: string) {
  const result = await db
    .delete(activitiesTable)
    .where(eq(activitiesTable.id, id));
  return `${result.rowCount}件の入退室記録を削除しました。`;
}

export async function deleteAllActivities() {
  const result = await db.delete(activitiesTable);
  return `${result.rowCount}件の入退室記録を削除しました。`;
}
