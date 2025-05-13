// src/components/BarcodeScanner.jsx
import { useEffect, useState, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null);
  const [permissionState, setPermissionState] = useState("checking"); // 'granted' | 'denied' | 'prompt' | 'checking'

  const codeReaderRef = useRef(null); // armazenar o reader para resetar depois

  // Verifica permissão ao carregar
  useEffect(() => {
    async function checkPermission() {
      try {
        const result = await navigator.permissions.query({ name: "camera" });
        setPermissionState(result.state);

        result.onchange = () => {
          setPermissionState(result.state);
        };

        if (result.state === "granted") {
          startCamera();
        }
      } catch (err) {
        console.warn("Permissions API não suportada.");
        setPermissionState("prompt");
      }
    }

    checkPermission();
  }, []);

  // Inicia a câmera e leitura com câmera traseira
  const startCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      // Tenta encontrar a câmera traseira
      const backCamera = videoDevices.find(device =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('environment')
      );

      const selectedDeviceId = backCamera?.deviceId || videoDevices[0]?.deviceId;

      if (!selectedDeviceId) {
        throw new Error("Nenhuma câmera encontrada.");
      }

      // Inicializa o leitor
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
        if (result) {
          onScan(result.getText());
          codeReader.reset(); // Para leitura única
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error("Erro ao ler código:", err);
        }
      });

      setPermissionState("granted");
    } catch (err) {
      console.error("Erro ao iniciar câmera:", err);
      setPermissionState("denied");
    }
  };

  // Limpa o scanner ao desmontar
  useEffect(() => {
    return () => {
      codeReaderRef.current?.reset();
    };
  }, []);

  return (
    <div>
      {permissionState === "granted" && (
        <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "500px" }} />
      )}

      {permissionState === "prompt" && (
        <button onClick={startCamera}>Permitir acesso à câmera</button>
      )}

      {permissionState === "denied" && (
        <p>Permissão para a câmera foi negada. Vá nas configurações do navegador para alterar.</p>
      )}

      {permissionState === "checking" && <p>Verificando permissão da câmera...</p>}
    </div>
  );
}

export default BarcodeScanner;
