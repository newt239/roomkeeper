"use client";

import { useState } from "react";

import { QrReader } from "react-qr-reader";

export default function Scanner() {
  const [data, setData] = useState("No result");

  return (
    <div style={{ width: 500 }}>
      <QrReader
        constraints={{ facingMode: "user" }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText());
          }
          if (!!error) {
            console.info(error);
          }
        }}
      />
      <p>{data}</p>
    </div>
  );
}
