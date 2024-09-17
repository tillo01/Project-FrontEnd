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

import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrevialPopularDishes } from "./selector";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";

const newDishesRetriever = createSelector(
   retrevialPopularDishes,
   (newDishes) => ({ newDishes }),
);

export default function NewArrivals() {
   const { newDishes } = useSelector(newDishesRetriever);

   return (
      <div className="arrival-div">
         <Container className="arrival-big">
            <Stack>
               <Box className="category-title">New Arrivals</Box>
               <Stack className={"arrival-main"}>
                  {newDishes.length !== 0 ? (
                     newDishes.map((ele: Product) => {
                        const imagePath = `${serverApi}/${ele.productImages[0]}`;
                        return (
                           <CssVarsProvider key={ele._id}>
                              <Card sx={{ width: 320 }}>
                                 <AspectRatio
                                    minHeight="350px"
                                    maxHeight="200px">
                                    <img src={imagePath} />
                                 </AspectRatio>
                                 <CardContent
                                    className={"arrival-content"}
                                    orientation="horizontal">
                                    <div className={"arrival-mini-content"}>
                                       <Typography
                                          className={"arrivals-name"}
                                          level="body-xs">
                                          {ele.productName}
                                          <Typography
                                             className={"arrivals-views"}
                                             sx={{
                                                ml: "auto",
                                                alignSelf: "center",
                                                fontWeight: 600,
                                             }}>
                                             <Button
                                                className={"arrival-btn"}
                                                variant="outlined"
                                                size="md"
                                                color="danger"
                                                aria-label="Explore Bahamas Islands"
                                                sx={{
                                                   ml: "auto",
                                                   alignSelf: "center",
                                                   fontWeight: 600,
                                                }}>
                                                Add Basket
                                             </Button>
                                          </Typography>
                                       </Typography>
                                       <div
                                          style={{
                                             display: "flex",
                                             flexDirection: "row",
                                             justifyContent: "space-around",
                                          }}>
                                          <Typography
                                             paddingTop={"20px"}
                                             fontSize={"lg"}>
                                             {ele.productPrice}
                                          </Typography>

                                          <Typography
                                             sx={{
                                                textDecoration: "line-through",
                                                paddingTop: "18px",
                                             }}
                                             className={"arrivals-price"}
                                             fontSize="l"
                                             fontWeight="l">
                                             ${ele.productDiscount}
                                          </Typography>
                                       </div>
                                    </div>
                                    {/* here button */}
                                 </CardContent>
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
