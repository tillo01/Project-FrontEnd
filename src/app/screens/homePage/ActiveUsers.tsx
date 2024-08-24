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

const topUsers = [
   { isMemberName: "Kevin", imagePath: "/images/kevin.jpg" },
   { isMemberName: "Kevin", imagePath: "/images/men-5.jpg" },
   { isMemberName: "Kevin", imagePath: "/images/men-5.jpg" },
   { isMemberName: "Kevin", imagePath: "/images/men-5.jpg" },
];

export default function ActiveUsers() {
   return (
      <div className="active-users-frame">
         <Container>
            <Stack className="main">
               <Box className="category-title">Active Users</Box>
               <Stack className="cards-frame">
                  {topUsers.length !== 0 ? (
                     topUsers.map((ele, index) => {
                        return (
                           <CssVarsProvider>
                              <Card className="card">
                                 <CardOverflow className="card-body">
                                    <AspectRatio ratio="1">
                                       <img
                                          src={ele.imagePath}
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
                                          {ele.isMemberName}
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
