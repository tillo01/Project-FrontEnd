/** @format */

import React from "react";
import "../css/App.css";

import { Route, Switch, useLocation } from "react-router-dom";
import HomeNavbar from "./app/components/header/HomeNavbar";
import UserPage from "./app/screens/UserPage";
import HelpPage from "./app/screens/HelpPage";
import HomePage from "./app/screens/homePage";
import OtherNavbar from "./app/components/header/OtherNavbar";
import ProductsPage from "./app/screens/ProductsPage";
import OrdersPage from "./app/screens/OrdersPage";
import Footer from "./app/components/FooterPage";
import "../css/navbar.css";
import "../css/home.css";
import "../css/footer.css";
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
