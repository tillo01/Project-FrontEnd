/** @format */

import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import {
   CardContent,
   CardCover,
   CssVarsProvider,
   Divider,
   Typography,
} from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrevialTopUsers } from "./selector";
import { serverApi } from "../../../libs/config";
import { Member } from "../../../libs/types/member";

const topUsersRetriever = createSelector(retrevialTopUsers, (topUsers) => ({
   topUsers,
}));

export default function ActiveUsers() {
   const { topUsers } = useSelector(topUsersRetriever);
   return (
      <div className="active-users-frame">
         <Container>
            <Stack className="main">
               <Box className="category-title">Active Users</Box>
               <Stack className="cards-frame">
                  {topUsers.length !== 0 ? (
                     topUsers.map((ele: Member) => {
                        const imagePath = `${serverApi}/${ele.memberImage}`;
                        return (
                           <CssVarsProvider key={ele._id}>
                              <Card className="card">
                                 <CardOverflow className="card-body">
                                    <AspectRatio ratio="1">
                                       <img
                                          src={imagePath}
                                          alt=""
                                       />
                                    </AspectRatio>
                                 </CardOverflow>

                                 <CardOverflow>
                                    <CardContent>
                                       <Typography
                                          className="users-detail"
                                          level="body-md"
                                          fontWeight="md"
                                          textColor="text.secondary">
                                          {ele.memberNick}
                                       </Typography>
                                    </CardContent>
                                 </CardOverflow>
                              </Card>
                           </CssVarsProvider>
                        );
                     })
                  ) : (
                     <Box className="no-data">No Active Users</Box>
                  )}
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
