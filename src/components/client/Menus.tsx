"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { css } from "@panda/css";

export default function Menus() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "スキャン" },
    { href: "/room", label: "滞在状況" },
    { href: "/history", label: "履歴" },
    { href: "/settings", label: "設定" },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          aria-current={pathname === href ? "page" : undefined}
          className={css({
            color: "inherit",
            textDecoration: "none",
            px: 4,
            py: 2,
            borderRadius: 8,
            transition: "all 0.2s",
            _hover: {
              bgColor: "gray.200",
              _osDark: {
                bgColor: "gray.600",
              },
            },
            _currentPage: {
              color: "green.500",
            },
          })}
          href={href}
          key={href}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
