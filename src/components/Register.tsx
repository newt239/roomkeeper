import { redirect } from "next/navigation";

import { db } from "@/db/connect";
import { activitiesTable } from "@/db/schema";

type Params = {
  guest_id: string;
  activity_type: "enter" | "exit";
};

export default async function Register(params: Params) {
  async function addActivity(_formData: FormData) {
    "use server";

    const result = await db
      .insert(activitiesTable)
      .values({
        guest_id: params.guest_id,
        type: params.activity_type,
        timestamp: new Date(),
        available: true,
      })
      .returning();
    if (result.length === 1) {
      redirect("/");
    }
  }

  return (
    <div>
      <form action={addActivity}>
        <button type="submit">
          {params.activity_type ? "入室" : "退室"}記録をつける
        </button>
      </form>
    </div>
  );
}
