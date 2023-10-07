import Link from "next/link";

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
        py: 2,
        borderRadius: 8,
        shadow: "xl",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        sm: {
          flexDirection: "row",
          py: 0,
          h: 16,
        },
        _osDark: { bgColor: "gray.700", borderColor: "gray.600" },
      })}
    >
      <Link
        className={css({
          color: "black",
          textDecoration: "none",
          _hover: {
            opacity: 0.7,
          },
          _osDark: { color: "white" },
        })}
        href="/"
      >
        <h1 className={css({ fontSize: "4xl", fontWeight: 700 })}>
          Roomkeeper
        </h1>
      </Link>
    </header>
  );
}
