import type { Metadata } from "next";
import { BIZ_UDPGothic } from "next/font/google";

import { Slide, ToastContainer } from "react-toastify";

import Header from "@/components/feature/Header";
import "@/utils/globals.css";
import { css } from "@panda/css";
import "react-toastify/dist/ReactToastify.css";

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
        <main
          className={css({
            lg: {
              px: 8,
            },
          })}
        >
          <ToastContainer transition={Slide} />
          {children}
        </main>
      </body>
    </html>
  );
}
