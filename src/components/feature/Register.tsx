"use client";

import { useState, useTransition } from "react";

import dayjs from "dayjs";

import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { addActivity, saveToCookie } from "@/utils/actions";
import { css } from "@panda/css";

type Props = {
  default_event_id: string;
  guest_id: string;
  activity_type: "enter" | "exit";
  enter_at: Date | null;
  events: { id: string; name: string }[];
};

export default function Register(params: Props) {
  const [_isPending, startTransition] = useTransition();
  const [eventId, setEventId] = useState(params.default_event_id);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventId(e.target.value);
    (async () => await saveToCookie("default_event_id", e.target.value))();
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
      <div
        className={css({
          w: "100%",
          mt: 4,
        })}
      >
        <Title level="h3">イベント</Title>
        <div>
          <select name="event_name" onChange={onSelectChange} value={eventId}>
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
          <Button
            onClick={() =>
              startTransition(async () => {
                await addActivity({
                  event_id: eventId,
                  guest_id: params.guest_id,
                  type: params.activity_type,
                });
              })
            }
          >
            {params.activity_type === "enter" ? "入室" : "退室"}
          </Button>
        </div>
      </div>
    </div>
  );
}
