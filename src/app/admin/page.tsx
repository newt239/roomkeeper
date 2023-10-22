import Link from "next/link";

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
      <Title level="h3">リンク</Title>
      <ul>
        <li>
          <Link href="https://supabase.com/dashboard/projects">
            Supabase Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}
