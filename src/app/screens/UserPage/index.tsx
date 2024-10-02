/** @format */

import { Box, Button, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import "../../../css/userPage.css";

import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberType } from "../../../libs/enums/member.enum";
import { Messages, serverApi } from "../../../libs/config";
import { MemberUpdateInput } from "../../../libs/types/member";
import { useState } from "react";
import { T } from "../../../libs/types/common";
import MemberService from "../../services/MemberService";
import {
   sweetErrorHandling,
   sweetTopSmallSuccessAlert,
} from "../../../libs/sweetAlert";

export default function UserPage() {
   const { authMember, setAuthMember } = useGlobals();

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
   const history = useHistory();
   if (!authMember) {
      history.push("/");
   }
   return (
      <div className={"user-page"}>
         <Container>
            <Stack className={"my-page-frame"}>
               <Stack className={"my-page-left"}>
                  <Box
                     display={"flex"}
                     flexDirection={"column"}>
                     <Box className={"menu-name"}>Modify Member Details</Box>
                     <Box className={"menu-content"}>
                        <Settings />
                     </Box>
                  </Box>
               </Stack>

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
