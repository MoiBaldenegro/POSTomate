// styles
import "../../styles/global/global.css";
import styles from "./order.module.css";
// Icons
import backIcon from "../../assets/icon/backArrow.svg";
import backtwo from "../../assets/icon/backTwo.svg";
import sendIcon from "../../assets/icon/sendIcon.svg";
import dividerBtn from "../../assets/icon/dividerBtn.svg";
import separateIcon from "../../assets/icon/separateNotes.svg";
import actionsIcon from "../../assets/icon/actionsIcon.svg";
import printIcon from "../../assets/icon/printIcon.svg";
import tillIcon from "../../assets/icon/tillIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import rest from "../../assets/icon/rest.svg";
import sum from "../../assets/icon/sum.svg";
import personIcon from "../../assets/icon/personIcon.svg";
import searchIcon from "../../assets/icon/searchIcon.svg";
// Hooks
import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";
// Types and interfaces
import { Product } from "../../types/products";
import { Bill } from "../../types/account";
import UseAccount from "../../hooks/useAccount";
import { useLocation, useNavigate } from "react-router-dom";
import UseOrder from "../../hooks/useOrder";
import UseTable from "../../hooks/useTable";

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { numTable, _id, status } = location.state || {};

  const [prods, setProds] = useState<Product[]>([]);
  const sumr = prods
    .reduce((a, b) => a + parseFloat(b.priceInSite), 0)
    .toFixed(2);

  const [form, setForm] = useState<Bill>({
    sellType: "onSite",
    user: "Moises",
    checkTotal: "0.00",
    products: [],
    status: "pending",
    paymentDate: "Fecha",
    tableNum: "s/N",
  });

  const addToForm = (item: Product) => {
    setForm((prevForm) => ({
      ...prevForm,
      products: [...prevForm.products, item],
      checkTotal: (prevForm.products.length === 0
        ? parseFloat(item.priceInSite)
        : prevForm.products.reduce((a, b) => a + parseFloat(b.priceInSite), 0) +
          parseFloat(item.priceInSite)
      ).toFixed(2),
      tableNum: numTable,
      status: status,
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
  const { createAccount, handlePrint: handlePrintBill } = UseAccount();
  const { addBill, updateBill } = UseAccount();
  const { handlePrint } = UseOrder();
  const { updateTable } = UseTable();

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        <section>
          <div>
            <div className={styles.headAccount}>
              <span>Cuenta: 0{numTable}</span>
              <div>
                <button>
                  <img src={personIcon} alt="person-icon" />
                  04
                </button>
                <button>
                  <img src={actionsIcon} alt="actions-icon" />
                </button>
              </div>
            </div>
            <div>
              {form.products?.map((element) => (
                <div className={styles.productContainer}>
                  <div>
                    <button>
                      <img src={rest} alt="resta-icon" />
                    </button>
                    <span>01</span>
                    <button>
                      <img src={sum} alt="sumar-icon" />
                    </button>
                  </div>
                  <span>{element.productName}</span>
                  <p>$ {element.priceInSite}</p>
                </div>
              ))}
            </div>
            <div className={styles.totalContainer}>
              <span className={styles.Total}>Total: {form.checkTotal}</span>
            </div>
          </div>
          <div>
            <button>
              <img src={searchIcon} alt="search-icon" />
            </button>
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
            <button>
              <img src={backtwo} alt="backIcon" />
            </button>
          </div>
        </section>
        <section>
          {productsArray?.map((item) => (
            <section
              key={item.code}
              className={styles.containerProduct}
              onClick={() => addToForm(item)}
            >
              <p>{item.productName}</p>
            </section>
          ))}
        </section>
      </main>
      <footer className={styles.footer}>
        <button onClick={() => navigate("/tables")}>
          <img src={backIcon} alt="back-icon" />
          Atrás
        </button>
        <div>
          <button>
            <img src={separateIcon} alt="separate-icon" />
            Separar notas
          </button>
          <button>
            <img src={actionsIcon} alt="action-icon" />
            Mas acciones
          </button>
          <img src={dividerBtn} alt="divider-buttons" />
          <button
            onClick={() => {
              handlePrintBill("billPrint"), updateBill("forPayment", _id);
              navigate("/host");
            }}
          >
            <img src={printIcon} alt="print-icon" />
            Imprimir
          </button>
          <button>
            <img src={tillIcon} alt="till-icon" />
            Cobrar
          </button>
        </div>
        <button
          onClick={async () => {
            // CONTINUAREMOS AGREGANDO MAS FUNCIONES EN LA PARTE DE LA CREACION DE LAS CUENTAS AL ENVIAR LAS COMANDAS -
            // YA CAMBIA EL STATUS A ACTIVA HAY QUE IMPRIMIR LAS COMANDAS, CLAVAR EL ID DE LÑA CUENTA CREADA  ALA MESA Y
            // REDIRECCIONAR AL LOGIN PARA CONTINUAR CON LAS ACCIONES DONDE LE MESERO ENTRA A UNA MESA YA CON UNA CUENTA ACTIVA EN VERDE
            try {
              const newBill = await createAccount(form);
              console.log(
                `nueva cuenta creada: ${newBill._id}, ${newBill.products}`
              );
              console.log(`el id es ${_id}`);
              updateTable("enable", _id);
              return;
              //navigate("/host");
              //handlePrint(form);

              //addBill(newBill.bill, newBill._id);
            } catch (error) {
              // Manejar errores si es necesario
              console.error("Error:", error);
            }
          }}
        >
          <img src={sendIcon} alt="send-icon" />
          Enviar
        </button>
      </footer>
    </div>
  );
}
