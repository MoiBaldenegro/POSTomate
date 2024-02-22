import {
  AcquisitionStarted,
  FingerprintReader,
  QualityReported,
  SampleFormat,
  SamplesAcquired,
} from "@digitalpersona/devices";
import { useState } from "react";

export default function UseFingerCapture() {
  const [reader, setReader] = useState<FingerprintReader | null>(null);
  const [huella, setHuella] = useState<any[]>([]);
  const [message, setMessage] = useState<string>();
  const [complete, setComplete] = useState(false); //

  const initReader = async () => {
    try {
      const fingerprintReader = new FingerprintReader();
      setReader(fingerprintReader);
      console.log("Fingerprint reader initialized:", fingerprintReader);

      fingerprintReader.on("SamplesAcquired", onSamplesAcquired);
      fingerprintReader.on("QualityReported", onQualityReported);

      await fingerprintReader.startAcquisition(
        SampleFormat.PngImage,
        "D10C5D6F-6A62-A447-89B7-A4BB77B7BA10"
      );
      console.log("Fingerprint acquisition started successfully.");
    } catch (error) {
      console.error("Error during fingerprint reader initialization:", error);
    }
  };

  const onSamplesAcquired = async (event: any) => {
    try {
      const samples = event.samples;
      console.log(samples);
      const fingercapture = samples[0].replace(/_/g, "/").replace(/-/g, "+");

      // Actualizar el estado proporcionando un nuevo array con las nuevas muestras
      setHuella((prevHuella) => {
        const fingersArray = prevHuella?.length
          ? [...prevHuella, fingercapture]
          : [fingercapture];
        return fingersArray;
      });

      setReader(null);
    } catch (error) {
      console.error("Error al procesar muestras de huellas dactilares:", error);
    }
  };

  const onQualityReported = async (event: any) => {
    const quality = event.quality;

    if (huella.length >= 4) {
      // Manejar el caso cuando se han capturado suficientes huellas.
      setMessage("Ya se han capturado suficientes huellas.");
      return;
    }

    try {
      if (quality !== 0) {
        console.log("La calidad de la muestra no es buena.");
      } else {
        setMessage("Captura exitosa");
        setTimeout(() => {
          setMessage("");
        }, 800);
      }
    } catch (error) {
      console.error("Error durante la verificación de calidad:", error);
    } finally {
      try {
        // Asegurarse de que stopAcquisition siempre se llame, incluso en caso de un error.
        await reader?.stopAcquisition("D10C5D6F-6A62-A447-89B7-A4BB77B7BA10");
        console.log("Adquisición detenida correctamente.");
      } catch (error) {
        console.error("Error al detener la adquisición:", error);
      } finally {
        // Asegurarse de la limpieza consistente, establecer reader como null.
        setReader(null);
      }
    }
  };

  return { initReader, huella, setHuella, message, setReader, complete };
}

// Update
