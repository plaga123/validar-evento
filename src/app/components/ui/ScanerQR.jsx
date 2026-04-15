"use client";
import { useEffect, useRef, useState } from "react";
import { BarcodeDetector } from "barcode-detector";

export default function ScanerQR({ onScan }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Usamos el Polyfill si window.BarcodeDetector no existe
    const DetectorClass = window.BarcodeDetector || BarcodeDetector;

    const startCamera = async () => {
      try {
        const barcodeDetector = new DetectorClass({ formats: ["qr_code"] });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const detect = async () => {
          if (videoRef.current && videoRef.current.readyState === 4) {
            try {
              const barcodes = await barcodeDetector.detect(videoRef.current);
              if (barcodes.length > 0) {
                onScan(barcodes[0].rawValue);
                stream.getTracks().forEach((track) => track.stop());
                return; // Salimos del bucle
              }
            } catch (e) {
              // Error silencioso en la detección de frame
            }
          }
          requestAnimationFrame(detect);
        };
        detect();
      } catch (err) {
        setError("Error de acceso: " + err.message);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onScan]);

  if (error) return <p className="text-red-500 text-sm p-2">{error}</p>;

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Guía visual para el usuario */}
      <div className="absolute inset-0 border-[30px] border-black/40 pointer-events-none">
        <div className="w-full h-full border-2 border-blue-500 rounded-lg"></div>
      </div>
    </div>
  );
}
