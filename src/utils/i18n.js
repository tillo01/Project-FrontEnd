/** @format */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"; // Add this

i18n
   .use(Backend) // Use the backend to load translation files
   .use(initReactI18next)
   .init({
      backend: {
         loadPath: "/locales/{{lng}}/{{ns}}.json", // Correct place for loadPath
      },
      lng: "en", // Default language
      fallbackLng: "en", // Fallback language
      debug: true, // Enable debug mode
      supportedLngs: ["en", "kr"], // Supported languages
      interpolation: {
         escapeValue: false, // React already handles escaping
      },
   });

export default i18n;
