"use client";

import encoding from "encoding-japanese";
import ExcelJS from "exceljs";

import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { css } from "@panda/css";

type Props = {
  activities: {
    id: string;
    guest_id: string;
    event_name: string;
    type: string;
    timestamp: Date;
  }[];
};

export default function ExportActivities({ activities }: Props) {
  const handlerClickDownloadButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("roomkeeper_activities");
    const worksheet = workbook.getWorksheet("roomkeeper_activities");

    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "ゲストID", key: "guest_id" },
      { header: "イベント名", key: "event_name" },
      { header: "種別", key: "type" },
      { header: "タイムスタンプ", key: "timestamp" },
    ];

    worksheet.addRows(activities);

    const uint8Array = new Uint8Array(
      encoding.convert((await workbook.csv.writeBuffer()) as Uint8Array, {
        from: "UTF8",
        to: "SJIS",
      })
    );
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roomkeeper_activities.csv";
    a.click();
    a.remove();
  };

  return (
    <div>
      <Title level="h3">エクスポート</Title>
      <Button
        className={css({
          my: 4,
        })}
        onClick={handlerClickDownloadButton}
      >
        ダウンロード
      </Button>
      <ul>
        <li>拡張子: csv</li>
        <li>文字コード: Shift-JIS</li>
      </ul>
    </div>
  );
}
