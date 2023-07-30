import { redirect } from "next/navigation";

import dayjs from "dayjs";
import { nanoid } from "nanoid";

import Button from "../common/Button";
import Title from "../common/Title";

import { db } from "@/db/connect";
import { activitiesTable } from "@/db/schema";
import { css } from "@panda/css";

type Params = {
  guest_id: string;
  activity_type: "enter" | "exit";
  enter_at: Date | null;
  events: { id: string; name: string }[];
};

export default async function Register(params: Params) {
  async function addActivity(_formData: FormData) {
    "use server";

    const activities = await db
      .insert(activitiesTable)
      .values({
        id: nanoid(),
        guest_id: params.guest_id,
        event_id: "aaa",
        type: params.activity_type,
        timestamp: new Date(),
        available: true,
      })
      .returning();
    if (activities.length === 1) {
      redirect("/");
    }
  }

  return (
    <div>
      <div>
        <Title level="h3">ゲストID</Title>
        <p>{params.guest_id}</p>
        {params.enter_at && (
          <>
            <Title level="h3">入室時刻</Title>
            <p>{dayjs(params.enter_at).format("MM月DD日 HH:mm:ss")}</p>
          </>
        )}
      </div>
      <form
        action={addActivity}
        className={css({
          w: "100%",
          mt: 4,
        })}
      >
        <Title level="h3">イベント</Title>
        <div>
          <select name="event_name">
            {params.events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">
          {params.activity_type === "exit" ? "入室" : "退室"}
        </Button>
      </form>
    </div>
  );
}
