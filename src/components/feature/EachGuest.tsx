"use client";

import Link from "next/link";
import { useTransition } from "react";

import { IconTrash } from "@tabler/icons-react";

import Button from "@/components/common/Button";
import { deleteGuest } from "@/utils/actions";

type Props = {
  guest_id: string;
  guest_name: string;
};

export default function EachGuest({ guest_id, guest_name }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <tr>
      <td>
        <Link href={`/admin/guests/${guest_id}`}>{guest_id}</Link>
      </td>
      <td>{guest_name}</td>
      <td>
        <Button
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await deleteGuest(guest_id);
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
