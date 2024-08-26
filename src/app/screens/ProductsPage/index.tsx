/** @format */
import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Products from "./Products";
import ChosenProduct from "./ChoosenProduct";
import "../../../css/products.css";

export default function ProductsPage() {
   const products = useRouteMatch();
   console.log("products,", products);

   return (
      <div className="products-page">
         <Switch>
            <Route path={`${products.path}/:productId`}>
               <ChosenProduct />
            </Route>
            <Route path={`${products.path}`}>
               <Products />
            </Route>
         </Switch>
      </div>
   );
}
