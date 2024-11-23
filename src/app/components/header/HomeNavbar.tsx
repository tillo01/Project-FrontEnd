/** @format */

import {
   Box,
   Button,
   Container,
   ListItemIcon,
   Menu,
   MenuItem,
   Stack,
} from "@mui/material";

import React, { useEffect, useTransition } from "react";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import LanguageDropdown from "./language/Language";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../libs/config";
import { useTranslation } from "react-i18next";
import { Logout } from "@mui/icons-material";
import productImage from "./assets/icons/icons/default-user.svg";

interface HomeNavbarProps {
   cartItems: CartItem[];
   onAdd: (item: CartItem) => void;
   onRemove: (item: CartItem) => void;
   onDelete: (item: CartItem) => void;
   onDeleteAll: () => void;
   setSignupOpen: (isOpen: boolean) => void;
   setLoginOpen: (isOpen: boolean) => void;

   handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
   anchorEl: HTMLElement | null;
   handleCloseLogout: () => void;
   handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
   const {
      cartItems,
      onAdd,
      onRemove,
      onDelete,
      onDeleteAll,
      setSignupOpen,
      setLoginOpen,
      handleLogoutClick,
      anchorEl,
      handleCloseLogout,
      handleLogoutRequest,
   } = props;

   useEffect(() => {
      AOS.init({
         duration: 1500, // Customize the animation duration
      });
   }, []);
   const { authMember } = useGlobals();
   const { t } = useTranslation();
   console.log("+++", t);

   return (
      <div className={"home-navbar"}>
         <Stack className={"nav-language"}>
            <Box className={"language-section"}>
               <LanguageDropdown />

               <p className={"call-us"}>
                  {t("Call-Us")} <a href="01023616727">01023616727</a>
               </p>
               <Box className={"discount"}>
                  <p>
                     {t(
                        " Ends Monday $100 off any dining table + 2 sets of chairs Shop Now",
                     )}
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
                     <NavLink to={"/"}>{t("Home")}</NavLink>
                  </Box>
                  <Box className={"hover-line"}>
                     <NavLink
                        to={"/products"}
                        activeClassName="underline">
                        {t("Products")}
                     </NavLink>
                  </Box>

                  {authMember ? (
                     <Box className={"hover-line"}>
                        <NavLink
                           to={"/orders"}
                           activeClassName="underline">
                           {t("Orders")}
                        </NavLink>
                     </Box>
                  ) : null}
                  {authMember ? (
                     <Box className={"hover-line"}>
                        <NavLink
                           to={"/member-page"}
                           activeClassName="underline">
                           {t("MyPage")}
                        </NavLink>
                     </Box>
                  ) : null}
                  <Box className={"hover-line"}>
                     <NavLink
                        to={"/help"}
                        activeClassName="underline">
                        {t("Help")}
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

                  {!authMember ? (
                     <Box>
                        <Button
                           variant="contained"
                           className="login-button"
                           onClick={() => setLoginOpen(true)}>
                           Login
                        </Button>
                     </Box>
                  ) : (
                     // img
                     <img
                        className="user-avatar"
                        src={
                           authMember?.memberImage
                              ? `${serverApi}/${authMember?.memberImage}`
                              : productImage
                        }
                        aria-haspopup={"true"}
                        onClick={handleLogoutClick}

                        // img
                     />
                  )}
                  {/* menu logout btn */}
                  <Menu
                     anchorEl={anchorEl}
                     id="account-menu"
                     open={Boolean(anchorEl)}
                     onClose={handleCloseLogout}
                     onClick={handleCloseLogout}
                     PaperProps={{
                        elevation: 0,
                        sx: {
                           overflow: "visible",
                           filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                           mt: 1.5,
                           "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                           },
                           "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                           },
                        },
                     }}
                     transformOrigin={{ horizontal: "right", vertical: "top" }}
                     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                     <MenuItem onClick={handleLogoutRequest}>
                        <ListItemIcon>
                           <Logout
                              fontSize="small"
                              style={{ color: "blue" }}
                           />
                        </ListItemIcon>
                        Logout
                     </MenuItem>
                  </Menu>
                  {/* menu */}

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
                     {t("Nothing but more than Quality and Elegency")}
                  </Box>
                  <Box
                     className="service-txt"
                     data-aos="fade-up"
                     data-aos-anchor-placement="bottom-bottom"
                     data-aos-duration="2000"
                     data-aos-delay="1500">
                     {t("Where Luxury Meets Timeless Beauty")}
                  </Box>
                  <Box className="sign-up">
                     {!authMember ? (
                        <Button
                           variant={"contained"}
                           className="signup-button"
                           data-aos="fade-up"
                           data-aos-anchor-placement="bottom-bottom"
                           data-aos-duration="5000"
                           data-aos-delay="2000"
                           onClick={() => setSignupOpen(true)}>
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
