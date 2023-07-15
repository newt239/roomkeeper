"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { QrReader } from "react-qr-reader";

import { css } from "@panda/css";

export default function Scanner() {
  const router = useRouter();
  const [data, setData] = useState("No result");
  const [cameraState, setCameraState] = useState<boolean>(true);

  return (
    <>
      <label htmlFor="switch">
        <input
          checked={cameraState}
          id="switch"
          onChange={() => setCameraState((v) => !v)}
          type="checkbox"
        />
        カメラを{cameraState ? "停止" : "起動"}する
      </label>
      <div className={css({ w: "min(50vw, 50vh)", h: "min(50vw, 50vh)" })}>
        {window !== undefined && cameraState ? (
          <>
            <QrReader
              constraints={{ facingMode: "user" }}
              onResult={(result, error) => {
                if (!!result) {
                  setData(result.getText());
                  router.push(`/${result.getText()}`);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
            />
            <p>{data}</p>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
