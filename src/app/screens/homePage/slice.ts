/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../libs/types/screen";

const initialState: HomePageState = {
   newArrivals: [],
   hotSales: [],
   topUsers: [],
   mySwiper: [],
};
const homePageSlice = createSlice({
   name: "homePage",
   initialState,
   reducers: {
      setNewArrivals: (state, action) => {
         state.newArrivals = action.payload;
      },
   },
});

export const { setNewArrivals } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
