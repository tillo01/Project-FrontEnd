/** @format */
import React from "react";
import { Box, Stack } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DiscountIcon from "@mui/icons-material/Discount";
import { Container } from "@mui/system";

function ServicePage() {
   return (
      <div className={"service-frame"}>
         <Container>
            <Stack className={"service-main"}>
               <Stack>
                  <Stack className={"service-box"}>
                     <Box className={"shipping-box"}>
                        <LocalShippingIcon className="car-icon" />
                        <Box className={"shipping-title"}>
                           <p className={"free-up-tex"}>Free Shipping</p>
                           <p className={"free-sub-tex"}>
                              Free shipping on all order
                           </p>
                        </Box>
                     </Box>

                     <Box className={"shipping-box"}>
                        <SupportAgentIcon className="car-icon" />
                        <Box className={"shipping-title"}>
                           <p className={"free-up-tex"}>SUPPORT 24/7</p>
                           <p className={"free-sub-tex"}>
                              Support 24 hours a day
                           </p>
                        </Box>
                     </Box>

                     <Box className={"shipping-box"}>
                        <CurrencyExchangeIcon className="car-icon" />
                        <Box className={"shipping-title"}>
                           <p className={"free-up-tex"}>Money Return</p>
                           <p className={"free-sub-tex"}>
                              Back guarantee under 5 days
                           </p>
                        </Box>
                     </Box>

                     <Box className={"shipping-box"}>
                        <DiscountIcon className="car-icon" />
                        <Box className={"shipping-title"}>
                           <p className={"free-up-tex"}>Order Discount</p>
                           <p className={"free-sub-tex"}>
                              Onevery order over $150
                           </p>
                        </Box>
                     </Box>
                  </Stack>
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}

export default ServicePage;
