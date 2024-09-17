/** @format */

import axios from "axios";
import { Product, ProductInquery } from "../../libs/types/product";
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
}

export default ProductService;
