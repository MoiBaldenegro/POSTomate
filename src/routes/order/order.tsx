// styles 
import "../../styles/global/global.css";
import styles from "./order.module.css";
// Icons
import backIcon from "../../assets/icon/backArrow.svg";
import sendIcon from "../../assets/icon/sendIcon.svg";
import dividerBtn from "../../assets/icon/dividerBtn.svg"
import separateIcon from "../../assets/icon/separateNotes.svg";
import actionsIcon from "../../assets/icon/actionsIcon.svg";
import printIcon from "../../assets/icon/printIcon.svg";
import tillIcon from "../../assets/icon/tillIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import rest from "../../assets/icon/rest.svg"
import sum from "../../assets/icon/sum.svg"
// Hooks
import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";
// Types and interfaces
import { Product } from "../../types/products";
import { Bill } from "../../types/account";
import UseAccount from "../../hooks/useAccount";
import { Form } from "react-router-dom";




export default function Order() {

    const [prods, setProds] = useState<Product[]>([]);
    const sumr = prods.reduce((a, b) => a + parseFloat(b.priceInSite), 0).toFixed(2);
    const [form, setForm] = useState<Bill>({
        billCode: "001",
        sellType: 'onSite',
        user: "Moises",
        checkTotal: "0.00",
        products: [],
        status: 'pending',
        paymentDate: "Fecha",
        tableNum: "16"
    });

    const addToForm = (item: Product) => {
        setForm(prevForm => ({
            ...prevForm,
            products: [...prevForm.products, item],
            checkTotal: (prevForm.products.length === 0
                ? parseFloat(item.priceInSite)
                : prevForm.products.reduce((a, b) => a + parseFloat(b.priceInSite), 0) + parseFloat(item.priceInSite)
            ).toFixed(2),
        }));
    };

    /* const addToForm = (item: Product) => {
         setForm(prevForm => ({
             ...prevForm,
             products: [...prevForm.products, item],
             checkTotal: (form.products.reduce((a, b) => a + parseFloat(b.priceInSite), 0).toFixed(2)).toString(),
         }));
     };*/

    const { productsArray, getProducts } = useProducts();
    const { createAccount } = UseAccount();




    useEffect(() => {
        getProducts();
    }, [])
    return (
        <div className={styles.container}>
            <HeaderTwo />
            <main className={styles.mainSection}>
                <section>
                    <div>
                        <div>
                            <div className={styles.headAccount}>
                                <span>Cuenta</span>
                                <span>Nueva nota</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                {form.products?.map(item => (
                                    <div className={styles.productContainer}>
                                        <div>
                                            <button><img src={rest} alt="resta-icon" /></button>
                                            <span>01</span>
                                            <button><img src={sum} alt="sumar-icon" /></button>
                                        </div>
                                        <span>{item.productName}</span>
                                        <p>$ {item.priceInSite}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <span className={styles.Total}>Total: {form.checkTotal}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>m</button>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button>0</button>
                        <button>m</button>
                    </div>
                </section>
                <section>
                    {productsArray?.map((item) => (
                        <section key={item.code} className={styles.containerProduct} onClick={() => addToForm(item)}>
                            <p>{item.productName}</p>
                        </section>
                    ))}
                </section>
            </main>
            <footer className={styles.footer}>
                <button><img src={backIcon} alt="back-icon" />Atrás</button>
                <div>
                    <button><img src={separateIcon} alt="separate-icon" />Separar notas</button>
                    <button><img src={actionsIcon} alt="action-icon" />Mas acciones</button>
                    <img src={dividerBtn} alt="divider-buttons" />
                    <button><img src={printIcon} alt="print-icon" />Imprimir</button>
                    <button><img src={tillIcon} alt="till-icon" />Cobrar</button>
                </div>
                <button onClick={() => createAccount(form)}><img src={sendIcon} alt="send-icon" />Enviar</button>
            </footer>
        </div>
    )
}