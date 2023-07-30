"use client";

import Button from "@/components/common/Button";
import { deleteGuest } from "@/utils/actions";

type Props = {
  guest_id: string;
  guest_name: string;
};

export default function EachGuest({ guest_id, guest_name }: Props) {
  return (
    <tr>
      <td>{guest_id}</td>
      <td>{guest_name}</td>
      <td>
        <form action={async () => await deleteGuest(guest_id)}>
          <Button type="submit">削除</Button>
        </form>
      </td>
    </tr>
  );
}
