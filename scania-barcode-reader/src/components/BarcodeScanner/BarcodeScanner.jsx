import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    const startScanner = async () => {
      try {
        const selectedDeviceId = (await codeReader.current.listVideoInputDevices())[0]?.deviceId;

        if (selectedDeviceId) {
          await codeReader.current.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result) => {
            if (result) {
              console.log("Código lido:", result.getText());
            }
          });
        }
      } catch (error) {
        console.error("Erro ao iniciar scanner:", error);
      }
    };

    startScanner();

    return () => {
      codeReader.current.resetStream(); // ✅ correto
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} />
    </div>
  );
};

export default BarcodeScanner;
