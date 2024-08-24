/** @format */

import React from "react";
import "../css/App.css";
import HomeNavbar from "../app/components/header/HomeNavbar";
import { Route, Switch } from "react-router-dom";

import "../css/navbar.css";
import "../css/home.css";

import ProductsPage from "../app/screens/ProductsPage/ProductsPage";
import OrdersPage from "../app/screens/OrdersPage/OrdersPage";
import UserPage from "../app/screens/UserPage/userPage";
import HelpPage from "../app/screens/HelpPage/HelpPage";
import HomePage from "../app/screens/homePage";

function App() {
   return (
      <>
         <HomeNavbar />

         <Switch>
            <Route path="/products">
               <ProductsPage />
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
               <HomePage />
            </Route>
         </Switch>
         {/* <Footer /> */}
      </>
   );
}

export default App;
