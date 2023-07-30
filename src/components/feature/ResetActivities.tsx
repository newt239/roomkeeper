"use client";

import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { deleteAllActivities } from "@/utils/actions";

export default function resetActivities() {
  return (
    <div>
      <Title level="h3">データリセット</Title>
      <form action={deleteAllActivities}>
        <Button type="submit" variant="danger">
          リセットする
        </Button>
      </form>
    </div>
  );
}
