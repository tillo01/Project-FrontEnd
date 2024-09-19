/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../libs/types/screen";

const initialState: HomePageState = {
   newArrivals: [],
   hotSales: [],
   topUsers: [],
   dailyDeals: [],
};
const homePageSlice = createSlice({
   name: "homePage",
   initialState,
   reducers: {
      setNewArrivals: (state, action) => {
         state.newArrivals = action.payload;
      },
      setHotSales: (state, action) => {
         state.hotSales = action.payload;
      },
      setTopUsers: (state, action) => {
         state.topUsers = action.payload;
      },
      setDailyDeals: (state, action) => {
         state.dailyDeals = action.payload;
      },
   },
});

export const { setNewArrivals, setHotSales, setTopUsers, setDailyDeals } =
   homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
