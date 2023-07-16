import Link from "next/link";

import { desc, eq } from "drizzle-orm";

import Register from "@/components/server/Register";
import { db } from "@/db/connect";
import { activitiesTable, guestsTable } from "@/db/schema";
import { css } from "@panda/css";

type Params = {
  guest_id: string;
};

export default async function StudentIDPage({ params }: { params: Params }) {
  const guests = await db
    .select()
    .from(guestsTable)
    .where(eq(guestsTable.id, params.guest_id));

  console.log(guests);

  const activities = await db
    .select()
    .from(activitiesTable)
    .where(eq(activitiesTable.guest_id, params.guest_id))
    .orderBy(desc(activitiesTable.timestamp));

  const activity_type: "enter" | "exit" =
    activities.length === 0
      ? "enter"
      : activities[0].type === "enter"
      ? "exit"
      : "enter";

  return (
    <div>
      {guests.length === 1 ? (
        <Register
          activity_type={activity_type}
          enter_at={activities[0].timestamp}
          guest_id={guests[0].id}
        />
      ) : (
        <div
          className={css({
            my: 4,
          })}
        >
          <p>入力された「{params.guest_id}」というIDは存在しません。</p>
          <div
            className={css({
              w: "100%",
              display: "flex",
              justifyContent: "flex-end",
            })}
          >
            <Link
              className={css({
                display: "block",
                textAlign: "center",
                mt: 8,
                p: 2,
                borderRadius: 4,
                w: 150,
                cursor: "pointer",
                bgColor: "blue.500",
                transition: "all 0.2s ease-in-out",
                _hover: {
                  bgColor: "blue.600",
                },
                _focus: {
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                },
                _disabled: {
                  bgColor: "gray.300",
                  cursor: "not-allowed",
                  _hover: {
                    bgColor: "gray.300",
                  },
                },
              })}
              href="/"
            >
              スキャンし直す
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
