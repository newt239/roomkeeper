"use client";

import { useState } from "react";

import { checkUserId } from "@/app/actions";
import { css } from "@panda/css";

export default function HomePage() {
  const [error, setError] = useState<string | null>(null);
  const [inputId, setInputId] = useState<string>("");

  return (
    <div
      className={css({
        m: 4,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <p>QRコードをスキャンしてください。</p>
      <h3
        className={css({
          mt: 4,
          fontSize: "2xl",
        })}
      >
        直接入力する
      </h3>
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
        <input
          className={css({
            p: 2,
            borderRadius: 4,
            outline: "none",
            w: "100%",
            transition: "all 0.2s ease-in-out",
            _focus: {
              borderColor: "blue.500",
              boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
            },
          })}
          name="user_id"
          onChange={(e) => setInputId(e.target.value)}
          type="text"
          value={inputId}
        />
        <button
          className={css({
            mt: 2,
            p: 2,
            borderRadius: 4,
            w: "25%",
            minW: 100,
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
              _osDark: {
                bgColor: "gray.700",
                _hover: {
                  bgColor: "gray.700",
                },
              },
            },
          })}
          disabled={inputId.length === 0}
          type="submit"
        >
          検索
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
