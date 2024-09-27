/** @format */

import { createSelector } from "reselect";
import { AppRootState } from "../../../libs/types/screen";
import ProductsPage from ".";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrevialRestaurant = createSelector(
   selectProductsPage,
   (ProductsPage) => ProductsPage.restaurant,
);

export const retrevialChoosenProduct = createSelector(
   selectProductsPage,
   (ProductsPage) => ProductsPage.choosenProduct,
);

export const retrevialProducts = createSelector(
   selectProductsPage,
   (ProductsPage) => ProductsPage.products,
);
