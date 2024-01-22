import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/login/login.tsx'
import Sells from './routes/sells/sells.tsx'
import Order from './routes/order/order.tsx'
import Restaurant from './routes/restaurant/restaurant.tsx'
import Cashier from './routes/cashier/cashier.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cashier />
  },
  {
    path: "/sell-types",
    element: <Sells />
  },
  {
    path: "/restaurant-order",
    element: <Order />
  },
  {
    path: "/tables",
    element: <Restaurant />
  },
  {
    path: "/cashier",
    element: <Cashier />
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
