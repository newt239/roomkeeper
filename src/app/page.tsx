import Title from "@/components/common/Title";

const APP_VERSION = "0.2.1";
const LAST_UPDATE = "2023/07/30 15:30";

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
      <Title level="h3">非対応の機能</Title>
      <ul>
        <li>
          同一のゲストが同時に複数のイベントで入室するケースを考慮していません。つまり、イベント「A」で入室したあとイベント「B」で入室しようとすると、「イベントBの退室」が記録されます。
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
