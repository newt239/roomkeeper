import Link from "next/link";

import LoadCSV from "@/components/client/LoadCSV";
import { css } from "@panda/css";

export default function SettingsPage() {
  return (
    <div>
      <h2
        className={css({
          fontSize: "3xl",
          mt: 4,
        })}
      >
        設定
      </h2>
      <h3
        className={css({
          fontSize: "2xl",
          mt: 4,
        })}
      >
        ゲストをインポート
      </h3>
      <LoadCSV />
      <h3
        className={css({
          fontSize: "2xl",
          mt: 4,
        })}
      >
        イベント管理
      </h3>
      <Link href="/settings/event">イベント管理</Link>
    </div>
  );
}
