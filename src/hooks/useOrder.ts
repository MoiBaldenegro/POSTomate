import axios from "axios";
// types
import { Bill } from "../types/account";

export default function UseOrder() {
  const handlePrint = async (form: Bill) => {
    const printersArray = [
      { printerId: "192.168.1.97", position: "Bebidas sin alcohol" },
      { printerId: "192.168.1.95", position: "Medias ordenes" },
      { printerId: "192.168.1.97", position: "Bebidas con alcohol" },
      { printerId: "192.168.1.88", position: "caja" },
      { printerId: "192.168.1.82", position: "comandas" },
    ];

    printersArray?.forEach(async (item) => {
      const currentPrinter = item.position;

      const productsArray = form.products.filter(
        (item) => item.category === currentPrinter
      );
      try {
        const data = {
          items: productsArray,
          total: 46.97,
          tcp: item.printerId,
          position: item.position,
        };
        if (productsArray.length <= 0) return;
        await axios.post("http://localhost:8000/print/order", data);
        console.log("Ticket enviado para impresión");
      } catch (error) {
        console.error("Error al enviar el ticket para impresión", error);
      }
    });
  };

  return {
    handlePrint,
  };
}
