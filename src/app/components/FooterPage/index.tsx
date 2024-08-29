/** @format */

import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../../css/footer.css";

const Footers = styled.div`
   width: 100%;
   height: 590px;
   display: flex;
   background: #343434;
   background-size: cover;
`;

export default function Footer() {
   const authMember = true;

   return (
      <Footers>
         <Container>
            <Stack
               flexDirection={"row"}
               sx={{ mt: "94px" }}>
               <Stack
                  flexDirection={"column"}
                  style={{ width: "340px" }}>
                  <Box>
                     <img
                        width={"50x"}
                        src={"/icons/aura.png"}
                     />
                  </Box>
                  <Box className={"foot-desc-txt"}>
                     Focusing on contemporary fashion for the youth, Trendline
                     Apparel aims to redefine urban style. Trendline Apparel
                     creates a statement with its collections.
                  </Box>
                  <Box className="sns-context">
                     <img src={"/icons/facebook.svg"} />
                     <img src={"/icons/twitter.svg"} />
                     <img src={"/icons/instagram.svg"} />
                     <img src={"/icons/youtube.svg"} />
                  </Box>
               </Stack>
               <Stack
                  sx={{ ml: "288px" }}
                  flexDirection={"row"}>
                  <Stack>
                     <Box>
                        <Box className={"foot-category-title"}>Sections</Box>
                        <Box className={"foot-category-link"}>
                           <Link to="/">Home</Link>
                           <Link to="/products">Products</Link>
                           {authMember && <Link to="/orders">Orders</Link>}
                           <Link to="/help">Help</Link>
                        </Box>
                     </Box>
                  </Stack>
                  <Stack sx={{ ml: "100px" }}>
                     <Box>
                        <Box className={"foot-category-title"}>Find us</Box>
                        <Box
                           flexDirection={"column"}
                           sx={{ mt: "20px" }}
                           className={"foot-category-link"}
                           justifyContent={"space-between"}>
                           <Box
                              flexDirection={"row"}
                              className={"find-us"}>
                              <span>L.</span>
                              <div>South Korea, Busan</div>
                           </Box>
                           <Box className={"find-us"}>
                              <span>P.</span>
                              <div>+82 10 4344 5411</div>
                           </Box>
                           <Box className={"find-us"}>
                              <span>E.</span>
                              <div>chicaura@gmail.com</div>
                           </Box>
                           <Box className={"find-us"}>
                              <span>H.</span>
                              <div>Visit 24 hours</div>
                           </Box>
                        </Box>
                     </Box>
                  </Stack>
               </Stack>
            </Stack>
            <Stack
               style={{
                  border: "1px solid #C5C8C9",
                  width: "100%",
                  opacity: "0.2",
               }}
               sx={{ mt: "80px" }}></Stack>
            <Stack className={"copyright-txt"}>
               © Copyright Chic-Aura , All rights reserved.
            </Stack>
         </Container>
      </Footers>
   );
}
