"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { QrReader } from "react-qr-reader";

import { css } from "@panda/css";

export default function Scanner() {
  const router = useRouter();
  const [cameraState, setCameraState] = useState<boolean>(false);

  useEffect(() => {
    setCameraState(true);
  }, []);

  return (
    <div
      className={css({
        m: 4,
        display: "flex",
        gap: 4,
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <label htmlFor="switch">
        <input
          checked={cameraState}
          id="switch"
          onChange={() => setCameraState((v) => !v)}
          type="checkbox"
        />
        カメラを{cameraState ? "停止" : "起動"}する
      </label>
      <div className={css({ w: "min(50vw, 70vh)", h: "min(50vw, 70vh)" })}>
        <div
          className={css({
            w: "100%",
            h: "100%",
            bgColor: "gray.100",
            borderRadius: 16,
            _osDark: { bgColor: "gray.700" },
          })}
        >
          {cameraState && (
            <QrReader
              constraints={{ facingMode: "user" }}
              onResult={(result, _error) => {
                if (!!result) {
                  router.push(`/${result.getText()}`);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
