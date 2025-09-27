import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import Root from './Component/Root/Root'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from './Component/ErrorPage/ErrorPage';
import Home from './Component/Home/Home';
import GadgetDetails from './Component/GadgetDetails/GadgetDetails';
import Statistic from './Component/Statistic/Statistic';
import Dashboard from './Component/Dashboard/Dashboard';
import Cart from './Component/Dashboard/Cart/Cart';
import { CartProvider } from './assets/Utilites/createContext/CartContext';
import { WishProvider } from './assets/Utilites/createContext/WishContext';
import Wishlist from './Component/Dashboard/Wishlist/Wishlist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },

      // async function is better for fethcing data
      {
        path: "/gadgetdetails/:gadgetId",
        element: <GadgetDetails />,
        loader: async () => {
          const res = await fetch('/gadgets.json');
          const data = await res.json();
          return data;
        }
      },
      {
        path: "/cart",
        element: <Cart />,

      },
      {
        path: "/statistics",
        element: <Statistic></Statistic>
      },
      {
        path: "/wishlist",
        element: <Wishlist></Wishlist>
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },


    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <WishProvider>
        <RouterProvider router={router} />
      </WishProvider>

    </CartProvider>
  </StrictMode >,
)
