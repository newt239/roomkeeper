"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IconCameraRotate } from "@tabler/icons-react";
import { QrReader } from "react-qr-reader";

import { css } from "@panda/css";

type DeviceProps = {
  deviceId: string;
  label: string;
};

export default function Scanner() {
  const router = useRouter();
  const [cameraState, setCameraState] = useState<boolean>(false);
  const [currentDeviceId, setCurrentDeviceId] = useState<string>();
  const [deviceList, setDeviceList] = useState<DeviceProps[]>([]);
  const [reverseCamera, setReverseCamera] = useState<boolean>(false);

  const getCameraDeviceList = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((mediaDevices) =>
        mediaDevices
          .filter((device) => device.kind === "videoinput")
          .map((device) => {
            return {
              label: device.label,
              deviceId: device.deviceId,
            };
          })
      )
      .then((devices) => {
        setDeviceList(devices);
        if (currentDeviceId === "" && devices.length !== 0) {
          setCurrentDeviceId(devices[0].deviceId);
        }
      });
  };

  useEffect(() => {
    const savedCurrentCameraDeviceId =
      localStorage.getItem("currentCameraDeviceId") || "";
    setCurrentDeviceId(savedCurrentCameraDeviceId);
    setReverseCamera(
      localStorage.getItem("reverseCamera") === "false" ? false : true
    );
    setCameraState(true);
    getCameraDeviceList();
  }, []);

  const [refreshQrReader, setRefreshQrReader] = useState(true);
  const interval = 2 * 60 * 1000;
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (cameraState) {
        setRefreshQrReader(false);
      }
    }, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, [cameraState]);
  useEffect(() => {
    if (!refreshQrReader) setRefreshQrReader(true);
  }, [refreshQrReader]);

  const onClickChangeCameraIcon = () => {
    getCameraDeviceList();
    if (deviceList.length === 2) {
      const newCurrentDevice = deviceList.find((v) => {
        if (v.deviceId !== currentDeviceId) {
          return v;
        }
      });
      if (newCurrentDevice) {
        localStorage.setItem(
          "currentCameraDeviceId",
          newCurrentDevice.deviceId
        );
        setCurrentDeviceId(newCurrentDevice.deviceId);
        setRefreshQrReader(false);
      }
    }
  };

  return (
    <div
      className={css({
        m: 4,
        display: "flex",
        gap: 4,
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <label htmlFor="wake">
        <input
          checked={cameraState}
          id="wake"
          onChange={() => setCameraState((v) => !v)}
          type="checkbox"
        />
        カメラを{cameraState ? "停止" : "起動"}する
      </label>
      <label htmlFor="switch">
        <input
          checked={reverseCamera}
          id="switch"
          onChange={() => setReverseCamera((v) => !v)}
          type="checkbox"
        />
        カメラを反転する
      </label>
      <div
        className={css({
          w: "min(50vw, 60vh)",
          h: "min(50vw, 60vh)",
          position: "relative",
        })}
      >
        <div
          className={css({
            w: "100%",
            h: "100%",
            bgColor: "gray.100",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "gray.200",
            shadow: "xl",
            borderRadius: 16,
            transform: reverseCamera
              ? "translateZ(0.5px) scale(-1, 1)"
              : "translateZ(0.5px) scale(1, 1)",
            _osDark: { bgColor: "gray.700", borderColor: "gray.600" },
          })}
        >
          {refreshQrReader && cameraState && (
            <QrReader
              constraints={{
                facingMode: "environment",
                deviceId: currentDeviceId,
              }}
              onResult={(result, _error) => {
                if (!!result) {
                  router.push(`/${result.getText()}`);
                }
              }}
            />
          )}
        </div>
        <button
          className={css({
            position: "absolute",
            color: "black",
            top: 0,
            right: 0,
            p: 2,
            m: 1,
            borderRadius: "1rem",
            transform: "translateZ(0.8px)",
            transition: "all 0.2s ease",
            cursor: "pointer",
            _osDark: {
              color: "white",
            },
            _hover: {
              bgColor: "gray.300",
              _osDark: { bgColor: "gray.800" },
            },
          })}
          onClick={onClickChangeCameraIcon}
          title="カメラ切り替え"
        >
          <IconCameraRotate />
        </button>
      </div>
    </div>
  );
}
