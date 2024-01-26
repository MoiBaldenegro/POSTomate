import axios from "axios";
import styles from "./printButton.module.css";

const PrintButton = () => {
  const handlePrint = async () => {
    const printers = ["196.168.1.88", "196.168.1.82"];

    printers?.forEach(async (element) => {
      try {
        await axios.post("https://localhost:8000/print/ticket", {
          items: [
            {
              name: "Producto 1",
              quantity: 2,
              price: 10.99,
            },
            {
              name: "Producto 2",
              quantity: 1,
              price: 24.99,
            },
          ],
          total: 46.97,
          tcp: element,
        });
        console.log("Ticket enviado para impresión");
      } catch (error) {
        console.error("Error al enviar el ticket para impresión", error);
      }
    });
  };

  return (
    <button onClick={handlePrint} className={styles.printBtn}>
      Imprimir Ticket
    </button>
  );
};

export default PrintButton;
