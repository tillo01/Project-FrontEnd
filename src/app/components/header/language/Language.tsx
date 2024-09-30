/** @format */

import React, { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import USFlag from "./english.jpg";
import KRFlag from "./korea.jpg";
import i18n from "../../../../utils/i18n"; // Assuming this is your i18n configuration file

// Map language codes to flag images
const flags = {
   en: USFlag,
   kr: KRFlag,
};

const LanguageDropdown = () => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
      localStorage.getItem("locale") || "en",
   );

   // Initialize language on component mount
   useEffect(() => {
      if (!localStorage.getItem("locale")) {
         localStorage.setItem("locale", "en");
         setSelectedLanguage("en");
      } else {
         const locale = localStorage.getItem("locale") || "en";
         setSelectedLanguage(locale);
         i18n.changeLanguage(locale); // Set initial language on load
      }
   }, []);

   const open = Boolean(anchorEl);

   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleMenuItemClick = (locale: string) => {
      setSelectedLanguage(locale);
      localStorage.setItem("locale", locale);
      console.log("--", i18n.language);

      i18n.changeLanguage(locale); //
      console.log("--", i18n.language);

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
               src={flags[selectedLanguage as keyof typeof flags]}
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
            <MenuItem onClick={() => handleMenuItemClick("en")}>
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
