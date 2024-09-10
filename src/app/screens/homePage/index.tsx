/** @format */

import React from "react";
import ServicePage from "./Service";
import NewArrivals from "./NewArrivals";
import SalesPage from "./Sales";
import Advertisiment from "./Advertisiment";
import ActiveUsers from "./ActiveUsers";
import ProductCard from "./DailyDeals";
import MySwiper from "./SwiperDiscount";
import DiscountPage from "./DailyDeals";

export default function HomePage() {
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
