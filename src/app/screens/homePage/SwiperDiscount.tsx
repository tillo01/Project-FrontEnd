/** @format */

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import { Container, Stack } from "@mui/system";

import "swiper/css";
import "swiper/css/navigation";
import { createSelector } from "@reduxjs/toolkit";
import { retrevialMySwiper } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../libs/config";
import { Product } from "../../../libs/types/product";

const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

const mySwiperRetriever = createSelector(retrevialMySwiper, (mySwiper) => ({
   mySwiper,
}));

export default function MySwiper() {
   const { mySwiper } = useSelector(mySwiperRetriever);
   return (
      <Container>
         <Stack className={"swiper-big"}>
            <Stack>
               <Box className="category-title">Best Offer Kids</Box>
               {mySwiper.length !== 0 ? (
                  <Swiper
                     navigation={true}
                     modules={[Navigation, Autoplay]}
                     spaceBetween={100}
                     slidesPerView={3}
                     loop={true}
                     onSlideChange={() => console.log("slide change")}
                     onSwiper={(swiper: any) => console.log(swiper)}
                     centeredSlides={true}
                     autoplay={{
                        delay: 1000000,
                        disableOnInteraction: true,
                     }}
                     className="mySwiper"
                     style={{ width: "70%", height: "400px" }}>
                     {mySwiper.map((ele: Product) => {
                        const imagePath = `${serverApi}/${ele.productImages[0]}`;
                        return (
                           <SwiperSlide
                              key={ele._id}
                              className={"swiper-main"}>
                              <img
                                 src={imagePath}
                                 alt={ele.productName}
                              />
                           </SwiperSlide>
                        );
                     })}
                  </Swiper>
               ) : (
                  <Box className="no-data">New Arrivals are not availables</Box>
               )}
            </Stack>
         </Stack>
      </Container>
   );
}
