/** @format */

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Stack } from "@mui/system";

import "swiper/css";
import "swiper/css/navigation";
import { useHistory } from "react-router-dom";

const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

export default function MySwiperProduct() {
   const history = useHistory();
   const choosenProductHandler = (id: string) => {
      console.log("id==>", id);
      history.push(`/products/${id}`);
   };
   return (
      <Container>
         <Stack>
            <Stack>
               <Swiper
                  navigation={true}
                  modules={[Navigation, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={4}
                  loop={true}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper: any) => console.log(swiper)}
                  centeredSlides={true}
                  autoplay={{
                     delay: 2000,
                     reverseDirection: true,
                     disableOnInteraction: true,
                  }}
                  style={{
                     width: "100%",
                     height: "500px",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}>
                  <SwiperSlide>
                     <img
                        style={{
                           width: "300px",
                           height: "350px",
                        }}
                        src="/images/men-11.jpg"
                        alt=""
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <img
                        style={{
                           width: "300px",
                           height: "350px",
                        }}
                        src="/images/men-10.jpg"
                        alt=""
                     />
                  </SwiperSlide>

                  <SwiperSlide>
                     <img
                        style={{
                           width: "300px",
                           height: "350px",
                        }}
                        src="/images/men-4.jpg"
                        alt=""
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <img
                        style={{
                           width: "300px",
                           height: "350px",
                        }}
                        src="/images/men-3.jpg"
                        alt=""
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <img
                        style={{
                           width: "300px",
                           height: "350px",
                        }}
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
