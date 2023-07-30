import Link from "next/link";

import Menus from "@/components/feature/Menus";
import { css } from "@panda/css";

export default async function Header() {
  return (
    <header
      className={css({
        bgColor: "gray.100",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "gray.200",
        m: 4,
        px: 4,
        h: 16,
        borderRadius: 8,
        shadow: "xl",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        sm: {
          flexDirection: "row",
        },
        _osDark: { bgColor: "gray.700", borderColor: "gray.600" },
      })}
    >
      <Link
        className={css({
          color: "white",
          textDecoration: "none",
        })}
        href="/"
      >
        <h1 className={css({ fontSize: "4xl", fontWeight: 700 })}>
          Roomkeeper
        </h1>
      </Link>
      <div
        className={css({
          display: "flex",
        })}
      >
        <Menus />
      </div>
    </header>
  );
}
