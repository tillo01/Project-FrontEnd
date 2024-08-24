/** @format */

/** @format */

import { Container, Stack } from "@mui/material";
import { Box, Typography, Button } from "@mui/material";
import CountdownTimer from "./Counter";

const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

const discountImg = [
   {
      imagePath: "/images/men-6.jpg",
      title: "Basic Leather Sneaker",
      oldPrice: "$92.50",
      newPrice: "$88.00",
   },
   {
      imagePath: "/images/men-7.jpg",
      title: "Classic Trucker Hat",
      oldPrice: "$48.50",
      newPrice: "$45.00",
   },
];

export default function DiscountPage() {
   return (
      <Container>
         <Stack className={"daily-deals-big"}>
            <Box className="category-title"> Daily Deals </Box>
            <Stack className={"daily-deals-main"}>
               {discountImg.map((item, index) => (
                  <Stack
                     className={"daily-deals-secondary"}
                     key={index}
                     direction="row"
                     spacing={2}>
                     <Box className={"daily-deals-box"}>
                        <img
                           src={item.imagePath}
                           alt={item.title}
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

                        <CountdownTimer endDate={endDate} />

                        <Typography
                           variant="h5"
                           sx={{ fontWeight: "bold" }}>
                           {item.title}
                        </Typography>

                        <Box className={"daily-deals-pricebox"}>
                           <Typography
                              variant="body2"
                              sx={{
                                 textDecoration: "line-through",
                                 color: "gray",
                              }}>
                              {item.oldPrice}
                           </Typography>
                           <Typography
                              variant="h5"
                              sx={{ color: "red", fontWeight: "bold" }}>
                              {item.newPrice}
                           </Typography>
                        </Box>

                        <Button
                           variant="outlined"
                           color="error">
                           Buy Now
                        </Button>
                     </Stack>
                  </Stack>
               ))}
            </Stack>
         </Stack>
      </Container>
   );
}
