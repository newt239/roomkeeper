"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { css } from "@panda/css";

export default function SearchGuest() {
  const [value, setValue] = useState("");

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Input onChange={(e) => setValue(e.target.value)} value={value} />
      <Button>検索</Button>
    </div>
  );
}
