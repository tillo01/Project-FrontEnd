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
import { Logout } from "@mui/icons-material";
import LanguageDropdown from "./language/Language";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../libs/config";
interface OtherNavbarProps {
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
export default function OtherNavbar(props: OtherNavbarProps) {
   const {
      cartItems,
      onAdd,
      onRemove,
      onDelete,
      onDeleteAll,
      setSignupOpen,
      setLoginOpen,
      // handclik
      handleLogoutClick,
      anchorEl,
      handleCloseLogout,
      handleLogoutRequest,
   } = props;
   const { authMember } = useGlobals();

   return (
      <div className="other-navbar">
         <Stack className={"nav-language"}>
            <Box className={"language-section"}>
               <LanguageDropdown />

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
                        src="/icons/apron.svg"
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
                     <img
                        className="user-avatar"
                        src={
                           authMember?.memberImage
                              ? `${serverApi}/${authMember?.memberImage}`
                              : "/icons/default-user.svg"
                        }
                        alt="avatart"
                        aria-haspopup={"true"}
                        onClick={handleLogoutClick}

                        // img
                     />
                  )}
                  <Menu
                     id="account-menu"
                     anchorEl={anchorEl}
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
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
