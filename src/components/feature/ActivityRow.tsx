"use client";

import Link from "next/link";
import { useTransition } from "react";

import { IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";

import Button from "@/components/common/Button";
import { deleteActivity } from "@/utils/actions";

type Props = {
  activity: {
    id: string;
    guest_id: string;
    guest_name: string;
    event_name: string;
    type: string;
    timestamp: Date;
  };
  latestIdList: string[];
};

export default function ActivityRow({ activity, latestIdList }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <tr>
      <td>
        <Link href={`/admin/guests/${activity.guest_id}`}>
          {activity.guest_id}
        </Link>
      </td>
      <td>{activity.guest_name}</td>
      <td>{activity.event_name}</td>
      <td>{activity.type === "enter" ? "入室" : "退室"}</td>
      <td>{dayjs(activity.timestamp).format("MM/DD HH:mm:ss")}</td>
      {latestIdList.includes(activity.id) && (
        <td>
          <Button
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await deleteActivity(activity.id);
              })
            }
            variant="danger"
          >
            <IconTrash />
            取り消す
          </Button>
        </td>
      )}
    </tr>
  );
}
