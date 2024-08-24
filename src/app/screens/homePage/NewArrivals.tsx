/** @format */

import { Box, Stack } from "@mui/material";
import { Container } from "@mui/material";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RateReviewIcon from "@mui/icons-material/RateReview";

import { CssVarsProvider } from "@mui/joy";

const clothes = [
   {
      clothesName: "Brand New",
      imagePath: "/images/men-5.jpg",
      price: "$2.9000",
   },
   {
      clothesName: "Brand New",
      imagePath: "/images/men-1.jpg",
      price: "$2.9000",
   },
   {
      clothesName: "Brand New",
      imagePath: "/images/men-7.jpg",
      price: "$2.9000",
   },
   {
      clothesName: "Brand New",
      imagePath: "/images/dior-bag.jpg",
      price: "$2.9000",
   },
];

export default function NewArrivals() {
   return (
      <div className="arrival-div">
         <Container className="arrival-big">
            <Stack>
               <Box className="category-title">New Arrivals</Box>
               <Stack className={"arrival-main"}>
                  {clothes.length !== 0 ? (
                     clothes.map((item, index) => {
                        return (
                           <CssVarsProvider>
                              <Card sx={{ width: 320 }}>
                                 <AspectRatio
                                    minHeight="350px"
                                    maxHeight="200px">
                                    <img src={item.imagePath} />
                                    <Button
                                       className={"arrival-btn-top"}
                                       variant="outlined"
                                       size="sm"
                                       color="neutral"
                                       aria-label="Explore Bahamas Islands"
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
                                          className={"arrivals-name"}
                                          level="body-xs">
                                          Brand New
                                          <Typography
                                             className={"arrivals-views"}
                                             sx={{
                                                ml: "auto",
                                                alignSelf: "center",
                                                fontWeight: 600,
                                             }}>
                                             20
                                             <VisibilityIcon />
                                          </Typography>
                                       </Typography>

                                       <Typography
                                          className={"arrivals-price"}
                                          fontSize="lg"
                                          fontWeight="lg">
                                          $2,900
                                       </Typography>
                                    </div>

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
                                 </CardContent>
                                 <Typography
                                    startDecorator={<RateReviewIcon />}>
                                    <p>This is good clothes</p>
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
