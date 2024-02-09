// styles //
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
import { useEffect, useState, useCallback } from "react";
// Types and interfaces
import { Product } from "../../types/products";
import { Bill } from "../../types/account";
//Hooks
import UseAccount from "../../hooks/useAccount";
import { useLocation, useNavigate } from "react-router-dom";
import UseOrder from "../../hooks/useOrder";
import UseTable from "../../hooks/useTable";
import { useCurrentCommand } from "../../store/productsInOrder";
import { categoriesMap } from "../../mocks/categories";

export default function Order() {
  const [commandArray, setCommandArray] = useState<Product[]>();
  const { productsArray, getProducts } = useProducts();
  const { createAccount, handlePrint: handlePrintBill } = UseAccount();
  const { addBill, updateBill } = UseAccount();
  const { handlePrint } = UseOrder();
  const { updateTable } = UseTable();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, status, billCurrent, tableItem } = location.state || {};

  // ZUSTAND /////////////////
  const billCurrentCommand = useCurrentCommand(
    (state) => state.BillCommandCurrent
  );
  const setBillCurrentCommand = useCurrentCommand((state) => state.setState);

  const handleAddedProducts = (item: Product) => {
    setBillCurrentCommand({
      ...billCurrentCommand,
      products: [...billCurrentCommand.products, item],
    });
  };
  ////////////////////////////

  const handleIncrementQuantity = (index: number) => {
    const updatedProducts = [...billCurrentCommand.products];
    const currentQuantity = updatedProducts[index].quantity;
    if (currentQuantity >= 99) {
      updatedProducts[index] = { ...updatedProducts[index], quantity: 99 };
    } else {
      const newQuantity = currentQuantity + 1;
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: newQuantity,
        priceInSiteBill:
          updatedProducts[index].quantity === 1
            ? (parseFloat(updatedProducts[index].priceInSite) * 2)
                .toFixed(2)
                .toString()
            : (parseFloat(updatedProducts[index].priceInSite) * newQuantity)
                .toFixed(2)
                .toString(),
        priceToGoBill: (
          parseFloat(updatedProducts[index].priceToGo) * newQuantity
        )
          .toFixed(2)
          .toString(),
        priceCallOrderBill: (
          parseFloat(updatedProducts[index].priceCallOrder) * newQuantity
        )
          .toFixed(2)
          .toString(),
        priceDeliveryBill: (
          parseFloat(updatedProducts[index].priceDelivery) * newQuantity
        )
          .toFixed(2)
          .toString(),
      };
    }
    setBillCurrentCommand({
      ...billCurrentCommand,
      products: [
        ...billCurrentCommand.products.slice(0, index),
        updatedProducts[index],
        ...billCurrentCommand.products.slice(index + 1),
      ],
    });
  };

  const handleReduceQuantity = (index: number) => {
    console.log("me ejecute");
    const updatedProducts = [...billCurrentCommand.products];
    const currentQuantity = updatedProducts[index].quantity;

    if (currentQuantity <= 1) {
      updatedProducts[index] = { ...updatedProducts[index], quantity: 1 };
    } else {
      const newQuantity = currentQuantity - 1;
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: newQuantity,
        priceInSiteBill:
          updatedProducts[index].quantity === 1
            ? updatedProducts[index].priceInSite
            : (parseFloat(updatedProducts[index].priceInSite) * newQuantity)
                .toFixed(2)
                .toString(),
        priceToGoBill: (
          parseFloat(updatedProducts[index].priceToGo) * newQuantity
        )
          .toFixed(2)
          .toString(),
        priceCallOrderBill: (
          parseFloat(updatedProducts[index].priceCallOrder) * newQuantity
        )
          .toFixed(2)
          .toString(),
        priceDeliveryBill: (
          parseFloat(updatedProducts[index].priceDelivery) * newQuantity
        )
          .toFixed(2)
          .toString(),
      };
    }
    setBillCurrentCommand({
      ...billCurrentCommand,
      products: [
        ...billCurrentCommand.products.slice(0, index),
        updatedProducts[index],
        ...billCurrentCommand.products.slice(index + 1),
      ],
    });
  };

  useEffect(() => {
    getProducts();
    const filteredProducts = productsArray.filter(
      (item) => item.category === categoriesMap[0]
    );
    setCommandArray(filteredProducts);
    if (tableItem.bill[0]) {
      setBillCurrentCommand(tableItem.bill[0]);
      return;
    }
    setBillCurrentCommand({
      ...billCurrentCommand,
      tableNum: tableItem.tableNum,
      table: tableItem._id,
    });
    return () => {
      setBillCurrentCommand({ ...billCurrentCommand, products: [] });
    };
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        <section>
          <div>
            <div className={styles.headAccount}>
              <span>Cuenta: 0{tableItem.tableNum}</span>
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
              {billCurrentCommand.products?.map((element, index) => (
                <div className={styles.productContainer} key={index}>
                  <div>
                    <button
                      onClick={() => {
                        handleReduceQuantity(index);
                      }}
                      disabled={
                        billCurrentCommand.products[index].quantity <= 1
                      }
                    >
                      <img src={rest} alt="resta-icon" />
                    </button>
                    <span>{element.quantity}</span>
                    <button
                      onClick={() => {
                        handleIncrementQuantity(index);
                      }}
                      disabled={
                        billCurrentCommand.products[index].quantity >= 99
                      }
                    >
                      <img src={sum} alt="sumar-icon" />
                    </button>
                  </div>
                  <span>{element.productName}</span>
                  {element.quantity > 1 ? (
                    <p>$ {element.priceInSiteBill}</p>
                  ) : (
                    <p>$ {element.priceInSite}.00</p>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.totalContainer}>
              <span className={styles.Total}>
                Total: {billCurrentCommand.checkTotal}
              </span>
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
        <div>
          <section className={styles.sectionContainerProducts}>
            {productsArray &&
              commandArray?.map((item, index) => (
                <section
                  key={index}
                  className={styles.containerProduct}
                  onClick={() => {
                    handleAddedProducts(item);
                  }}
                >
                  <p>{item.productName}</p>
                </section>
              ))}
          </section>
          <section className={styles.sectionContainerCategories}>
            {categoriesMap?.map((itemI, index) => (
              <section
                key={index}
                className={styles.containerCategories}
                onClick={() => {
                  const productsFiltered = productsArray.filter(
                    (item) => item.category === itemI
                  );
                  setCommandArray(productsFiltered);
                }}
              >
                <p>{itemI}</p>
              </section>
            ))}
          </section>
        </div>
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
              handlePrintBill("billPrint", billCurrentCommand),
                updateBill("forPayment", billCurrent, billCurrentCommand);
              updateTable("forPayment", _id);
              navigate("/host");
            }}
            disabled={!billCurrent?.products}
            className={styles.printButton}
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
          className={styles.printButton}
          onClick={async () => {
            try {
              if (!billCurrent) {
                let newBill = await createAccount(billCurrentCommand);
                updateTable("enable", _id);
                handlePrint(billCurrentCommand);
                addBill(newBill._id, _id);
                navigate("/host");
                return;
              }
              updateBill("enable", billCurrent, billCurrentCommand);
              handlePrint(billCurrentCommand);
              navigate("/host");
            } catch (error) {
              console.log("entre aca sal error");
              console.error("Error:", error);
            }
          }}
          disabled={billCurrentCommand.products.length < 1}
        >
          <img src={sendIcon} alt="send-icon" />
          Enviar
        </button>
      </footer>
    </div>
  );
}
