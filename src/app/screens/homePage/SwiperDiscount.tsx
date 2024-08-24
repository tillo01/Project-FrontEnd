/** @format */

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import { Container, Stack } from "@mui/system";

import "swiper/css";
import "swiper/css/navigation";

const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

export default function MySwiper() {
   return (
      <Container>
         <Stack className={"swiper-big"}>
            <Stack>
               <Box className="category-title">Best Offer</Box>
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
                  <SwiperSlide className={"swiper-main"}>
                     <img
                        src="/images/men-11.jpg"
                        alt=""
                     />
                  </SwiperSlide>
                  <SwiperSlide className={"swiper-main"}>
                     <img
                        src="/images/men-10.jpg"
                        alt=""
                     />
                  </SwiperSlide>

                  <SwiperSlide className={"swiper-main"}>
                     <img
                        src="/images/men-4.jpg"
                        alt=""
                     />
                  </SwiperSlide>
                  <SwiperSlide className={"swiper-main"}>
                     <img
                        src="/images/men-3.jpg"
                        alt=""
                     />
                  </SwiperSlide>
                  <SwiperSlide className={"swiper-main"}>
                     <img
                        src="/images/men-2.jpg"
                        alt=""
                     />
                  </SwiperSlide>
               </Swiper>
            </Stack>
         </Stack>
      </Container>
   );
}
