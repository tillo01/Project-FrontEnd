/** @format */

import axios from "axios";
import { Product, ProductInquery } from "../../libs/types/product";
import { serverApi } from "../../libs/config";
import { Member } from "../../libs/types/member";

class MemberService {
   private readonly path: string;
   constructor() {
      this.path = serverApi;
   }

   public async getTopUsers(): Promise<Member[]> {
      try {
         const url = this.path + "/member/top-users";
         const result = await axios.get(url);
         return result.data;
      } catch (err) {
         console.log("Error, on getTopUsers", err);
         throw err;
      }
   }
}

export default MemberService;
