/** @format */

import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

const CountdownTimer: React.FC<{ endDate: Date }> = ({ endDate }) => {
   const calculateTimeLeft = () => {
      const difference = +endDate - +new Date();
      let timeLeft = {
         days: "00",
         hours: "00",
         minutes: "00",
         seconds: "00",
      };

      if (difference > 0) {
         timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString(),
            hours: Math.floor(
               (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            ).toString(),
            minutes: Math.floor(
               (difference % (1000 * 60 * 60)) / (1000 * 60),
            ).toString(),
            seconds: Math.floor((difference % (1000 * 60)) / 1000).toString(),
         };
      } else {
         return "Daily Deals are hasn`t posted yet";
      }

      return timeLeft;
   };

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      const timer = setTimeout(() => {
         setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
   });

   if (typeof timeLeft === "string") {
      return (
         <Typography
            variant="body2"
            color="error"
            sx={{ marginTop: 2 }}>
            {timeLeft}
         </Typography>
      );
   }

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 1,
         }}>
         <Box
            sx={{ textAlign: "center", width: "50px" }}
            flexDirection={"column"}
            border={1}
            borderColor="grey.300"
            borderRadius={2}>
            <Typography
               variant="h6"
               sx={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
               {timeLeft.days}
            </Typography>
            <Typography
               variant="caption"
               sx={{ fontSize: "0.875rem" }}>
               Days
            </Typography>
         </Box>
         <Box
            sx={{ textAlign: "center", width: "50px" }}
            flexDirection={"column"}
            border={1}
            borderColor="grey.300"
            borderRadius={2}>
            <Typography
               variant="h6"
               sx={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
               {timeLeft.hours}
            </Typography>
            <Typography
               variant="caption"
               sx={{ fontSize: "0.875rem" }}>
               Hours
            </Typography>
         </Box>
         <Box
            sx={{ textAlign: "center", width: "50px" }}
            flexDirection={"column"}
            border={1}
            borderColor="grey.300"
            borderRadius={2}>
            <Typography
               variant="h6"
               sx={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
               {timeLeft.minutes}
            </Typography>
            <Typography
               variant="caption"
               sx={{ fontSize: "0.875rem" }}>
               Min
            </Typography>
         </Box>
         <Box
            sx={{ textAlign: "center", width: "50px" }}
            flexDirection={"column"}
            border={1}
            borderColor="grey.300"
            borderRadius={2}>
            <Typography
               variant="h6"
               sx={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
               {timeLeft.seconds}
            </Typography>
            <Typography
               variant="caption"
               sx={{ fontSize: "0.875rem" }}>
               Sec
            </Typography>
         </Box>
      </Box>
   );
};

export default CountdownTimer;
