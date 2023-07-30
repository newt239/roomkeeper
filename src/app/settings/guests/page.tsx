import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import EachGuest from "@/components/feature/GuestRow";
import LoadCSV from "@/components/feature/LoadCSV";
import { db } from "@/db/connect";
import { guestsTable } from "@/db/schema";
import { deleteAllGuests } from "@/utils/actions";

export default async function GuestSettingsPage() {
  const guests = await db
    .select()
    .from(guestsTable)
    .orderBy(guestsTable.name)
    .limit(20);

  return (
    <div>
      <Title level="h2">ゲスト管理</Title>
      <LoadCSV />
      <Title level="h3">一覧</Title>
      <table>
        <thead>
          <tr>
            <th>ゲストID</th>
            <th>名前</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <EachGuest
              guest_id={guest.id}
              guest_name={guest.name}
              key={guest.id}
            />
          ))}
        </tbody>
      </table>
      <Title level="h3">データリセット</Title>
      <form action={deleteAllGuests}>
        <Button type="submit" variant="danger">
          リセットする
        </Button>
      </form>
    </div>
  );
}
