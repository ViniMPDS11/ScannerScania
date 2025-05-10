// src/components/BarcodeScanner.jsx
import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null);

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

  return <video ref={videoRef} style={{ width: '100%' }} />;
}

export default BarcodeScanner;
