import Title from "@/components/common/Title";

const APP_VERSION = "0.4.0";
const LAST_UPDATE = "2023/07/30 20:45";

export default async function HomePage() {
  return (
    <div>
      <Title level="h2">簡易入退室記録システム</Title>
      <Title level="h3">メニュー</Title>
      <ul>
        <li>
          <a href="/scan">スキャン</a>
        </li>
        <li>
          <a href="/events">滞在状況</a>
        </li>
        <li>
          <a href="/history">履歴</a>
        </li>
        <li>
          <a href="/settings">設定</a>
        </li>
      </ul>
      <Title level="h3">使い方</Title>
      <ul>
        <li>
          イベントの削除は事前に入退室記録をすべて削除してから実行してください。
        </li>
      </ul>
      <Title level="h3">アプリ情報</Title>
      <ul>
        <li>v{APP_VERSION}</li>
        <li>最終更新: {LAST_UPDATE}</li>
        <li>
          <a href="https://github.com/newt239/roomkeeper" target="_blank">
            newt239/roomkeeper - GitHub
          </a>
        </li>
      </ul>
    </div>
  );
}
