"use client";

import dayjs from "dayjs";

import Button from "../common/Button";
import Title from "../common/Title";

import { addActivity } from "@/app/actions";
import { css } from "@panda/css";

type Params = {
  guest_id: string;
  activity_type: "enter" | "exit";
  enter_at: Date | null;
  events: { id: string; name: string }[];
};

export default function Register(params: Params) {
  const defaultEvent = localStorage.getItem("defaultEvent") || "default";

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem("defaultEvent", e.target.value);
  };

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
        action={async (formData: FormData) => {
          const event_id = formData.get("event_name") as string;
          await addActivity({
            event_id,
            guest_id: params.guest_id,
            type: params.activity_type,
          });
        }}
        className={css({
          w: "100%",
          mt: 4,
        })}
      >
        <Title level="h3">イベント</Title>
        <div>
          <select
            defaultValue={
              params.events.map((event) => event.id).includes(defaultEvent)
                ? defaultEvent
                : "default"
            }
            name="event_name"
            onChange={onSelectChange}
          >
            <option key="default" value="default">
              デフォルト
            </option>
            {params.events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className={css({
            my: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
          })}
        >
          <Button type="submit">
            {params.activity_type === "enter" ? "入室" : "退室"}
          </Button>
        </div>
      </form>
    </div>
  );
}
