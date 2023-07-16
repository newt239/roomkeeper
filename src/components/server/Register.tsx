import { redirect } from "next/navigation";

import dayjs from "dayjs";

import { db } from "@/db/connect";
import { activitiesTable } from "@/db/schema";
import { css } from "@panda/css";

type Params = {
  guest_id: string;
  activity_type: "enter" | "exit";
  enter_at: Date | null;
};

export default async function Register(params: Params) {
  async function addActivity(_formData: FormData) {
    "use server";

    const result = await db
      .insert(activitiesTable)
      .values({
        guest_id: params.guest_id,
        type: params.activity_type,
        timestamp: new Date(),
        available: true,
      })
      .returning();
    if (result.length === 1) {
      redirect("/");
    }
  }

  return (
    <div>
      <div>
        <h3
          className={css({
            fontSize: "2xl",
            mt: 4,
          })}
        >
          ゲストID
        </h3>
        <p>{params.guest_id}</p>
        {params.enter_at && (
          <>
            <h3
              className={css({
                fontSize: "2xl",
                mt: 4,
              })}
            >
              入室時刻
            </h3>
            <p>{dayjs(params.enter_at).format("MM月DD日 HH:mm:ss")}</p>
          </>
        )}
      </div>
      <form
        action={addActivity}
        className={css({
          mt: 4,
        })}
      >
        <button
          className={css({
            mt: 2,
            p: 2,
            borderRadius: 4,
            w: "100%",
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
          type="submit"
        >
          {params.activity_type === "exit" ? "入室" : "退室"}記録をつける
        </button>
      </form>
    </div>
  );
}
