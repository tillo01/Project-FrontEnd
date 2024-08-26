/** @format */

import { Box, Button, Container, Pagination, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SwiperSlide } from "swiper/react";
import MySwiper from "../homePage/SwiperDiscount";
import MySwiperProduct from "./SwiperDiscount";

const products = [
   {
      imagePath: "/images/men-5.jpg",
   },
   {
      imagePath: "/images/men-1.jpg",
   },
   {
      imagePath: "/images/men-7.jpg",
   },
   {
      imagePath: "/images/dior-bag.jpg",
   },
   {
      imagePath: "/images/men-5.jpg",
   },
   {
      imagePath: "/images/men-1.jpg",
   },
   {
      imagePath: "/images/men-7.jpg",
   },
   {
      imagePath: "/images/dior-bag.jpg",
   },
];

export default function Products() {
   return (
      <div className="products">
         <Container>
            <Stack
               className="main-big"
               flexDirection={"column"}>
               <Stack className="avatar-big-box">
                  <Stack
                     flexDirection={"row"}
                     alignItems={"center"}>
                     <Box>
                        <p
                           style={{ display: "inline-block" }}
                           className="product-category-title">
                           Chic-Aura Shop
                        </p>
                     </Box>
                     <Box className="search-div">
                        <input
                           type="search"
                           name="search-dishes"
                           id="search-menu"
                           placeholder="Type here"
                           value={""}
                           className="search-dishes-input"
                        />
                        <Button
                           variant={"contained"}
                           color={"primary"}
                           className="search">
                           SEARCH <SearchIcon className="search-icon" />
                        </Button>
                     </Box>
                  </Stack>
               </Stack>

               <Stack className="list-category-section">
                  <Stack
                     className="list-category-section-btns"
                     gap={2}
                     justifyContent={"flex-end"}>
                     <Button
                        className="v1"
                        variant="contained"
                        color={"error"}>
                        NEW
                     </Button>
                     <Button
                        className="v1"
                        variant="contained"
                        color={"error"}>
                        PRICE
                     </Button>
                     <Button
                        className="v1"
                        variant="contained"
                        color={"error"}>
                        VIEWS
                     </Button>
                  </Stack>
               </Stack>

               <Stack className="filter-and-cards">
                  <Stack className="dishes-filter-section">
                     <Stack
                        className="dish-category"
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"error"}>
                           MEN
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"error"}>
                           WOMEN
                        </Button>

                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"error"}>
                           KIDS
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"error"}>
                           HOT
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"error"}>
                           OTHER
                        </Button>
                     </Stack>
                  </Stack>

                  <Stack className="product-wrapper">
                     {products.length !== 0 ? (
                        products.map((items, index) => {
                           return (
                              <Stack className={"product-cards"}>
                                 <Stack
                                    className="product-img"
                                    sx={{
                                       backgroundImage: `url(${items.imagePath})`,
                                    }}>
                                    <div className="product-sale">xxl</div>

                                    <Stack className="view-and-shop">
                                       <Button
                                          className={"shop-btn"}
                                          sx={{ left: "30px" }}>
                                          <img
                                             src="/icons/shopping-cart.svg"
                                             alt=""
                                             style={{ display: "flex" }}
                                          />
                                       </Button>
                                       <Button
                                          className="view-btn"
                                          sx={{ left: "35px" }}>
                                          <Badge
                                             badgeContent={"3"}
                                             color="error">
                                             <RemoveRedEyeIcon
                                                sx={{
                                                   color: "white",
                                                }}
                                             />
                                          </Badge>
                                       </Button>
                                    </Stack>
                                 </Stack>

                                 <Box className="products-desc">
                                    <span className="product-title">
                                       Brand nEw
                                    </span>
                                    <div
                                       className="product-description"
                                       style={{ color: "#767573d0" }}>
                                       <MonetizationOnIcon />2
                                    </div>
                                 </Box>
                              </Stack>
                           );
                        })
                     ) : (
                        <Box className="no-data">
                           Products are not available
                        </Box>
                     )}
                  </Stack>
               </Stack>

               <Stack className={"pagination-section"}>
                  <Pagination
                     count={1}
                     page={1}
                     renderItem={(item) => (
                        <PaginationItem
                           components={{
                              previous: ArrowBackIcon,
                              next: ArrowForwardIcon,
                           }}
                           {...item}
                           color="secondary"
                        />
                     )}
                  />
               </Stack>
            </Stack>
         </Container>

         <div className={"product-swiper"}>
            <Stack>
               <MySwiperProduct />
            </Stack>
         </div>

         <div className={"address"}>
            <Container>
               <Stack className="address-area">
                  <Box className="title">Our address</Box>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.358377995709!2d144.9630583153163!3d-37.81362797975133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775a46d9c0c3d0!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1636203122104!5m2!1sen!2sus"></iframe>
               </Stack>
            </Container>
         </div>
      </div>
   );
}
