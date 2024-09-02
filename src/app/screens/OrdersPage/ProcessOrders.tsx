/** @format */
import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import moment from "moment";

export default function ProcessOrders() {
   return (
      <TabPanel value="2">
         <Stack gap={4}>
            {[1, 2].map((ele, index) => {
               return (
                  <Box
                     key={index}
                     className="order-main-box">
                     {[1, 2, 3].map((ele1, index1) => {
                        return (
                           <Box
                              key={index1}
                              className="order-name-price">
                              <Box className="order-first-box">
                                 <img
                                    src="/images/dior-bag.jpg"
                                    className="orders-dish-img"
                                    alt="Dish"
                                 />
                                 <p className="title-dish">Lavash</p>
                              </Box>

                              <Box className="price-box">
                                 <p>10$</p>
                                 <img
                                    src="/icons/close.svg"
                                    alt="Close"
                                 />
                                 <p>2</p>
                                 <img
                                    src="/icons/pause.svg"
                                    alt="Pause"
                                 />
                                 <p style={{ marginLeft: "15px" }}>20$</p>
                              </Box>
                           </Box>
                        );
                     })}
                     <Box className="total-price-box">
                        <Box
                           className="box-total"
                           display="flex"
                           alignItems="center">
                           <p>Product Price</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              $60
                           </p>
                           <img
                              src="/icons/plus.svg"
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}
                              alt="Plus"
                           />
                           <p>Delivery cost</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              $5
                           </p>
                           <img
                              src="/icons/pause.svg"
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}
                              alt="Pause"
                           />
                           <p>Total</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              $65
                           </p>
                           <p className="data-moment">
                              {moment().format("YY-MM-DD HH:mm")}
                           </p>
                        </Box>

                        <Button
                           variant="contained"
                           color="success"
                           className="cancel-button">
                           VERIFY TO FULFILL
                        </Button>
                     </Box>
                  </Box>
               );
            })}

            {false && (
               <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}>
                  <img
                     src={"/icons/noimage-list.svg"}
                     style={{ width: "300px", height: "300px" }}
                  />
               </Box>
            )}
         </Stack>
      </TabPanel>
   );
}
