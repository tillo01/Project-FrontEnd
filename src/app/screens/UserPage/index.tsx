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
import { serverApi } from "../../../libs/config";

export default function UserPage() {
   const history = useHistory();
   const { authMember } = useGlobals();
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
                           <Button variant="contained">Save Card</Button>
                        </Stack>
                     </Stack>
                  </Box>
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
