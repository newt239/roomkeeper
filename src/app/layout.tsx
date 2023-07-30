import type { Metadata } from "next";
import { BIZ_UDPGothic } from "next/font/google";
import { cookies } from "next/headers";

import Header from "@/components/feature/Header";
import Scanner from "@/components/feature/Scanner";
import { css } from "@panda/css";

import "@/utils/globals.css";

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
  const cookieStore = cookies();
  const cameraDeviceId = cookieStore.get("camera_device_id");
  const reverseCamera = cookieStore.get("reverse_camera");

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
                  w: "40%",
                },
              })}
            >
              <Scanner
                defaultCameraDeviceId={(cameraDeviceId?.value || "") as string}
                defaultReverseCamera={
                  ((reverseCamera?.value || "") as string) === "true"
                    ? false
                    : true
                }
              />
            </div>
            <div
              className={css({
                w: "100%",
                md: {
                  w: "55%",
                  h: "calc(100vh - 8rem)",
                  overflowY: "auto",
                  p: 2,
                },
              })}
            >
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
