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
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { Logout } from "@mui/icons-material";
import LanguageDropdown from "./language/Language";
import { CartItem } from "../../../libs/types/search";
interface OtherNavbarProps {
   cartItems: CartItem[];
}
export default function OtherNavbar(props: OtherNavbarProps) {
   const { cartItems } = props;
   const authMember = null;

   return (
      <div className="other-navbar">
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

         <Container className="navbar-container">
            <Stack className="menu">
               <Box>
                  <NavLink to={"/"}>
                     <img
                        className="brand-logo"
                        src="/icons/aura.png"
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

                  <Basket cartItems={cartItems} />
                  {!authMember ? (
                     <Box>
                        <Button
                           variant="contained"
                           className="login-button">
                           Login
                        </Button>
                     </Box>
                  ) : (
                     <img
                        className="user-avatar"
                        src="/icons/default-user.svg"
                        alt="avatart"
                        aria-haspopup={"true"}
                        // img
                     />
                  )}
                  <Menu
                     id="account-menu"
                     open={Boolean()}
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
                     <MenuItem>
                        <ListItemIcon>
                           <Logout
                              fontSize="small"
                              style={{ color: "blue" }}
                           />
                        </ListItemIcon>
                        Logout
                     </MenuItem>
                  </Menu>
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
