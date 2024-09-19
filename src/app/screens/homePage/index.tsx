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
import {
   setNewArrivals,
   setHotSales,
   setTopUsers,
   setDailyDeals,
} from "./slice";
import { Product } from "../../../libs/types/product";
import {
   ProductCollection,
   ProductStatus,
} from "../../../libs/enums/product.enum";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../libs/types/member";

/*REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
   setNewArrivals: (data: Product[]) => dispatch(setNewArrivals(data)),
   setHotSales: (data: Product[]) => dispatch(setHotSales(data)),
   setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
   setDailyDeals: (data: Product[]) => dispatch(setDailyDeals(data)),
});
/*REDUX SELECTOR */

export default function HomePage() {
   const { setNewArrivals, setHotSales, setTopUsers, setDailyDeals } =
      actionDispatch(useDispatch());

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
            productCollection: ProductCollection.HOT,
         })
         .then((data) => {
            console.log("data passed here", data);
            setHotSales(data);
         })
         .catch((err) => {
            console.log("err", err);
         });

      product
         .getProducts({
            page: 1,
            limit: 2,
            order: "createdAt",
            productStatus: ProductStatus.DAILYDEALS,
         })
         .then((data) => {
            console.log("data passed here", data);
            setDailyDeals(data);
         })
         .catch((err) => {
            console.log("err", err);
         });

      const member = new MemberService();

      member
         .getTopUsers()
         .then((data) => {
            console.log("Passed here topUsers");
            setTopUsers(data);
         })
         .catch((err) => {
            console.log("Error on top users", err);
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
