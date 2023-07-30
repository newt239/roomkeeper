import { eq } from "drizzle-orm";

import DirectInput from "@/components/feature/DirectInput";
import { db } from "@/db/connect";
import { guestsTable } from "@/db/schema";
import { css } from "@panda/css";

type Props = {
  params: {
    message: string;
  };
};

export default async function ScanPage({ params }: Props) {
  const means = params.message.replaceAll("%2C", ",").split(",");
  const guests = await db
    .select()
    .from(guestsTable)
    .where(eq(guestsTable.id, means[0]));

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <p>
        {guests[0].name}の{means[1] === "enter" ? "入室" : "退室"}処理が
        {means[2] === "success" ? "成功" : "失敗"}しました。
      </p>
      <DirectInput />
    </div>
  );
}
