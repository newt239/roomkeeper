"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Title from "@/components/common/Title";
import { checkGuestId } from "@/utils/actions";
import { css } from "@panda/css";

export default function DirectInput() {
  const [inputId, setInputId] = useState<string>("");

  return (
    <div>
      <Title level="h2">直接入力</Title>
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
          name="user_id"
          onChange={(e) => setInputId(e.target.value)}
          type="text"
          value={inputId}
        />
        <Button
          disabled={inputId.length === 0}
          onClick={async () => {
            await checkGuestId(inputId);
          }}
          type="submit"
        >
          検索
        </Button>
      </div>
    </div>
  );
}
