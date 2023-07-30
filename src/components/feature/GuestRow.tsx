"use client";

import { useTransition } from "react";

import Button from "@/components/common/Button";
import { deleteGuest } from "@/utils/actions";

type Props = {
  guest_id: string;
  guest_name: string;
};

export default function EachGuest({ guest_id, guest_name }: Props) {
  const [_isPending, startTransition] = useTransition();

  return (
    <tr>
      <td>{guest_id}</td>
      <td>{guest_name}</td>
      <td>
        <Button
          onClick={() =>
            startTransition(async () => {
              await deleteGuest(guest_id);
            })
          }
        >
          削除
        </Button>
      </td>
    </tr>
  );
}
