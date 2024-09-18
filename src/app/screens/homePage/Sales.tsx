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
import VisibilityIcon from "@mui/icons-material/Visibility";
import RateReviewIcon from "@mui/icons-material/RateReview";

const product = [
   {
      imageUrl: "/images/bag1.jpg",
      brand: "Studio Design",
      productName: "177",
      productPrice: 14.5,
      originalPrice: 18.0,
   },
   {
      imageUrl: "/images/bag1.jpg",
      brand: "Studio Design",
      productName: "177",
      productPrice: 14.5,
      originalPrice: 18.0,
   },
   {
      imageUrl: "/images/bag1.jpg",
      brand: "Studio Design",
      productName: "177",
      productPrice: 14.5,
      originalPrice: 18.0,
   },
   {
      imageUrl: "/images/bag1.jpg",
      brand: "Studio Design",
      productName: "177",
      productPrice: 14.5,
      originalPrice: 18.0,
   },
];

export default function SalesPage() {
   return (
      <div className="arrival-div">
         <Container className="arrival-big">
            <Stack>
               <Box className="category-title">Hot Sales</Box>
               <Stack className={"arrival-main"}>
                  {product.length !== 0 ? (
                     product.map((ele, index) => {
                        return (
                           <CssVarsProvider>
                              <Card>
                                 <Stack className="hot-sale">
                                    <Box
                                       display="flex"
                                       justifyContent="center">
                                       <Card
                                          sx={{
                                             width: 300,
                                             textAlign: "center",
                                          }}>
                                          {/* Image section */}
                                          <AspectRatio
                                             minHeight="350px"
                                             maxHeight="350px">
                                             <img
                                                src={ele.imageUrl}
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
                                                {ele.brand}
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
                                                   Left:{ele.productName}
                                                </Typography>
                                                <Typography
                                                   component="div"
                                                   sx={{
                                                      fontWeight: "bold",
                                                      marginBottom: "8px",
                                                   }}>
                                                   Sold:{ele.productName}
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
                                                   }}>
                                                   ${ele.productPrice}
                                                </Typography>
                                                <Typography
                                                   sx={{
                                                      textDecoration:
                                                         "line-through",
                                                      color: "gray",
                                                      fontSize: "1rem",
                                                   }}>
                                                   ${ele.originalPrice}
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
