/** @format */
import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Products from "./Products";
import ChosenProduct from "./ChoosenProduct";
import "../../../css/products.css";
import { CartItem } from "../../../libs/types/search";

interface ProductsPageProps {
   onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
   const products = useRouteMatch();
   console.log("products,", products);
   const { onAdd } = props;

   return (
      <div className="products-page">
         <Switch>
            <Route path={`${products.path}/:productId`}>
               <ChosenProduct onAdd={onAdd} />
            </Route>
            <Route path={`${products.path}`}>
               <Products onAdd={onAdd} />
            </Route>
         </Switch>
      </div>
   );
}
