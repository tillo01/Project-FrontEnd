/** @format */

import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../libs/types/product";
import { setChoosenProduct, setProducts, setRestaurant } from "./slice";
import { createSelector } from "reselect";
import { retrevialChoosenProduct, retrevialRestaurant } from "./selector";
import { Member } from "../../../libs/types/member";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../libs/config";
import { CartItem } from "../../../libs/types/search";
import { sweetTopSmallSuccessAlert } from "../../../libs/sweetAlert";

/*REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
   setChoosenProduct: (data: Product) => dispatch(setChoosenProduct(data)),
   setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
});

const choosenProductRetriever = createSelector(
   retrevialChoosenProduct,
   (choosenProduct) => ({
      choosenProduct,
   }),
);
const restaurantRetriever = createSelector(
   retrevialRestaurant,
   (restaurant) => ({
      restaurant,
   }),
);
interface ChoosenProductProps {
   onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChoosenProductProps) {
   const { onAdd } = props;
   const { setRestaurant, setChoosenProduct } = actionDispatch(useDispatch());
   const { restaurant } = useSelector(restaurantRetriever);
   const { choosenProduct } = useSelector(choosenProductRetriever);

   const { productId } = useParams<{ productId: string }>();
   console.log("productId", productId);
   useEffect(() => {
      const product = new ProductService();
      product
         .getProduct(productId)
         .then((data) => {
            setChoosenProduct(data);
         })
         .catch((err) => {
            console.log("err on getChoosenProduct", err);
         });

      const member = new MemberService();
      member
         .getAdmin()
         .then((data) => {
            setRestaurant(data);
         })
         .catch((err) => {});
   }, []);
   if (!choosenProduct) return null;
   return (
      <div className={"chosen-product"}>
         <Box className={"title"}>Product Detail</Box>
         <Container className={"product-container"}>
            <Stack className={"chosen-product-slider"}>
               <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="swiper-area">
                  {choosenProduct?.productImages.map(
                     (ele: string, index: number) => {
                        const imagePath = `${serverApi}/${ele}`;
                        return (
                           <SwiperSlide key={index}>
                              <img
                                 className="slider-image"
                                 src={imagePath}
                              />
                           </SwiperSlide>
                        );
                     },
                  )}
               </Swiper>
            </Stack>
            <Stack className={"chosen-product-info"}>
               <Box className={"info-box"}>
                  <strong className={"product-name"}>
                     {choosenProduct.productName}
                     <p
                        style={{
                           display: "inline-block",
                           marginLeft: "30px",
                        }}>
                        {choosenProduct.productSize}
                     </p>
                  </strong>
                  <span className={"resto-name"}>{restaurant?.memberNick}</span>
                  <span className={"resto-name"}>
                     {restaurant?.memberPhone}
                  </span>

                  <Box className={"rating-box"}>
                     <Rating
                        name="half-rating"
                        defaultValue={2.5}
                        precision={0.5}
                     />
                     <div className={"evaluation-box"}>
                        <div className={"product-view"}>
                           <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                           <span>{choosenProduct.productViews}</span>
                        </div>
                     </div>
                  </Box>

                  <p className={"product-desc"}>
                     {choosenProduct?.productDesc
                        ? choosenProduct.productDesc
                        : "No description"}
                  </p>

                  <Divider
                     height="1"
                     width="100%"
                     bg="#000000"
                  />
                  <div className={"product-price"}>
                     <span>Saled:</span>
                     <span>
                        $
                        {choosenProduct.productDiscount
                           ? choosenProduct.productDiscount
                           : choosenProduct.productPrice}
                     </span>
                     <span>Price:</span>

                     <span
                        style={{
                           textDecoration: "line-through",
                           color: "gray",
                        }}>
                        $
                        {choosenProduct.productDiscount
                           ? choosenProduct.productPrice
                           : 0}
                     </span>
                  </div>
                  <div className={"button-box"}>
                     <Button
                        onClick={(e) => {
                           e.stopPropagation();
                           sweetTopSmallSuccessAlert("Added to Basket", 1000);

                           onAdd({
                              _id: choosenProduct._id,
                              quantity: 1,
                              name: choosenProduct.productName,
                              price: choosenProduct.productPrice,
                              image: choosenProduct.productImages[0],
                           });
                        }}
                        variant="contained">
                        Add To Basket
                     </Button>
                  </div>
               </Box>
            </Stack>
         </Container>
      </div>
   );
}
