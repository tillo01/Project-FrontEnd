/** @format */

import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box, colors } from "@mui/material";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../css/order.css";

export default function OrdersPage() {
   const [value, setValue] = useState("1");

   const handleChange = (e: SyntheticEvent, newValue: string) => {
      setValue(newValue);
   };

   return (
      <div className="order-page">
         <Container className="order-container">
            <Stack className="order-big-box">
               <Stack className="order-left">
                  <TabContext value={value}>
                     <Box className="order-frame-nav">
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                           <Tabs
                              value={value}
                              onChange={handleChange}
                              aria-label="basic-tabs-example"
                              className="table_list">
                              <Tab
                                 label="PAUSED ORDERS"
                                 value={"1"}
                              />
                              <Tab
                                 label="PROCESS ORDERS"
                                 value={"2"}
                              />
                              <Tab
                                 label="FINISHED ORDERS"
                                 value={"3"}
                              />
                           </Tabs>
                        </Box>
                     </Box>
                     <Stack className="order-main-content">
                        <PausedOrders />
                        <ProcessOrders />
                        <FinishedOrders />
                     </Stack>
                  </TabContext>
               </Stack>

               <Stack
                  className="right-user-box"
                  gap={4}>
                  <Stack className="order-right">
                     <Box className="order-info-box">
                        <Box className="member-box">
                           <div className="order-user-img">
                              <img
                                 src={"/icons/default-user.svg"}
                                 className="order-user-avatar"
                                 alt=""
                              />
                              <div className="order-user-icon-box">
                                 <img
                                    src={"/icons/user-badge.svg"}
                                    className="order-user-prof-img"
                                    alt=""
                                 />
                              </div>
                           </div>

                           <Box className="names">
                              <span className="user-name">Martin</span>
                              <p className="user-user">User</p>
                           </Box>
                        </Box>
                        <Box className="liner"></Box>
                        <Box className="order-user-adress">
                           <div className="location-order">
                              <LocationOnIcon />
                              South Korea , Busan
                           </div>
                        </Box>
                     </Box>
                  </Stack>

                  <Stack className="order-right">
                     <Stack
                        className="order-right-inputs"
                        gap={2}>
                        <Box>
                           <input
                              className="card-input"
                              type="text"
                              placeholder="Card number : 5243 4090 2002 7495"
                           />
                        </Box>
                        <Box className="small-input">
                           <input
                              type="text"
                              placeholder="07 / 24"
                           />
                           <input
                              type="text"
                              placeholder="CVV / 010"
                           />
                        </Box>
                        <Box>
                           <input
                              className="card-input"
                              type="text"
                              placeholder="Justin Roberston"
                           />
                        </Box>
                        <Box className="types-card">
                           <img src={"/icons/visa-card.svg"} />
                           <img src={"/icons/western-card.svg"} />
                           <img src={"/icons/master-card.svg"} />
                           <img src={"/icons/paypal-card.svg"} />
                        </Box>
                     </Stack>
                  </Stack>
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
