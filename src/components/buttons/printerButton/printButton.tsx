import axios from "axios";
import styles from "./printButton.module.css";

const PrintButton = () => {
  const handlePrint = async () => {
    try {
      await axios.post("https://tomate-server.onrender.com/print/ticket", {
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
      });
      console.log("Ticket enviado para impresión");
    } catch (error) {
      console.error("Error al enviar el ticket para impresión", error);
    }
  };

  return (
    <button onClick={handlePrint} className={styles.printBtn}>
      Imprimir Ticket
    </button>
  );
};

export default PrintButton;
