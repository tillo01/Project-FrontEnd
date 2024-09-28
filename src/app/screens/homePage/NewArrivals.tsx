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
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrevialNewArrivals } from "./selector";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";
import { ProductCollection } from "../../../libs/enums/product.enum";
import { CartItem } from "../../../libs/types/search";
import { sweetTopSmallSuccessAlert } from "../../../libs/sweetAlert";

const newArrivalsRetriever = createSelector(
   retrevialNewArrivals,
   (newArrivals) => ({ newArrivals }),
);
interface NewArrivalsProps {
   cartItems: CartItem[];
   onAdd: (item: CartItem) => void;
}

export default function NewArrivals(props: NewArrivalsProps) {
   const { newArrivals } = useSelector(newArrivalsRetriever);

   const { onAdd, cartItems } = props;

   const choosenProductHandler = (id: string) => {
      console.log("id==>", id);
      history.push(`/products/${id}`);
   };
   const history = useHistory();

   return (
      <div className="arrival-div">
         <Container className="arrival-big">
            <Stack>
               <Box className="category-title">New Arrivals</Box>
               <Stack className={"arrival-main"}>
                  {newArrivals.length !== 0 ? (
                     newArrivals.map((ele: Product) => {
                        const imagePath = `${serverApi}/${ele.productImages[0]}`;
                        const sizeVolume =
                           ele.productCollection === ProductCollection.KIDS
                              ? ele.productKids + " S"
                              : ele.productSize;
                        return (
                           <CssVarsProvider key={ele._id}>
                              <Card sx={{ width: 320 }}>
                                 <AspectRatio
                                    minHeight="350px"
                                    maxHeight="200px">
                                    <img src={imagePath} />
                                    <Button
                                       className={"arrival-btn-top"}
                                       variant="outlined"
                                       size="sm"
                                       color="neutral"
                                       aria-label="Explore Bahamas Islands"
                                       onClick={() => {
                                          choosenProductHandler(ele._id);
                                       }}
                                       sx={{
                                          ml: "auto",
                                          alignSelf: "center",
                                          fontWeight: 600,
                                       }}>
                                       Quick Review
                                    </Button>
                                 </AspectRatio>
                                 <CardContent
                                    className={"arrival-content"}
                                    orientation="horizontal">
                                    <div className={"arrival-mini-content"}>
                                       <Typography
                                          flexDirection={"row"}
                                          className={"arrivals-name"}
                                          level="body-xs">
                                          {ele.productName}
                                          <Typography
                                             sx={{
                                                paddingLeft: "15px",
                                                fontWeight: 1000,
                                                color: "red",
                                             }}>
                                             {sizeVolume}
                                          </Typography>
                                          <Typography
                                             className={"arrivals-views"}
                                             sx={{
                                                ml: "auto",
                                                alignSelf: "center",
                                                fontWeight: 600,
                                             }}>
                                             {ele.productViews}

                                             <VisibilityIcon />
                                          </Typography>
                                       </Typography>

                                       <Typography
                                          textColor={"black"}
                                          className={"arrivals-price"}
                                          fontSize="lg"
                                          fontWeight="lg">
                                          ${ele.productPrice}
                                       </Typography>
                                    </div>

                                    <Button
                                       className={"arrival-btn"}
                                       variant="outlined"
                                       size="md"
                                       color="danger"
                                       aria-label="Explore Bahamas Islands"
                                       onClick={(e) => {
                                          e.stopPropagation();
                                          sweetTopSmallSuccessAlert(
                                             "Added to Basket",
                                             1000,
                                          );

                                          onAdd({
                                             _id: ele._id,
                                             quantity: 1,
                                             name: ele.productName,
                                             price: ele.productPrice,
                                             image: ele.productImages[0],
                                          });
                                       }}
                                       sx={{
                                          ml: "auto",
                                          alignSelf: "center",
                                          fontWeight: 600,
                                       }}>
                                       Add Basket
                                    </Button>
                                 </CardContent>
                                 <Typography
                                    startDecorator={<RateReviewIcon />}>
                                    {ele.productDesc}
                                 </Typography>
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
