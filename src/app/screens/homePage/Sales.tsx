/** @format */

import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import {
   Card,
   CardContent,
   CardMedia,
   Typography,
   Button,
   Box,
   Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const SoldBadge = styled(Badge)({
   "& .MuiBadge-badge": {
      backgroundColor: "#f44336",
      color: "#fff",
      fontSize: "0.75rem",
      padding: "0 6px",
   },
});

const salesClothes = [
   {
      clothesName: "Brand New",
      imagePath: "/images/womenbag.jpg",
      price: "$2.9000",
      discount: "$2.000",
   },
   {
      clothesName: "Brand New",
      imagePath: "/images/men-8.jpg",
      price: "$2.9000",
      discount: "$2.000",
   },
   {
      clothesName: "Brand New",
      imagePath: "/images/studendt bag.jpg",
      price: "$2.9000",
      discount: "$2.000",
   },
   {
      clothesName: "Brand New",
      imagePath: "/images/womenbag2.jpg",
      price: "$2.9000",
      discount: "$2.000",
   },
];

export default function SalesPage() {
   return (
      <div className={"sales-div"}>
         <Container className={"sales-container"}>
            <Stack className={"sales-section"}>
               <Box className="category-title">Hot Sales</Box>
               <Stack className={"sales-main"}>
                  {salesClothes.length !== 0 ? (
                     salesClothes.map((item, index) => (
                        <Card className={"sales-card"}>
                           <SoldBadge
                              badgeContent="Sold"
                              color="primary"
                              sx={{ position: "absolute", top: 16, left: 16 }}
                           />
                           <CardMedia
                              className={"card-image"}
                              component="img"
                              height="300"
                              image={item.imagePath} // Replace with your image source
                              alt="Product"
                           />

                           <CardContent sx={{ textAlign: "center" }}>
                              <Typography
                                 variant="subtitle2"
                                 color="textSecondary">
                                 Chic-Aura
                              </Typography>
                              <Typography variant="h6">
                                 {item.clothesName}
                              </Typography>

                              <Box className={"price-box"}>
                                 <Typography
                                    variant="h6"
                                    color="error">
                                    {item.discount}
                                 </Typography>
                                 <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ textDecoration: "line-through" }}>
                                    {item.price}
                                 </Typography>
                              </Box>
                              <Button
                                 variant="contained"
                                 color="inherit"
                                 sx={{ marginTop: 2 }}>
                                 ADD TO CART
                              </Button>
                           </CardContent>
                        </Card>
                     ))
                  ) : (
                     <Box className="no-data">Hot Sales are not availables</Box>
                  )}
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
