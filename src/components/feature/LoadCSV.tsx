"use client";

import { ChangeEventHandler, useState } from "react";

import Encoding from "encoding-japanese";

import { importGuests } from "@/app/actions";

export default function LoadCSV() {
  const [message, setMessage] = useState<string | null>(null);

  const fileReader = new FileReader();

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files) {
      fileReader.readAsText(files[0], "SHIFT_JIS");
      fileReader.onload = (ev) => {
        const csvOutput = ev.target?.result;
        if (typeof csvOutput === "string") {
          const defaultArray = Encoding.stringToCode(csvOutput);
          const unicodeArray = Encoding.convert(defaultArray, {
            to: "UNICODE",
            from: "AUTO",
          });
          const encodedString = Encoding.codeToString(unicodeArray);
          csvFileToArray(encodedString).then(async (rows) => {
            const result = await importGuests(rows);
            setMessage(result);
          });
        }
      };
    }
  };

  const csvFileToArray = async (raw: string) => {
    const csvRows = raw.split("\n");
    const data = csvRows.map((row) => row.split(","));
    return data;
  };

  return (
    <div>
      <p>
        タブ区切りのCSVファイルで、1列目にID、2列目に名前を入力してください。
      </p>
      <input accept=".csv" onChange={handleOnChange} type="file" />
      {message && <p>{message}</p>}
    </div>
  );
}
