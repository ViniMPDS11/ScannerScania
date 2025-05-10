// src/components/BarcodeScanner.jsx
import { useEffect, useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';



function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null);
  const [permissionState, setPermissionState] = useState("checking"); // 'granted' | 'denied' | 'prompt' | 'checking'

  // Verifica a permissão ao carregar o componente
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
        console.warn("Permissions API não suportada, caindo no fallback.");
        setPermissionState("prompt");
      }
    }

    checkPermission();
  }, []);

  // Inicia a câmera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setPermissionState("granted");
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      setPermissionState("denied");
    }
  };

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        onScan(result.getText());
        codeReader.reset(); // Para parar depois da leitura
      }
    });

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

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
