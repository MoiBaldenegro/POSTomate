import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sells from "./routes/sells/sells.tsx";
import Order from "./routes/order/order.tsx";
import Restaurant from "./routes/restaurant/restaurant.tsx";
import Cashier from "./routes/cashier/cashier.tsx";
import Login from "./routes/login/login.tsx";
import Host from "./routes/host/host.tsx";
import FingerRegister from "./routes/fingerRegister/fingerRegister.tsx";
import Reports from "./routes/reports/reports.tsx";
import OpeningProcess from "./components/sellProcess/openingProcess/openingProcess.tsx";
import ClosingProcess from "./components/sellProcess/closingProcess/closingProcess.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Host />,
  },
  {
    path: "/host",
    element: <Login />,
  },
  {
    path: "/sell-types",
    element: <Sells />,
  },
  {
    path: "/restaurant-order/:item",
    element: <Order />,
  },
  {
    path: "/tables",
    element: <Restaurant />,
  },
  {
    path: "/cashier",
    element: <Cashier />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/biometrics",
    element: <FingerRegister />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
