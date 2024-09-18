/** @format */

import { Box, Stack } from "@mui/material";
import { Container } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";

import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrevialHotSales } from "./selector";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";

const hotSalesRetriever = createSelector(retrevialHotSales, (hotSales) => ({
   hotSales,
}));

// const product = [
//    {
//       imageUrl: "/images/bag1.jpg",
//       brand: "Studio Design",
//       productName: "177",
//       productPrice: 900,
//       originalPrice: 1000,
//    },
//    {
//       imageUrl: "/images/bag1.jpg",
//       brand: "Studio Design",
//       productName: "177",
//       productPrice: 900,
//       originalPrice: 1000,
//    },
//    {
//       imageUrl: "/images/bag1.jpg",
//       brand: "Studio Design",
//       productName: "177",
//       productPrice: 900,
//       originalPrice: 1000,
//    },
//    {
//       imageUrl: "/images/bag1.jpg",
//       brand: "Studio Design",
//       productName: "177",
//       productPrice: 900,
//       originalPrice: 1000,
//    },
// ];

export default function SalesPage() {
   const { hotSales } = useSelector(hotSalesRetriever);

   return (
      <div className="arrival-div">
         <Container className="arrival-big">
            <Stack>
               <Box className="category-title">Hot Sales</Box>
               <Stack className={"arrival-main"}>
                  {hotSales.length !== 0 ? (
                     hotSales.map((ele: Product) => {
                        const imagePath = `${serverApi}/${ele.productImages}`;
                        return (
                           <CssVarsProvider key={ele._id}>
                              <Card>
                                 <Stack className="hot-sale">
                                    <Box
                                       display="flex"
                                       justifyContent="center">
                                       <Card
                                          sx={{
                                             width: 290,
                                             textAlign: "center",
                                             borderInlineColor: "green",
                                          }}>
                                          {/* Image section */}
                                          <AspectRatio
                                             minHeight="350px"
                                             maxHeight="350px">
                                             <img
                                                src={imagePath}
                                                style={{ objectFit: "cover" }}
                                             />
                                          </AspectRatio>

                                          {/* Card content */}
                                          <CardContent>
                                             <Typography
                                                sx={{
                                                   textTransform: "uppercase",
                                                   marginBottom: "8px",
                                                }}>
                                                {ele.productName}
                                                <span
                                                   style={{
                                                      paddingLeft: "15px",
                                                      fontWeight: 1000,
                                                      color: "red",
                                                   }}>
                                                   {ele.productSize}
                                                </span>
                                             </Typography>
                                             {/* Product Name */}
                                             <div
                                                style={{
                                                   display: "flex",
                                                   flexDirection: "row",
                                                   justifyContent:
                                                      "space-evenly",
                                                }}>
                                                <Typography
                                                   component="div"
                                                   sx={{
                                                      fontWeight: "bold",
                                                      marginBottom: "8px",
                                                   }}>
                                                   Left:{ele.productLeftCount}
                                                </Typography>
                                                <Typography
                                                   component="div"
                                                   sx={{
                                                      fontWeight: "bold",
                                                      marginBottom: "8px",
                                                   }}>
                                                   Sold:{ele.productLeftCount}
                                                </Typography>
                                             </div>

                                             {/* Price Section */}
                                             <Box
                                                sx={{
                                                   display: "flex",
                                                   justifyContent: "center",
                                                   alignItems: "center",
                                                   gap: "8px",
                                                   marginBottom: "16px",
                                                }}>
                                                <Typography
                                                   sx={{
                                                      color: "red",
                                                      fontWeight: "bold",
                                                      fontSize: "1.2rem",
                                                      colorAdjust:
                                                         ele.productDiscount
                                                            ? "red"
                                                            : "black",
                                                   }}>
                                                   $
                                                   {ele.productDiscount
                                                      ? ele.productDiscount
                                                      : ele.productPrice}
                                                </Typography>
                                                <Typography
                                                   sx={{
                                                      textDecoration:
                                                         "line-through",
                                                      color: "gray",
                                                      fontSize: "18px",
                                                   }}>
                                                   $
                                                   {ele.productDiscount
                                                      ? ele.productPrice
                                                      : 0}
                                                </Typography>
                                             </Box>

                                             {/* Add to Cart Button */}
                                             <Button
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                   fontWeight: "bold",
                                                   color: "black",
                                                   borderColor: "red",
                                                   "&:hover": {
                                                      backgroundColor: "gray",
                                                      color: "white",
                                                   },
                                                }}>
                                                Add to Cart
                                             </Button>
                                          </CardContent>
                                       </Card>
                                    </Box>
                                 </Stack>
                              </Card>
                           </CssVarsProvider>
                        );
                     })
                  ) : (
                     <Box className="no-data">
                        New Arrivals are not availables
                     </Box>
                  )}
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
