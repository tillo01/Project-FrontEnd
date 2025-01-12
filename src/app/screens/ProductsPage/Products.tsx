/** @format */

import { Box, Button, Container, Pagination, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquery } from "../../../libs/types/product";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrevialProducts } from "./selector";
import { ChangeEvent, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../libs/config";
import { ProductCollection } from "../../../libs/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../libs/types/search";
import {
   sweetTopSmallSuccessAlert,
   sweetTopSuccessAlert,
} from "../../../libs/sweetAlert";

/*REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
   setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrevialProducts, (products) => ({
   products,
}));

interface ProductsProps {
   onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
   const { setProducts } = actionDispatch(useDispatch());
   const { products } = useSelector(productsRetriever);
   const { onAdd } = props;

   const [productSearch, setProductSearch] = useState<ProductInquery>({
      page: 1,
      limit: 8,
      search: "",
      order: "createdAt",
   });

   const [searchText, setSearchText] = useState<string>("");

   useEffect(() => {
      const product = new ProductService();
      product
         .getProducts(productSearch)
         .then((data) => {
            setProducts(data);
         })
         .catch((err) => {
            console.log("Erro on Products.tsx", err);
         });
   }, [productSearch]);

   const searchCollectionHandler = (collection: ProductCollection) => {
      productSearch.page = 1;
      productSearch.productCollection = collection;
      setProductSearch({ ...productSearch });
   };

   const searchOrderHandler = (order: string) => {
      productSearch.page = 1;
      productSearch.order = order;
      setProductSearch({ ...productSearch });
   };

   const searchProductHandler = () => {
      productSearch.search = searchText;
      setProductSearch({
         ...productSearch,
      });
   };
   useEffect(() => {
      if (searchText === "") {
         productSearch.search = "";
         setProductSearch({
            ...productSearch,
         });
      }
   }, [searchText]);

   const paginationHandler = (e: ChangeEvent<any>, value: number) => {
      productSearch.page = value;
      setProductSearch({ ...productSearch });
   };
   const history = useHistory();
   const choosenProductHandler = (id: string) => {
      console.log("id==>", id);
      history.push(`/products/${id}`);
   };
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
                           Cooking-Web
                        </p>
                     </Box>
                     <Box className="search-div">
                        <input
                           type="search"
                           name="search-dishes"
                           id="search-menu"
                           placeholder="Type here"
                           value={searchText}
                           onChange={(e) => {
                              setSearchText(e.target.value);
                           }}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") searchProductHandler();
                           }}
                           className="search-dishes-input"
                        />
                        <Button
                           variant={"contained"}
                           color={"primary"}
                           onClick={searchProductHandler}
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
                        color={
                           productSearch.order === "createdAt"
                              ? "success"
                              : "error"
                        }
                        onClick={() => searchOrderHandler("createdAt")}>
                        NEW
                     </Button>
                     <Button
                        className="v1"
                        variant="contained"
                        color={
                           productSearch.order === "productPrice"
                              ? "success"
                              : "error"
                        }
                        onClick={() => searchOrderHandler("productPrice")}>
                        PRICE
                     </Button>
                     <Button
                        className="v1"
                        variant="contained"
                        color={
                           productSearch.order === "productViews"
                              ? "success"
                              : "error"
                        }
                        onClick={() => searchOrderHandler("productViews")}>
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
                           color={
                              productSearch.productCollection ===
                              ProductCollection.MEN
                                 ? "success"
                                 : "error"
                           }
                           onClick={() =>
                              searchCollectionHandler(ProductCollection.MEN)
                           }>
                           DISHES
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={
                              productSearch.productCollection ===
                              ProductCollection.WOMEN
                                 ? "success"
                                 : "error"
                           }
                           onClick={() =>
                              searchCollectionHandler(ProductCollection.WOMEN)
                           }>
                           CAKES
                        </Button>

                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={
                              productSearch.productCollection ===
                              ProductCollection.KIDS
                                 ? "success"
                                 : "error"
                           }
                           onClick={() =>
                              searchCollectionHandler(ProductCollection.KIDS)
                           }>
                           FOODS
                        </Button>
                     </Stack>
                  </Stack>

                  <Stack className="product-wrapper">
                     {products.length !== 0 ? (
                        products.map((product: Product) => {
                           const imagePath = `${serverApi}/${product.productImages[0]}`;

                           console.log(imagePath);

                           const sizeVolume =
                              product.productCollection ===
                              ProductCollection.KIDS
                                 ? product.productKids + " Size"
                                 : product.productSize;
                           return (
                              <Stack
                                 key={product._id}
                                 onClick={() =>
                                    choosenProductHandler(product._id)
                                 }
                                 className={"product-cards"}>
                                 <Stack
                                    className="product-img"
                                    sx={{
                                       backgroundImage: `url(${imagePath})`,
                                    }}>
                                    <Stack className="view-and-shop">
                                       <Button
                                          className="view-btn"
                                          sx={{ left: "35px" }}>
                                          <Badge
                                             badgeContent={product.productViews}
                                             color="error">
                                             <RemoveRedEyeIcon
                                                sx={{
                                                   color:
                                                      product.productViews === 0
                                                         ? "gray"
                                                         : "white",
                                                }}
                                             />
                                          </Badge>
                                       </Button>
                                    </Stack>
                                 </Stack>

                                 <Box className="products-desc">
                                    <div>
                                       <span className="product-title">
                                          {product.productName}
                                       </span>
                                    </div>
                                    <Stack
                                       flexDirection={"row"}
                                       justifyContent={"space-around"}
                                       alignItems={"center"}>
                                       <div
                                          className="product-description"
                                          style={{ color: "#767573d0" }}>
                                          <MonetizationOnIcon />
                                          {product.productDiscount
                                             ? product.productDiscount
                                             : product.productPrice}
                                       </div>

                                       <div
                                          className="product-description"
                                          style={{ color: "#767573d0" }}>
                                          <span
                                             style={{
                                                textDecoration: "line-through",
                                             }}>
                                             <MonetizationOnIcon />
                                             {product.productDiscount
                                                ? product.productPrice
                                                : 0}
                                          </span>
                                       </div>
                                    </Stack>
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
                     count={
                        products.length !== 0
                           ? productSearch.page + 1
                           : productSearch.page
                     }
                     page={productSearch.page}
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
                     onChange={paginationHandler}
                  />
               </Stack>
            </Stack>
         </Container>

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
