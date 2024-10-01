/** @format */

import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, colors } from "@mui/material";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../css/order.css";
import "../../../css/userPage.css";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { OrderStatus } from "../../../libs/enums/order.enum";
import { Order, OrderInquiry } from "../../../libs/types/orders";
import { Settings } from "@mui/icons-material";
import { serverApi } from "../../../libs/config";
import { MemberType } from "../../../libs/enums/member.enum";

const actionDispatch = (dispatch: Dispatch) => ({
   setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
   setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
   setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
   const { setPausedOrders, setProcessOrders, setFinishedOrders } =
      actionDispatch(useDispatch());
   const { orderBuilder, authMember } = useGlobals();
   const history = useHistory();

   const [value, setValue] = useState("1");
   const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
      page: 1,
      limit: 5,
      orderStatus: OrderStatus.PAUSE,
   });

   useEffect(() => {
      const order = new OrderService();

      order
         .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
         .then((data) => setPausedOrders(data))
         .catch((err) => console.log(err));

      order
         .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
         .then((data) => setProcessOrders(data))
         .catch((err) => console.log(err));

      order
         .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
         .then((data) => setFinishedOrders(data))
         .catch((err) => console.log(err));
   }, [orderInquiry, orderBuilder]);

   const handleChange = (e: SyntheticEvent, newValue: string) => {
      setValue(newValue);
   };
   if (!authMember) {
      history.push("/");
   }

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
                        <PausedOrders setValue={setValue} />
                        <ProcessOrders setValue={setValue} />
                        <FinishedOrders setValue={setValue} />
                     </Stack>
                  </TabContext>
               </Stack>

               <div className={"user-page"}>
                  <Container>
                     <Stack className={"my-page-frame"}>
                        <Stack className={"my-page-left"}></Stack>

                        <Stack className={"my-page-right"}>
                           <Box className={"order-info-box"}>
                              <Box
                                 display={"flex"}
                                 flexDirection={"column"}
                                 alignItems={"center"}>
                                 <div className={"order-user-img"}>
                                    <img
                                       src={
                                          authMember?.memberImage
                                             ? `${serverApi}/${authMember.memberImage}`
                                             : "/icons/default-user.svg"
                                       }
                                       className={"order-user-avatar"}
                                    />
                                    <div className={"order-user-icon-box"}>
                                       <img
                                          src={
                                             authMember?.memberType ===
                                             MemberType.SHOPOWNER
                                                ? "/icons/restaurant.svg"
                                                : "/icons/user-badge.svg"
                                          }
                                       />
                                    </div>
                                 </div>
                                 <span className={"order-user-name"}>
                                    {authMember?.memberNick}
                                 </span>
                                 <span className={"order-user-prof"}>
                                    {authMember?.memberType}
                                 </span>
                                 <span className={"order-user-prof"}>
                                    {authMember?.memberAddress
                                       ? authMember.memberAddress
                                       : "no adress"}
                                 </span>
                              </Box>
                              <Box className={"user-media-box"}>
                                 <FacebookIcon />
                                 <InstagramIcon />
                                 <TelegramIcon />
                                 <YouTubeIcon />
                              </Box>
                              <p className={"user-desc"}>
                                 {authMember?.memberDesc
                                    ? authMember.memberDesc
                                    : "no description"}
                                 No description
                              </p>
                           </Box>
                        </Stack>
                     </Stack>
                  </Container>
               </div>
            </Stack>
         </Container>
      </div>
   );
}
