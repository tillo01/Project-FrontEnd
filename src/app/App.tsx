/** @format */

import React, { useState } from "react";
import "../css/App.css";

import { Route, Switch, useLocation } from "react-router-dom";

import "../css/navbar.css";
import "../css/home.css";
import "../css/footer.css";
import HomeNavbar from "./components/header/HomeNavbar";
import OtherNavbar from "./components/header/OtherNavbar";
import ProductsPage from "./screens/ProductsPage";
import UserPage from "./screens/UserPage";
import HelpPage from "./screens/HelpPage";
import HomePage from "./screens/homePage";
import Footer from "./components/FooterPage";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../libs/sweetAlert";
import { Messages } from "../libs/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";
import "../utils/i18n";

function App() {
   const location = useLocation();
   const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
   const [signupOpen, setSignupOpen] = useState<boolean>(false);
   const [loginOpen, setLoginOpen] = useState<boolean>(false);
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
   const { setAuthMember } = useGlobals();

   const handleSignupClose = () => setSignupOpen(false);
   const handleLoginClose = () => setLoginOpen(false);

   const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
   };

   const handleCloseLogout = () => setAnchorEl(null);
   const handleLogoutRequest = async () => {
      try {
         const member = new MemberService();
         await member.logout();
         await sweetTopSuccessAlert("Logged Out", 700);
         setAuthMember(null);
      } catch (err) {
         console.log(err);
         sweetErrorHandling(Messages.error1);
      }
   };
   // HNADLERS

   return (
      <>
         {location.pathname === "/" ? (
            <HomeNavbar
               cartItems={cartItems}
               onAdd={onAdd}
               onRemove={onRemove}
               onDelete={onDelete}
               onDeleteAll={onDeleteAll}
               setSignupOpen={setSignupOpen}
               setLoginOpen={setLoginOpen}
               // anchor
               anchorEl={anchorEl}
               handleLogoutClick={handleLogoutClick}
               handleCloseLogout={handleCloseLogout}
               handleLogoutRequest={handleLogoutRequest}
               // anchor
            />
         ) : (
            <OtherNavbar
               cartItems={cartItems}
               onAdd={onAdd}
               onRemove={onRemove}
               onDelete={onDelete}
               onDeleteAll={onDeleteAll}
               setLoginOpen={setLoginOpen}
               setSignupOpen={setSignupOpen}
               // anchor
               anchorEl={anchorEl}
               handleLogoutClick={handleLogoutClick}
               handleCloseLogout={handleCloseLogout}
               handleLogoutRequest={handleLogoutRequest}
               // anchor
            />
         )}

         <Switch>
            <Route path="/products">
               <ProductsPage onAdd={onAdd} />
            </Route>

            <Route path="/member-page">
               <UserPage />
            </Route>
            <Route path="/help">
               <HelpPage />
            </Route>
            <Route path="/">
               <HomePage
                  onAdd={onAdd}
                  cartItems={cartItems}
               />
            </Route>
         </Switch>
         <Footer />
         <AuthenticationModal
            signupOpen={signupOpen}
            loginOpen={loginOpen}
            handleLoginClose={handleLoginClose}
            handleSignupClose={handleSignupClose}
         />
      </>
   );
}

export default App;
