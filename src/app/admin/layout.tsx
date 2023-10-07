import Link from "next/link";

import { css } from "@panda/css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        lg: {
          flexDirection: "row",
        },
      })}
    >
      <div
        className={css({
          lg: {
            w: "200px",
          },
        })}
      >
        <ul>
          <li>
            <Link href="/admin/guests">ゲスト管理</Link>
          </li>
          <li>
            <Link href="/admin/events">イベント管理</Link>
          </li>
          <li>
            <Link href="/admin/history">履歴</Link>
          </li>
        </ul>
      </div>
      <div
        className={css({
          lg: {
            w: "calc(100% - 212px)",
          },
        })}
      >
        {children}
      </div>
    </div>
  );
}
