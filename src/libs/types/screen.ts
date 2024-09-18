/**
 * REACT APP STATE*
 *
 * @format
 */

import { Member } from "./member";
import { Order } from "./orders";
import { Product } from "./product";

export interface AppRootState {
   homePage: HomePageState;
   productsPage: ProductsPageState;
   ordersPage: OrdersPageState;
}
// HOMEPAGE
export interface HomePageState {
   newArrivals: Product[];
   hotSales: Product[];
   topUsers: Member[];
   // dailyDeals: Product[];
   // bestOffers: Product[];
}
export interface ProductsPageState {
   restaurant: Member | null;
   choosenProduct: Product | null;
   products: Product[];
}
export interface OrdersPageState {
   pausedOrders: Order[];
   processOrders: Order[];
   finishedOrders: Order[];
}

// PRODUCTS PAGE

// ORDERS PAGE
