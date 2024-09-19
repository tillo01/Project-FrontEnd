/** @format */

import axios from "axios";
import {
   Product,
   ProductInquery,
   ProductInqueryDaily,
} from "../../libs/types/product";
import { serverApi } from "../../libs/config";

class ProductService {
   private readonly path: string;
   constructor() {
      this.path = serverApi;
   }

   public async getProducts(input: ProductInquery): Promise<Product[]> {
      try {
         let url = `${this.path}/product/all/?order=${input.order}&page=${input.page}&limit=${input.limit}`;
         if (input.productCollection)
            url += `&productCollection=${input.productCollection}`;
         if (input.productStatus)
            url += `&productStatus=${input.productStatus}`;
         if (input.search) url += `&search=${input.search}`;
         const result = await axios.get(url);

         console.log("getProducts", result);
         //   arraydi tawkil qilgan boladi
         return result.data;
      } catch (err) {
         console.log("Error, on getProduct", err);
         throw err;
      }
   }

   public async getProductsDaily(
      input: ProductInqueryDaily,
   ): Promise<Product[]> {
      try {
         let url = `${this.path}/product/all/?&page=${input.page}&limit=${input.limit}`;
         if (input.productCollection)
            url += `&productCollection=${input.productCollection}`;
         if (input.hours) {
            // Check if hours is provided
            url += `&hours=${input.hours}`; // Append hours to the URL
         }

         const result = await axios.get(url);

         console.log("getProducts", result);
         //   arraydi tawkil qilgan boladi
         return result.data;
      } catch (err) {
         console.log("Error, on getProduct", err);
         throw err;
      }
   }
}

export default ProductService;
