"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { IconLoader2 } from "@tabler/icons-react";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import {
  addActivity,
  revalidateSpecificPath,
  saveToCookie,
} from "@/utils/actions";
import { css } from "@panda/css";

type Props = {
  default_event_id: string;
  guest_id: string;
  guest_name: string;
  activity_type: "enter" | "exit";
  enter_at: Date | null;
  events: { id: string; name: string }[];
};

export default function Register(params: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [eventId, setEventId] = useState(params.default_event_id);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(async () => {
      setEventId(e.target.value);
      await saveToCookie("default_event_id", e.target.value);
      await revalidateSpecificPath(`/${params.guest_id}`);
    });
  };

  useEffect(() => {
    startTransition(async () => {
      await revalidateSpecificPath(`/${params.guest_id}`);
    });
  }, [params.guest_id]);

  return (
    <div>
      <Title level="h3">ゲストID</Title>
      <p>{params.guest_id}</p>
      <Title level="h3">氏名</Title>
      <p>{params.guest_name}</p>
      {params.enter_at && (
        <>
          <Title level="h3">入室時刻</Title>
          <p>{dayjs(params.enter_at).format("MM/DD HH:mm:ss")}</p>
        </>
      )}
      <Title level="h3">イベント</Title>
      <div>
        <select
          name="event_name"
          onChange={onSelectChange}
          required
          value={eventId}
        >
          <option disabled value="">
            イベントを選択してください
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
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 5,
        })}
      >
        {isPending && (
          <div
            className={css({
              display: "flex",
              flexDirection: "row",
              gap: 2,
            })}
          >
            <IconLoader2
              className={css({
                animation: "spin 1s linear infinite",
              })}
            />
            <span>処理中...</span>
          </div>
        )}
        <Button
          disabled={isPending || eventId === ""}
          onClick={() =>
            startTransition(async () => {
              const result = await addActivity({
                event_id: eventId,
                guest_id: params.guest_id,
                type: params.activity_type,
              });
              router.push(`/scan`);
              toast.success(
                `${result.guest_id}の${
                  result.type === "enter" ? "入室" : "退室"
                }処理に成功`,
                {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "dark",
                  closeButton: true,
                  hideProgressBar: true,
                  autoClose: 2000,
                }
              );
            })
          }
        >
          {params.activity_type === "enter" ? "入室" : "退室"}
        </Button>
      </div>
    </div>
  );
}
