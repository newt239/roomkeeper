import DirectInput from "@/components/feature/DirectInput";
import { css } from "@panda/css";

export default function ScanPage() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <DirectInput />
    </div>
  );
}
