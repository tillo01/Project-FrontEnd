/** @format */

import React, { useEffect } from "react";
import ServicePage from "./Service";
import NewArrivals from "./NewArrivals";
import SalesPage from "./Sales";
import Advertisiment from "./Advertisiment";
import ActiveUsers from "./ActiveUsers";
import MySwiper from "./SwiperDiscount";
import DiscountPage from "./DailyDeals";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewArrivals, setHotSales } from "./slice";
import { Product } from "../../../libs/types/product";
import { ProductCollection } from "../../../libs/enums/product.enum";
import ProductService from "../../services/ProductService";

/*REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
   setNewArrivals: (data: Product[]) => dispatch(setNewArrivals(data)),
   setHotSales: (data: Product[]) => dispatch(setHotSales(data)),

   // setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
});
/*REDUX SELECTOR */

export default function HomePage() {
   const { setNewArrivals, setHotSales } = actionDispatch(useDispatch());

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
            productCollection: ProductCollection.HOT,
         })
         .then((data) => {
            console.log("data passed here", data);
            setNewArrivals(data);
         })
         .catch((err) => {
            console.log("err", err);
         });

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

      product
         .getProducts({
            page: 1,
            limit: 4,
            order: "createdAt",
            productCollection: ProductCollection.HOT,
         })
         .then((data) => {
            console.log("data passed here", data);
            setHotSales(data);
         })
         .catch((err) => {
            console.log("err", err);
         });
   }, []);

   return (
      <div className={"homepage"}>
         <ServicePage />
         <NewArrivals />
         <SalesPage />
         <Advertisiment />
         <ActiveUsers />
         <DiscountPage />
         <MySwiper />
      </div>
   );
}
