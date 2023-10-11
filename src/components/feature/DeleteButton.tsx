"use client";

import { useTransition } from "react";

import { IconTrash } from "@tabler/icons-react";

import Button from "@/components/common/Button";
import { deleteEvent, deleteGuest } from "@/utils/actions";

type Props = {
  id: string;
  type: "guest" | "event";
};

export default function DeleteButton({ id, type }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          if (type === "event") {
            await deleteEvent(id);
          } else if (type === "guest") {
            await deleteGuest(id);
          }
        })
      }
      type="submit"
      variant="danger"
    >
      <IconTrash />
      削除する
    </Button>
  );
}
