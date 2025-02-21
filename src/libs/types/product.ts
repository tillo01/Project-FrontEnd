/** @format */

import {
   ProductCollection,
   ProductKids,
   ProductSize,
   ProductStatus,
} from "../enums/product.enum";

/** @format */
export interface Product {
   _id: string;
   productStatus: ProductStatus;
   productCollection: ProductCollection;
   productName: string;
   productPrice: number;
   productDiscount: number;
   productKids: ProductKids;
   productLeftCount: number;
   productSize: ProductSize;
   productVolume: number;
   productDesc?: string;
   productImages: string[];
   productViews: number;
   productSold: number;
   productExpiryDate: Date;
   expiryDate: number;

   createdAt: Date;
   updatedAt: Date;
}

export interface ProductInquery {
   order: string;
   page: number;
   limit: number;
   productCollection?: ProductCollection;
   search?: string;
}
