import Image from "next/image";

import Title from "@/components/common/Title";

export default function AdminPage() {
  return (
    <div>
      <Title level="h2">管理画面</Title>
      <Title level="h3">より高度な操作</Title>
      <p>
        データベースはPostgresを利用しています。
        <a href="https://dbeaver.io/" target="_blank">
          DBeaver
        </a>
        等のクライアントソフトなどで直接接続することで、より高度な操作が可能です。
      </p>
      <Title level="h4">データベースURLの確認方法</Title>
      <ul>
        <li>
          <a href="https://vercel.com/dashboard" target="_blank">
            Vercel Dashbboard
          </a>
          にログイン
        </li>
        <li>画面上部タブ内「Storage」から「roomkeeper-db」を選択</li>
        <li>
          「Quickstart」のコード右上にある「Show
          Secret」をクリックした上で、「psql」のダブルクオーテーション内をコピー
        </li>
      </ul>
      <Image
        alt="データベースURLの確認方法"
        height={867}
        quality={100}
        src="/admin/db-url-guide.webp"
        width={1875}
      />
    </div>
  );
}
