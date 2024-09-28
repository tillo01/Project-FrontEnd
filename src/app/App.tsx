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
import useBasket from "./hooks/useBasket";
function App() {
   const location = useLocation();
   const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
   return (
      <>
         {location.pathname === "/" ? (
            <HomeNavbar
               cartItems={cartItems}
               onAdd={onAdd}
               onRemove={onRemove}
               onDelete={onDelete}
               onDeleteAll={onDeleteAll}
            />
         ) : (
            <OtherNavbar
               cartItems={cartItems}
               onAdd={onAdd}
               onRemove={onRemove}
               onDelete={onDelete}
               onDeleteAll={onDeleteAll}
            />
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
