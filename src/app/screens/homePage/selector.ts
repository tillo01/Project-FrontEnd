/** @format */

import { createSelector } from "reselect";
import { AppRootState } from "../../../libs/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrevialNewArrivals = createSelector(
   selectHomePage,
   (HomePage) => HomePage.newArrivals,
);

export const retrevialHotSales = createSelector(
   selectHomePage,
   (HomePage) => HomePage.hotSales,
);

export const retrevialTopUsers = createSelector(
   selectHomePage,
   (HomePage) => HomePage.topUsers,
);
