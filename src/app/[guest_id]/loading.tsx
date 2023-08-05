import { IconLoader2 } from "@tabler/icons-react";

import { css } from "@panda/css";

export default function Loading() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "row",
        gap: 2,
      })}
    >
      <IconLoader2
        className={css({
          animation: "spin 1s linear infinite",
        })}
      />
      読み込み中...
    </div>
  );
}
