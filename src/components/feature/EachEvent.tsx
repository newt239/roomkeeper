"use client";

import Link from "next/link";
import { useTransition } from "react";

import { IconTrash } from "@tabler/icons-react";

import Button from "@/components/common/Button";
import { deleteEvent } from "@/utils/actions";

type Props = {
  event_id: string;
  event_name: string;
};

export default function EachEvent({ event_id, event_name }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <tr>
      <td>
        <Link href={`/admin/events/${event_id}`}>{event_id}</Link>
      </td>
      <td>{event_name}</td>
      <td>
        <Button
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await deleteEvent(event_id);
            })
          }
          variant="danger"
        >
          <IconTrash />
          削除
        </Button>
      </td>
    </tr>
  );
}
