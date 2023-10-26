"use client";

import { useEffect, useState } from "react";

import { IconLoader, IconScan, IconX } from "@tabler/icons-react";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toastify";

import Button from "../common/Button";

import Input from "@/components/common/Input";
import { addActivity, saveToCookie } from "@/utils/actions";
import { errorBeep, successBeep } from "@/utils/tone";
import { USER_ID_LENGTH } from "@/utils/vars";
import { css } from "@panda/css";

type DeviceProps = {
  deviceId: string;
  label: string;
};

type Props = {
  event_id: string;
  defaultCameraDeviceId: string | null;
  defaultReverseCamera: boolean;
};

export default function Scanner({
  event_id,
  defaultCameraDeviceId,
  defaultReverseCamera,
}: Props) {
  const [isPending, setIsPending] = useState(false);
  const [cameraState, setCameraState] = useState<boolean>(false);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(
    defaultCameraDeviceId
  );
  const [reverseCamera, setReverseCamera] =
    useState<boolean>(defaultReverseCamera);
  const [deviceList, setDeviceList] = useState<DeviceProps[]>([]);
  const [lastGuestId, setLastGuestId] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const getCameraDeviceList = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((mediaDevices) => {
        return mediaDevices
          .filter((device) => device.kind === "videoinput")
          .map((device) => {
            return {
              label: device.label,
              deviceId: device.deviceId,
            };
          });
      })
      .then((devices) => {
        setDeviceList(devices);
        if (currentDeviceId === null && devices.length !== 0) {
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

  const onScan = async (guest_id: string) => {
    setIsPending(true);
    setLastGuestId(guest_id);
    const res = await addActivity({
      event_id,
      guest_id,
    });
    if (res === null) {
      toast.error(`${guest_id}というゲストは存在しません`);
      await errorBeep();
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
      await successBeep();
    }
    setIsPending(false);
    setMessage(null);
  };

  return (
    <div
      className={css({
        m: 2,
        display: "flex",
        gap: 4,
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          maxW: "100%",
          w: "min(100%, 500px)",
          aspectRatio: "1/1",
          position: "relative",
          lg: {
            w: "min(50vw, 60vh)",
          },
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
          {cameraState && (
            <div
              className={css({
                color: "black",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateY(-50%) translateX(-50%)",
                _osDark: { color: "white" },
              })}
            >
              <IconLoader
                className={css({
                  animation: "spin 1s linear infinite",
                })}
                size={64}
              />
            </div>
          )}
          {refreshQrReader && cameraState && currentDeviceId && !isPending && (
            <QrReader
              constraints={{
                facingMode: "environment",
                deviceId: currentDeviceId,
              }}
              onResult={(result, error) => {
                if (!!result && !error && !isPending) {
                  const guest_id = result.getText();
                  if (guest_id.length === USER_ID_LENGTH) {
                    if (guest_id !== lastGuestId) {
                      onScan(guest_id);
                    } else {
                      setMessage("連続で同じゲストをスキャンしますか？");
                    }
                  }
                }
              }}
              scanDelay={1}
            />
          )}
        </div>
      </div>
      <div
        className={css({
          display: "flex",
          gap: 2,
          flexDirection: "row",
        })}
      >
        <label className={css({ cursor: "pointer" })} htmlFor="wake">
          <Input
            checked={cameraState}
            id="wake"
            onChange={() => setCameraState((v) => !v)}
            type="checkbox"
          />
          カメラを起動
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
          カメラを反転
        </label>
      </div>
      {currentDeviceId && deviceList.length > 0 && (
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          })}
        >
          <select
            className={css({
              w: "80%",
            })}
            onChange={(e) => {
              setCurrentDeviceId(e.target.value);
              setRefreshQrReader(false);
              (async () =>
                await saveToCookie("camera_device_id", e.target.value))();
              getCameraDeviceList();
            }}
            value={currentDeviceId}
          >
            {deviceList.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
      )}
      {message && (
        <div
          className={css({
            display: "flex",
            gap: 2,
            flexDirection: "column",
            position: "fixed",
            bottom: 0,
            left: "50%",
            alignItems: "center",
            transform: "translateX(-50%)",
            p: "1rem",
            mb: "2rem",
            backgroundColor: "white",
            borderRadius: "lg",
          })}
        >
          <p
            className={css({
              color: "black",
            })}
          >
            {message}
          </p>
          <div
            className={css({
              display: "flex",
              gap: 2,
              justifyContent: "center",
            })}
          >
            <Button onClick={() => onScan(lastGuestId)} variant="default">
              <IconScan />
              スキャンする
            </Button>
            <Button onClick={() => setMessage(null)} variant="danger">
              <IconX />
              閉じる
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
