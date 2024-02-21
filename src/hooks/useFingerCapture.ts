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

    try {
      if (quality !== 0) {
        console.log("La calidad de la muestra no es buena.");
        await reader?.stopAcquisition("D10C5D6F-6A62-A447-89B7-A4BB77B7BA10");
        console.log("Adquisición detenida correctamente.");

        return;
      }

      await reader?.stopAcquisition("D10C5D6F-6A62-A447-89B7-A4BB77B7BA10");
      console.log("Adquisición detenida correctamente.");
      setMessage("Captura exitosa");
      setReader(null);
      setTimeout(() => {
        setMessage("");
      }, 800);
      setReader(null);
    } catch (error) {
      console.error("Error al detener la adquisición:", error);
    }
  };

  return { initReader, huella, setHuella, message, setReader };
}
