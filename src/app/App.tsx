/** @format */

import React from "react";
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
function App() {
   const location = useLocation();

   return (
      <>
         {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}

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
         <Footer />
      </>
   );
}

export default App;
