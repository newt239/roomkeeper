import type { Metadata } from "next";

import { BIZ_UDPGothic } from "@next/font/google";

import Scanner from "@/components/client/Scanner";
import Header from "@/components/server/Header";
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
          <div
            className={css({
              m: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              md: {
                flexDirection: "row",
                alignItems: "flex-start",
              },
            })}
          >
            <div
              className={css({
                w: "100%",
                md: {
                  w: "50%",
                },
              })}
            >
              <Scanner />
            </div>
            <div className={css({ w: "100%", md: { w: "40%", maxW: 400 } })}>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
