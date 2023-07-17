"use server";

import { redirect } from "next/navigation";

import { db } from "@/db/connect";
import { guestsTable } from "@/db/schema";

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
