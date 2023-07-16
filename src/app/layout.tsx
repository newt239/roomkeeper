import type { Metadata } from "next";

import { BIZ_UDPGothic } from "@next/font/google";

import Header from "@/components/client/Header";
import Scanner from "@/components/client/Scanner";
import { css } from "@panda/css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Roomkeeper",
  description: "簡易入退室管理システム",
};

const bizUDPGpthic = BIZ_UDPGothic({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={bizUDPGpthic.className}>
        <Header />
        <main>
          <div className={css({ display: "flex" })}>
            <div className={css({ w: "1/2" })}>
              <Scanner />
            </div>
            <div className={css({ w: "1/2", maxW: 400 })}>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
