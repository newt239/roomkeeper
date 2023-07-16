"use client";

import Link from "next/link";

import { css } from "@panda/css";

export default function Header() {
  const links = [
    { href: "/", label: "スキャン" },
    { href: "/history", label: "履歴" },
  ];

  return (
    <header
      className={css({
        bgColor: "gray.100",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "gray.200",
        m: 4,
        px: 4,
        py: 2,
        borderRadius: 8,
        shadow: "md",
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
      <h1 className={css({ fontSize: "4xl", fontWeight: 700 })}>Roomkeeper</h1>
      <div
        className={css({
          display: "flex",
        })}
      >
        {links.map(({ href, label }) => (
          <Link
            className={css({
              px: 4,
              py: 2,
              borderRadius: 8,
              transition: "all 0.2s",
              _hover: { bgColor: "gray.200", _osDark: { bgColor: "gray.600" } },
            })}
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
