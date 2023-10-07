"use client";

import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { deleteAllActivities } from "@/utils/actions";
import { css } from "@panda/css";

export default function resetActivities({ date }: { date: string }) {
  return (
    <div>
      <Title level="h3">データリセット</Title>
      <p className={css({ mb: 3 })}>
        すべてのスキャン記録を削除します。この操作は取り消せません。
      </p>
      <form action={() => deleteAllActivities(date)}>
        <Button type="submit" variant="danger">
          リセットする
        </Button>
      </form>
    </div>
  );
}
