/** @format */

import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import USFlag from "./english.jpg";
import KRFlag from "./korea.jpg";

// Map language codes to flag images
const flags = {
   en: USFlag,
   kr: KRFlag,
};
// This is the handler

const LanguageDropdown = () => {
   const [anchorEl, setAnchorEl] = useState(null);

   const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
   const open = Boolean(anchorEl);

   const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleMenuItemClick = (language: any) => {
      setSelectedLanguage(language);
      handleClose();
   };

   return (
      <Box>
         <IconButton
            aria-controls={open ? "language-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}>
            <img
               // @ts-ignore
               src={flags[selectedLanguage]}
               alt={`${selectedLanguage} Flag`}
               style={{ width: "24px", marginRight: "8px" }}
            />
            <ArrowDropDownIcon style={{ color: "gray" }} />
         </IconButton>
         <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}>
            <MenuItem
               onClick={() => handleMenuItemClick("en")}
               className={"lang-text"}>
               English
            </MenuItem>

            <MenuItem onClick={() => handleMenuItemClick("kr")}>
               Korean
            </MenuItem>
         </Menu>
      </Box>
   );
};

export default LanguageDropdown;
