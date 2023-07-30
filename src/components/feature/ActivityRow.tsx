"use client";

import { useTransition } from "react";

import dayjs from "dayjs";

import Button from "@/components/common/Button";
import { deleteActivity } from "@/utils/actions";

type Props = {
  activity: {
    id: string;
    guest_id: string;
    type: string;
    timestamp: Date;
  };
  latestIdList: string[];
};

export default function ActivityRow({ activity, latestIdList }: Props) {
  const [_isPending, startTransition] = useTransition();

  return (
    <tr>
      <td>{activity.guest_id}</td>
      <td>{activity.type === "enter" ? "入室" : "退室"}</td>
      <td>{dayjs(activity.timestamp).format("MM/DD HH:mm:ss")}</td>
      <td>
        {latestIdList.includes(activity.id) && activity.type === "enter" && (
          <Button
            onClick={() =>
              startTransition(() => {
                (async () => await deleteActivity(activity.id))();
              })
            }
          >
            取り消す
          </Button>
        )}
      </td>
    </tr>
  );
}
