import React, { useRef } from 'react';
import printJS from 'print-js';
import styles from './payment.int.module.css';
import cashCircle from '../../assets/icon/cashCircle.svg';

interface Props {
    openModal: any;
    isOpen: any;
    onClose: any;
    children: any;
}

export default function PaymentInterface({
    openModal,
    isOpen,
    onClose,
    children,
}: Props) {
    const ticketRef = useRef(null);

    const handleImprimirTicket = () => {
        printJS({
            printable: ticketRef.current,
            type: 'html',
            targetStyles: ['*'],
        });
    };

    return (
        <div className={styles.screen}>
            <section className={styles.modal}>
                <div>
                    <div>
                        <img src={cashCircle} alt="cash-circle" />
                        <h1>{children}</h1>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>
                        X
                    </button>
                </div>
                <div ref={ticketRef}>
                    <h2>Tomate taqueria</h2>
                    <p>Fecha: {new Date().toLocaleDateString()}</p>
                </div>
                <div>
                    <button className={styles.ticket} onClick={handleImprimirTicket}>
                        Imprimir Ticket
                    </button>
                </div>
            </section>
        </div>
    );
}
