/** @format */

import { Box, Button, Container, Stack } from "@mui/material";

import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import LanguageDropdown from "./language/Language";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartItem } from "../../../libs/types/search";

interface HomeNavbarProps {
   cartItems: CartItem[];
   onAdd: (item: CartItem) => void;
   onRemove: (item: CartItem) => void;
   onDelete: (item: CartItem) => void;
   onDeleteAll: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
   const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;

   const authMember = true;
   useEffect(() => {
      AOS.init({
         duration: 1500, // Customize the animation duration
      });
   }, []);

   return (
      <div className={"home-navbar"}>
         <Stack className={"nav-language"}>
            <Box className={"language-section"}>
               <LanguageDropdown />

               <p className={"call-us"}>
                  Call-Us <a href="01023616727">01023616727</a>
               </p>
               <Box className={"discount"}>
                  <p>
                     Ends Monday: $100 off any dining table + 2 sets of chairs.
                     Shop Now
                  </p>
               </Box>
            </Box>
         </Stack>
         <Container className={"navbar-container"}>
            <Stack className={"menu"}>
               <Box>
                  <NavLink to={"/"}>
                     <img
                        className={"brand-logo"}
                        src="/icons/aura.png
                        "
                        alt="Logo"
                     />
                  </NavLink>
               </Box>

               <Stack className="links">
                  <Box className={"hover-line"}>
                     <NavLink to={"/"}>Home</NavLink>
                  </Box>
                  <Box className={"hover-line"}>
                     <NavLink
                        to={"/products"}
                        activeClassName="underline">
                        Products
                     </NavLink>
                  </Box>

                  {authMember ? (
                     <Box className={"hover-line"}>
                        <NavLink
                           to={"/orders"}
                           activeClassName="underline">
                           Orders
                        </NavLink>
                     </Box>
                  ) : null}
                  {authMember ? (
                     <Box className={"hover-line"}>
                        <NavLink
                           to={"/member-page"}
                           activeClassName="underline">
                           My Page
                        </NavLink>
                     </Box>
                  ) : null}
                  <Box className={"hover-line"}>
                     <NavLink
                        to={"/help"}
                        activeClassName="underline">
                        Help
                     </NavLink>
                  </Box>

                  {/* BASKET */}
                  <Basket
                     cartItems={cartItems}
                     onAdd={onAdd}
                     onRemove={onRemove}
                     onDelete={onDelete}
                     onDeleteAll={onDeleteAll}
                  />

                  {authMember ? (
                     <Box>
                        <Button
                           variant="contained"
                           className="login-button">
                           Login
                        </Button>
                     </Box>
                  ) : (
                     // img
                     <img
                        className="user-avatar"
                        src="/icons/default-user.svg"
                        aria-haspopup={"true"}

                        // img
                     />
                  )}
                  {/* menu logout btn */}

                  {/* menu */}
               </Stack>
            </Stack>
         </Container>

         <Stack className={"home-bg"}>
            <Stack className="header-frame">
               <Stack className="detail">
                  <Box
                     className="head-main-txt"
                     data-aos="fade-up"
                     data-aos-anchor-placement="bottom-bottom"
                     data-aos-offset="300"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-sine"
                     data-aos-delay="500">
                     Nothing but more than Quality and Elegency
                  </Box>
                  <Box
                     className="service-txt"
                     data-aos="fade-up"
                     data-aos-anchor-placement="bottom-bottom"
                     data-aos-duration="2000"
                     data-aos-delay="1500">
                     Where Luxury Meets Timeless Beauty
                  </Box>
                  <Box className="sign-up">
                     {authMember ? (
                        <Button
                           variant={"contained"}
                           className="signup-button"
                           data-aos="fade-up"
                           data-aos-anchor-placement="bottom-bottom"
                           data-aos-duration="5000"
                           data-aos-delay="2000">
                           SIGN UP
                        </Button>
                     ) : null}
                  </Box>
               </Stack>
            </Stack>
         </Stack>
      </div>
   );
}
