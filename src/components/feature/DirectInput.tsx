"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { toast } from "react-toastify";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { addActivity } from "@/utils/actions";
import { css } from "@panda/css";

type Props = {
  event_id: string;
};

export default function DirectInput({ event_id }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [inputId, setInputId] = useState<string>("");

  return (
    <div
      className={css({
        my: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2,
      })}
    >
      <Input
        autoFocus
        name="user_id"
        onChange={(e) => setInputId(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/${inputId}`);
          }
        }}
        type="text"
        value={inputId}
      />
      <Button
        disabled={inputId.length === 0 || isPending}
        onClick={() =>
          startTransition(async () => {
            const result = await addActivity({
              event_id,
              guest_id: inputId,
            });
            if (result === null) {
              toast.error("エラーが発生しました");
            } else {
              toast.success(
                `${result.guest_id}の${
                  result.type === "enter" ? "入室" : "退室"
                }処理に成功しました`,
                {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "dark",
                  closeButton: true,
                  hideProgressBar: true,
                  autoClose: 2000,
                }
              );
              setInputId("");
            }
          })
        }
      >
        記録する
      </Button>
    </div>
  );
}
