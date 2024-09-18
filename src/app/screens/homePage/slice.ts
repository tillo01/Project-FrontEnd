/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../libs/types/screen";

const initialState: HomePageState = {
   newArrivals: [],
   hotSales: [],
   topUsers: [],
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
   },
});

export const { setNewArrivals, setHotSales, setTopUsers } =
   homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
