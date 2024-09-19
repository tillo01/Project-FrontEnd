/** @format */

import { Container, Stack } from "@mui/material";
import { Box, Typography, Button } from "@mui/material";
import CountdownTimer from "./Counter";

import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrevialDailyDeals } from "./selector";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";

const dailyDealsRetriever = createSelector(
   retrevialDailyDeals,
   (dailyDeals) => ({ dailyDeals }),
);

export default function DiscountPage() {
   const { dailyDeals } = useSelector(dailyDealsRetriever);

   return (
      <Container>
         <Stack className={"daily-deals-big"}>
            <Box className="category-title"> Daily Deals </Box>
            <Stack className={"daily-deals-main"}>
               {dailyDeals.length !== 0 ? (
                  dailyDeals.map((ele: Product) => {
                     const imagePath = `${serverApi}/${ele.productImages[0]}`;
                     return (
                        <Stack
                           className={"daily-deals-secondary"}
                           key={ele._id}
                           direction="row"
                           spacing={2}>
                           <Box className={"daily-deals-box"}>
                              <img
                                 src={imagePath}
                                 alt={ele.productName}
                              />
                           </Box>

                           <Stack
                              spacing={2}
                              sx={{ width: "250px" }}>
                              <Typography
                                 variant="h6"
                                 sx={{ fontWeight: "bold" }}>
                                 HURRY UP ! OFFER ENDS IN:
                              </Typography>

                              <CountdownTimer
                                 endDate={new Date(ele.productExpiryDate)}
                              />

                              <Typography
                                 variant="h5"
                                 sx={{ fontWeight: "bold" }}>
                                 {ele.productName}
                              </Typography>

                              <Box className={"daily-deals-pricebox"}>
                                 <Typography
                                    variant="body2"
                                    sx={{
                                       textDecoration: "line-through",
                                       color: "gray",
                                    }}>
                                    {ele.productPrice}
                                 </Typography>
                                 <Typography
                                    variant="h5"
                                    sx={{ color: "red", fontWeight: "bold" }}>
                                    {ele.productDiscount}
                                 </Typography>
                              </Box>

                              <Button
                                 variant="outlined"
                                 color="error">
                                 Buy Now
                              </Button>
                           </Stack>
                        </Stack>
                     );
                  })
               ) : (
                  <Box className="no-data">New Arrivals are not available</Box>
               )}
            </Stack>
         </Stack>
      </Container>
   );
}
