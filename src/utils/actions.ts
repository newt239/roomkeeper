"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { and, desc, eq } from "drizzle-orm";
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
    try {
      const result = await db.insert(guestsTable).values(guestList);
      revalidatePath("/admin/guests");
      return `${result.rowCount}件のデータをインポートしました。`;
    } catch (e) {
      return "エラーが発生しました。データ型が不適切か、すでにデータベースに同じIDが登録されている可能性があります。";
    }
  } else {
    return "エラーが発生しました。";
  }
}

export async function deleteGuest(id: string) {
  const result = await db.delete(guestsTable).where(eq(guestsTable.id, id));
  revalidatePath("/admin/guests");
  return `${result.rowCount}件のゲストを削除しました。`;
}

export async function deleteAllGuests() {
  const result = await db.delete(guestsTable);
  revalidatePath("/admin/guests");
  return `${result.rowCount}件のゲストを削除しました。`;
}

export async function addActivity({
  event_id,
  guest_id,
}: {
  event_id: string;
  guest_id: string;
}) {
  const guests = await db
    .select()
    .from(guestsTable)
    .where(and(eq(guestsTable.id, guest_id), eq(guestsTable.available, true)))
    .limit(1);
  if (guests.length !== 1) {
    return null;
  }
  const activities = await db
    .select()
    .from(activitiesTable)
    .where(
      and(
        eq(activitiesTable.guest_id, guest_id),
        eq(activitiesTable.event_id, event_id),
        eq(activitiesTable.available, true)
      )
    )
    .orderBy(desc(activitiesTable.timestamp))
    .limit(1);
  const type =
    activities.length === 1 && activities[0].type === "enter"
      ? "exit"
      : "enter";
  await db.insert(activitiesTable).values({
    id: nanoid(),
    guest_id,
    event_id,
    type,
    timestamp: new Date(),
    available: true,
  });
  return { event_id, guest_id, type };
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
  revalidatePath(`/events/${event_id}`);
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
  revalidatePath("/settings/events");
  return `${name}というイベントを作成しました。`;
}
export async function deleteEvent(id: string) {
  const result = await db.delete(eventsTable).where(eq(eventsTable.id, id));
  revalidatePath("/admin/events");
  return `${result.rowCount}件の入退室記録を削除しました。`;
}

export async function deleteActivity(id: string) {
  const result = await db
    .delete(activitiesTable)
    .where(eq(activitiesTable.id, id));
  revalidatePath("/admin/history");
  return `${result.rowCount}件の入退室記録を削除しました。`;
}

export async function deleteAllActivities() {
  const result = await db.delete(activitiesTable);
  revalidatePath("/admin/history");
  return `${result.rowCount}件の入退室記録を削除しました。`;
}

export async function saveToCookie(key: string, value: string) {
  cookies().set(key, value);
}

export async function revalidateSpecificPath(path: string) {
  revalidatePath(path);
}
