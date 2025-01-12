/** @format */

import React, { useEffect } from "react";
import ServicePage from "./Service";
import NewArrivals from "./NewArrivals";
import Advertisiment from "./Advertisiment";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewArrivals } from "./slice";
import { Product } from "../../../libs/types/product";
import { ProductCollection } from "../../../libs/enums/product.enum";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../libs/types/member";
import { CartItem } from "../../../libs/types/search";
import useBasket from "../../hooks/useBasket";
interface HomePageProps {
   onAdd: (item: CartItem) => void;
   cartItems: CartItem[];
}
/*REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
   setNewArrivals: (data: Product[]) => dispatch(setNewArrivals(data)),
});
/*REDUX SELECTOR */

export default function HomePage(props: HomePageProps) {
   const { onAdd, cartItems } = props;
   const { setNewArrivals } = actionDispatch(useDispatch());

   // Selector:Store => Data,
   console.log(process.env.REACT_APP_API_URL);

   useEffect(() => {
      // Backend server data request ==> data fetch
      // slice:Data => Store

      const product = new ProductService();
      product
         .getProducts({
            page: 1,
            limit: 4,
            order: "productViews",
            productCollection: ProductCollection.MEN,
         })
         .then((data) => {
            console.log("data passed here", data);
            setNewArrivals(data);
         })
         .catch((err) => {
            console.log("err", err);
         });

      const member = new MemberService();
   }, []);

   return (
      <div className={"homepage"}>
         <ServicePage />
         <NewArrivals
            onAdd={onAdd}
            cartItems={cartItems}
         />

         <Advertisiment />
      </div>
   );
}
