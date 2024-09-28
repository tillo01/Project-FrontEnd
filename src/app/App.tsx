/** @format */

import React, { useState } from "react";
import "../css/App.css";

import { Route, Switch, useLocation } from "react-router-dom";

import "../css/navbar.css";
import "../css/home.css";
import "../css/footer.css";
import HomeNavbar from "./components/header/HomeNavbar";
import OtherNavbar from "./components/header/OtherNavbar";
import ProductsPage from "./screens/ProductsPage";
import OrdersPage from "./screens/OrdersPage";
import UserPage from "./screens/UserPage";
import HelpPage from "./screens/HelpPage";
import HomePage from "./screens/homePage";
import Footer from "./components/FooterPage";
import { CartItem } from "../libs/types/search";
function App() {
   const location = useLocation();
   const cartJson: string | null = localStorage.getItem("cartData");
   const currentCart = cartJson ? JSON.parse(cartJson) : [];
   const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

   const onAdd = (input: CartItem) => {
      const exist: any = cartItems.find(
         (item: CartItem) => item._id === input._id,
      );
      if (exist) {
         const cartUpdate = cartItems.map((item: CartItem) => {
            return item._id === input._id
               ? { ...exist, quantity: exist.quantity + 1 }
               : item;
         });
         setCartItems(cartUpdate);
         localStorage.setItem("cartData", JSON.stringify(cartUpdate));
      } else {
         const cartUpdate = [...cartItems, { ...input }];
         setCartItems(cartUpdate);
         localStorage.setItem("cartData", JSON.stringify(cartUpdate));
      }
   };

   return (
      <>
         {location.pathname === "/" ? (
            <HomeNavbar cartItems={cartItems} />
         ) : (
            <OtherNavbar cartItems={cartItems} />
         )}

         <Switch>
            <Route path="/products">
               <ProductsPage onAdd={onAdd} />
            </Route>
            <Route path="/orders">
               <OrdersPage />
            </Route>
            <Route path="/member-page">
               <UserPage />
            </Route>
            <Route path="/help">
               <HelpPage />
            </Route>
            <Route path="/">
               <HomePage onAdd={onAdd} />
            </Route>
         </Switch>
         <Footer />
      </>
   );
}

export default App;
