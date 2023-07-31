"use client";

import ExcelJS from "exceljs";

import Button from "@/components/common/Button";
import Title from "@/components/common/Title";

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
    workbook.addWorksheet("sheet1");
    const worksheet = workbook.getWorksheet("sheet1");

    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "ゲストID", key: "guest_id" },
      { header: "イベント名", key: "event_id" },
      { header: "種別", key: "type" },
      { header: "タイムスタンプ", key: "timestamp" },
    ];

    worksheet.addRows(activities);

    const uint8Array = await workbook.csv.writeBuffer();
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sampleData.csv";
    a.click();
    a.remove();
  };

  return (
    <div>
      <Title level="h3">エクスポート</Title>
      <Button onClick={handlerClickDownloadButton}>CSV形式</Button>
    </div>
  );
}
