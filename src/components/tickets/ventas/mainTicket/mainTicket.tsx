import React from "react";
import styles from "./mainTicket.module.css";
import tomate from "../../../../assets/icon/tomatePOSlogo.svg";

const TicketComponent = React.forwardRef((props, ref) => {
  return (
    <div className={styles.container}>
      <h2>Ticket de Compra</h2>
      <img src={tomate} alt="tomate" />
      <p>Fecha: {new Date().toLocaleDateString()}</p>
      <p>Producto 1 - $10.00</p>
      <p>Producto 2 - $20.00</p>
      <p>Total: $30.00</p>
    </div>
  );
});

export default TicketComponent;
