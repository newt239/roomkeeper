"use client";

import ExcelJS from "exceljs";

import Button from "@/components/common/Button";
import Title from "@/components/common/Title";

type Props = {
  activities: {
    id: string;
    guest_id: string;
    event_id: string;
    type: string;
    timestamp: Date;
    available: boolean;
  }[];
};

export default function ExportActivities({ activities }: Props) {
  const handlerClickDownloadButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    format: "xlsx" | "csv"
  ) => {
    e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("sheet1");
    const worksheet = workbook.getWorksheet("sheet1");

    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "ゲストID", key: "guest_id" },
      { header: "イベントID", key: "event_id" },
      { header: "種別", key: "type" },
      { header: "タイムスタンプ", key: "timestamp" },
      { header: "有効", key: "available" },
    ];

    worksheet.addRows(activities);

    const uint8Array = await workbook.csv.writeBuffer();
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sampleData." + format;
    a.click();
    a.remove();
  };

  return (
    <div>
      <Title level="h3">エクスポート</Title>
      <Button onClick={(e) => handlerClickDownloadButton(e, "csv")}>
        CSV形式
      </Button>
    </div>
  );
}
