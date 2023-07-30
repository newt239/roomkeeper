"use client";

import { useState } from "react";

import { checkUserId } from "@/app/actions";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Title from "@/components/common/Title";
import { css } from "@panda/css";

export default function HomePage() {
  const [error, setError] = useState<string | null>(null);
  const [inputId, setInputId] = useState<string>("");

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Title level="h2">直接入力</Title>
      <form
        action={async (formData) => {
          setError(null);
          const result = await checkUserId(formData);
          if (result.status === "error") {
            setError("ユーザーIDが入力されていません。");
          }
        }}
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
        <Button disabled={inputId.length === 0} type="submit">
          検索
        </Button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
