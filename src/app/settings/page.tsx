import Link from "next/link";

import Title from "@/components/common/Title";

export default function SettingsPage() {
  return (
    <div>
      <Title level="h2">設定</Title>
      <ul>
        <li>
          <Link href="/settings/guests">ゲスト管理</Link>
        </li>
        <li>
          <Link href="/settings/events">イベント管理</Link>
        </li>
      </ul>
    </div>
  );
}
