import type { Metadata } from "next";
import { cookies } from "next/headers";

import { Slide, ToastContainer } from "react-toastify";

import Scanner from "@/components/feature/Scanner";
import { css } from "@panda/css";

type Params = {
  event_id: string;
};

export const metadata: Metadata = {
  title: "Roomkeeper",
  description: "簡易入退室管理システム",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const cookieStore = cookies();
  const cameraDeviceId = cookieStore.get("camera_device_id");
  const reverseCamera = cookieStore.get("reverse_camera");

  return (
    <>
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
            defaultCameraDeviceId={cameraDeviceId?.value || null}
            defaultReverseCamera={
              reverseCamera?.value === "true" ? false : true
            }
            event_id={params.event_id}
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
      <ToastContainer transition={Slide} />
    </>
  );
}
