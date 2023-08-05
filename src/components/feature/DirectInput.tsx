"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Title from "@/components/common/Title";
import { css } from "@panda/css";

export default function DirectInput() {
  const router = useRouter();
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
        <Link href={`/${inputId}`}>
          <Button disabled={inputId.length === 0}>検索</Button>
        </Link>
      </div>
    </div>
  );
}
