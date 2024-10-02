/** @format */

import axios from "axios";
import { Product, ProductInquery } from "../../libs/types/product";
import { serverApi } from "../../libs/config";
import {
   LoginInput,
   Member,
   MemberInput,
   MemberUpdateInput,
} from "../../libs/types/member";

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

   public async getAdmin(): Promise<Member> {
      try {
         const url = this.path + "/member/restaurant";
         const result = await axios.get(url);
         return result.data;
      } catch (err) {
         console.log("Error, on getTopUsers", err);
         throw err;
      }
   }

   public async signup(input: MemberInput): Promise<Member> {
      try {
         const url = this.path + "/member/signup";

         const result = await axios.post(url, input, { withCredentials: true });

         console.log("signup ", result);
         const member: Member = result.data.member;
         console.log("member", member);
         localStorage.setItem("memberData", JSON.stringify(member));
         return member;
      } catch (err) {
         console.log("Error on signup");
         throw err;
      }
   }

   // SignUp End

   // Login Start

   public async login(input: LoginInput): Promise<Member> {
      try {
         const url = this.path + "/member/login";
         const result = await axios.post(url, input, { withCredentials: true });
         console.log("Login in ", result);
         const member: Member = result.data.member;
         localStorage.setItem("memberData", JSON.stringify(member));
         return member;
      } catch (err) {
         console.log("Error on login ");
         throw err;
      }
   }

   public async logout(): Promise<void> {
      try {
         const url = this.path + "/member/logout";
         const result = await axios.post(url, {}, { withCredentials: true });
         console.log("Logged Out", result);
         localStorage.removeItem("memberData");
         return result.data.logout;
      } catch (err) {
         console.log("Error on Logout");
         throw err;
      }
   }

   public async updateMember(input: MemberUpdateInput): Promise<Member> {
      try {
         const formData = new FormData();
         formData.append("memberNick", input.memberNick || "");
         formData.append("memberPhone", input.memberPhone || "");
         formData.append("memberEmail", input.memberEmail || "");
         formData.append("memberAddress", input.memberAddress || "");
         formData.append("memberDesc", input.memberDesc || "");
         formData.append("memberImage", input.memberImage || "");
         formData.append("memberCardExpiry", input.memberCardExpiry || "");
         formData.append("memberCardHolder", input.memberCardHolder || "");
         formData.append("memberCardNumber", input.memberCardNumber || "");
         formData.append("memberCardCVV", input.memberCardCVV || "");

         const result = await axios(`${serverApi}/member/update`, {
            method: "POST",
            data: formData,
            withCredentials: true,
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         console.log("updateMember", result);
         const member: Member = result.data;
         localStorage.setItem("memberData", JSON.stringify(member));
         return member;
      } catch (err) {
         console.log("Error on signup=>>>>>>>");
         throw err;
      }
   }
}

export default MemberService;
