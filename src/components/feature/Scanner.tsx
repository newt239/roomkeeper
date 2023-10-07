"use client";

import { useEffect, useState, useTransition } from "react";

import { IconCameraRotate } from "@tabler/icons-react";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toastify";

import Input from "@/components/common/Input";
import { addActivity, saveToCookie } from "@/utils/actions";
import { css } from "@panda/css";

type DeviceProps = {
  deviceId: string;
  label: string;
};

type Props = {
  event_id: string;
  defaultCameraDeviceId: string;
  defaultReverseCamera: boolean;
};

export default function Scanner({
  event_id,
  defaultCameraDeviceId,
  defaultReverseCamera,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [cameraState, setCameraState] = useState<boolean>(false);
  const [currentDeviceId, setCurrentDeviceId] = useState<string>(
    defaultCameraDeviceId
  );
  const [reverseCamera, setReverseCamera] =
    useState<boolean>(defaultReverseCamera);
  const [deviceList, setDeviceList] = useState<DeviceProps[]>([]);

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
        (async () =>
          await saveToCookie("camera_device_id", newCurrentDevice.deviceId))();
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
      <label className={css({ cursor: "pointer" })} htmlFor="wake">
        <Input
          checked={cameraState}
          id="wake"
          onChange={() => setCameraState((v) => !v)}
          type="checkbox"
        />
        カメラを{cameraState ? "停止" : "起動"}する
      </label>
      <label className={css({ cursor: "pointer" })} htmlFor="switch">
        <Input
          checked={reverseCamera}
          id="switch"
          onChange={() => {
            (async () =>
              saveToCookie(
                "reverse_camera",
                reverseCamera ? "false" : "true"
              ))();
            setReverseCamera((v) => !v);
          }}
          type="checkbox"
        />
        カメラを反転する
      </label>
      <div
        className={css({
          w: "min(50vw, 60vh)",
          maxW: "100%",
          aspectRatio: "1/1",
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
                  startTransition(async () => {
                    const res = await addActivity({
                      event_id,
                      guest_id: result.getText(),
                    });
                    if (res === null) {
                      toast.error("エラーが発生しました");
                    } else {
                      toast.success(
                        `${res.guest_id}の${
                          res.type === "enter" ? "入室" : "退室"
                        }処理に成功しました`,
                        {
                          position: toast.POSITION.TOP_CENTER,
                          theme: "dark",
                          closeButton: true,
                          hideProgressBar: true,
                          autoClose: 2000,
                        }
                      );
                    }
                  });
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
