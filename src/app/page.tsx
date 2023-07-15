"use client";

import { useState } from "react";

import { checkUserId } from "@/app/actions";

export default function HomePage() {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <p>QRコードをスキャンしてください</p>
      <h3>直接入力する</h3>
      <form
        action={async (formData) => {
          setError(null);
          const result = await checkUserId(formData);
          if (result.status === "error") {
            setError("ユーザーIDが入力されていません。");
          }
        }}
      >
        <input name="user_id" type="text" />
        <button type="submit">検索</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
