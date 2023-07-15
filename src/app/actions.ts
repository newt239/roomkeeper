"use server";

import { redirect } from "next/navigation";

export async function checkUserId(formData: FormData) {
  const userId = formData.get("user_id");
  if (typeof userId === "string") {
    redirect(`/${userId}`);
  } else {
    return { status: "error" };
  }
}
