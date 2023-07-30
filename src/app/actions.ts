"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { nanoid } from "nanoid";

import { db } from "@/db/connect";
import { activitiesTable, eventsTable, guestsTable } from "@/db/schema";

export async function checkUserId(formData: FormData) {
  const userId = formData.get("user_id");
  if (typeof userId === "string") {
    redirect(`/${userId}`);
  } else {
    return { status: "error" };
  }
}

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

export async function createEvent(formData: FormData) {
  const name = formData.get("event_name");
  const eventId = nanoid();
  if (typeof name !== "string") {
    return "イベント名が不適切です。";
  }
  const result = await db.insert(eventsTable).values({
    id: eventId,
    name,
    available: true,
  });
  revalidatePath(`/settings`);
  return `${name}というイベントを作成しました。`;
}

export async function deleteAllActivities() {
  const result = await db.delete(activitiesTable);
  revalidatePath(`/history`);
  return `${result.rowCount}件の入退室記録を削除しました。`;
}
