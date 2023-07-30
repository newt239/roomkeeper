"use client";

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
  return (
    <tr>
      <td>{activity.guest_id}</td>
      <td>{activity.type === "enter" ? "入室" : "退室"}</td>
      <td>{dayjs(activity.timestamp).format("MM/DD HH:mm:ss")}</td>
      <td>
        {latestIdList.includes(activity.id) && activity.type === "enter" && (
          <Button
            onClick={async () => {
              await deleteActivity(activity.id);
            }}
            type="submit"
          >
            取り消す
          </Button>
        )}
      </td>
    </tr>
  );
}
