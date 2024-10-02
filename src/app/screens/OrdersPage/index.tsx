/** @format */

import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, colors, Button } from "@mui/material";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../css/order.css";

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
import { Messages, serverApi } from "../../../libs/config";
import { MemberType } from "../../../libs/enums/member.enum";
import { T } from "../../../libs/types/common";
import { MemberUpdateInput } from "../../../libs/types/member";
import MemberService from "../../services/MemberService";
import {
   sweetErrorHandling,
   sweetTopSmallSuccessAlert,
} from "../../../libs/sweetAlert";

const actionDispatch = (dispatch: Dispatch) => ({
   setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
   setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
   setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
   const { setPausedOrders, setProcessOrders, setFinishedOrders } =
      actionDispatch(useDispatch());
   const { orderBuilder, authMember, setAuthMember } = useGlobals();
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

   const [memberUpdateInput, setMemberUpdateInput] =
      useState<MemberUpdateInput>({
         memberNick: authMember?.memberNick,
         memberPhone: authMember?.memberPhone,
         memberAddress: authMember?.memberAddress,
         memberDesc: authMember?.memberDesc,
         memberImage: authMember?.memberImage,
         memberCardHolder: authMember?.memberCardHolder,
         memberCardNumber: authMember?.memberCardNumber,
         memberCardExpiry: authMember?.memberCardExpiry,
         memberCardCVV: authMember?.memberCardCVV,
      });

   // HANDLERS

   const memberCardHolder = (e: T) => {
      memberUpdateInput.memberCardHolder = e.target.value;
      setMemberUpdateInput({ ...memberUpdateInput });
   };
   const memberCardNumber = (e: T) => {
      memberUpdateInput.memberCardNumber = e.target.value;
      setMemberUpdateInput({ ...memberUpdateInput });
   };
   const memberCardExpiry = (e: T) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 4) {
         value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      memberUpdateInput.memberCardExpiry = value;
      setMemberUpdateInput({ ...memberUpdateInput });
   };
   const memberCardCVV = (e: T) => {
      memberUpdateInput.memberCardCVV = e.target.value;
      setMemberUpdateInput({ ...memberUpdateInput });
   };

   const submitButton = async () => {
      if (!authMember) throw new Error(Messages.error2);
      try {
         if (
            memberUpdateInput.memberCardExpiry === "" ||
            memberUpdateInput.memberCardHolder === "" ||
            memberUpdateInput.memberCardNumber === "" ||
            memberUpdateInput.memberCardCVV === ""
         ) {
            throw new Error(Messages.error3);
         }

         const member = new MemberService();
         const result = await member.updateMember(memberUpdateInput);
         setAuthMember(result);
         await sweetTopSmallSuccessAlert("Modified Successfully", 1000);
      } catch (err) {
         sweetErrorHandling(err).then();
      }
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
                        <PausedOrders setValue={setValue} />
                        <ProcessOrders setValue={setValue} />
                        <FinishedOrders setValue={setValue} />
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
                                 src={
                                    authMember?.memberImage
                                       ? `${serverApi}/${authMember.memberImage}`
                                       : "/icons/default-user.svg"
                                 }
                                 className={"order-user-avatar"}
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
                              <span className="user-name">
                                 {authMember?.memberNick}
                              </span>
                              <p className="user-user">
                                 {authMember?.memberType}
                              </p>
                           </Box>
                        </Box>
                        <Box className="liner"></Box>
                        <Box className="order-user-adress">
                           <div className="location-order">
                              <LocationOnIcon />
                              {authMember?.memberAddress
                                 ? authMember.memberAddress
                                 : "no adress"}
                           </div>
                        </Box>
                     </Box>
                  </Stack>

                  <div className="box-sh">
                     <Stack className="order-right">
                        <Stack
                           className="order-right-inputs"
                           gap={2}>
                           <Box>
                              <input
                                 className="card-input"
                                 type="text"
                                 name="memberCardNumber"
                                 maxLength={9}
                                 placeholder={
                                    memberUpdateInput?.memberCardNumber
                                 }
                                 value={memberUpdateInput.memberCardNumber}
                                 onChange={memberCardNumber}
                              />
                           </Box>
                           <Box className="small-input">
                              <input
                                 type="text"
                                 name="memberCardExpiry"
                                 maxLength={4}
                                 placeholder={
                                    memberUpdateInput.memberCardExpiry
                                 }
                                 value={memberUpdateInput.memberCardExpiry}
                                 onChange={memberCardExpiry}
                              />
                              <input
                                 type="text"
                                 name="memberCardCVV"
                                 maxLength={3}
                                 placeholder={memberUpdateInput?.memberCardCVV}
                                 value={memberUpdateInput.memberCardCVV}
                                 onChange={memberCardCVV}
                              />
                           </Box>
                           <Box>
                              <input
                                 className="card-input"
                                 type="text"
                                 placeholder={
                                    memberUpdateInput?.memberCardHolder
                                 }
                                 name="memberCardHolder"
                                 value={memberUpdateInput.memberCardHolder}
                                 onChange={memberCardHolder}
                              />
                           </Box>
                           <Box className="types-card">
                              <img src={"/icons/visa-card.svg"} />
                              <img src={"/icons/western-card.svg"} />
                              <img src={"/icons/master-card.svg"} />
                              <img src={"/icons/paypal-card.svg"} />
                           </Box>
                           <Box>
                              <Button
                                 variant="contained"
                                 color="success"
                                 onClick={submitButton}>
                                 Save Card
                              </Button>
                           </Box>
                        </Stack>
                     </Stack>
                  </div>
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
