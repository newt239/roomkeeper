"use client";

import { useState, useTransition } from "react";

import { IconWriting } from "@tabler/icons-react";
import { toast } from "react-toastify";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { addActivity } from "@/utils/actions";
import { errorBeep, successBeep } from "@/utils/tone";
import { USER_ID_LENGTH } from "@/utils/vars";
import { css } from "@panda/css";

type Props = {
  event_id: string;
};

export default function DirectInput({ event_id }: Props) {
  const [isPending, startTransition] = useTransition();
  const [inputId, setInputId] = useState<string>("");

  const handleClick = () => {
    if (inputId.length === USER_ID_LENGTH && !isPending) {
      startTransition(async () => {
        const result = await addActivity({
          event_id,
          guest_id: inputId,
        });
        if (result === null) {
          toast.error(`${inputId}というゲストは存在しません`);
          await errorBeep();
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
              autoClose: 1000,
            }
          );
          await successBeep();
          setInputId("");
        }
      });
    }
  };

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
            handleClick();
          }
        }}
        type="text"
        value={inputId}
      />
      <Button
        disabled={inputId.length !== USER_ID_LENGTH || isPending}
        onClick={handleClick}
      >
        <IconWriting />
        記録する
      </Button>
    </div>
  );
}
