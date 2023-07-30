"use client";

import { useTransition } from "react";

import dayjs from "dayjs";

import Button from "@/components/common/Button";
import { executeExitAction } from "@/utils/actions";

type Props = {
  event_id: string;
  guest: {
    guest_id: string;
    name: string;
    enter_at: Date;
  };
};

export default function EventGuestRow({ event_id, guest }: Props) {
  const [_isPending, startTransition] = useTransition();

  return (
    <tr key={guest.guest_id}>
      <td>{guest.guest_id}</td>
      <td>{guest.name}</td>
      <td>{dayjs(guest.enter_at).format("MM/DD HH:mm:ss")}</td>
      <td>
        <Button
          onClick={() =>
            startTransition(async () => {
              await executeExitAction(guest.guest_id, event_id);
            })
          }
        >
          退室する
        </Button>
      </td>
    </tr>
  );
}
