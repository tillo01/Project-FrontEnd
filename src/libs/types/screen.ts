/**
 * REACT APP STATE*
 *
 * @format
 */

import { Member } from "./member";
import { Product } from "./product";

export interface AppRootState {
   homePage: HomePageState;
   productsPage: ProductsPageState;
}
// HOMEPAGE
export interface HomePageState {
   newArrivals: Product[];
   hotSales: Product[];
   topUsers: Member[];
   mySwiper: Product[];
   // bestOffers: Product[];
}
export interface ProductsPageState {
   restaurant: Member | null;
   choosenProduct: Product | null;
   products: Product[];
}

// PRODUCTS PAGE

// ORDERS PAGE
