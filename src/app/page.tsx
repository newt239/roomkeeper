import { db } from "@/db/connect";
import { guestsTable } from "@/db/schema";

export default async function Home() {
  const guests = await db.select().from(guestsTable);
  await db.insert(guestsTable).values({ name: "test" });
  console.log(guests);

  return <>QRコードをスキャンしてください</>;
}
