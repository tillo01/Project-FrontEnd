/** @format */

import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
   _id: string;
   memberType: MemberType;
   memebrStatus: MemberStatus;
   memberNick: string;
   memberPhone: string;
   memberPassword: string;
   memberAddress?: string;
   memberDesc?: string;
   memberImage?: string;
   memberPoints: number;
   memberEmail: string;

   memberCardHolder?: string;
   memberCardNumber?: string;
   memberCardExpiry?: string;
   memberCardCVV: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface MemberInput {
   memberType?: MemberType;
   membrStatus?: MemberStatus;
   memberNick: string;
   memberPhone: string;
   memberPassword: string;
   memberAddress?: string;
   memberDesc?: string;
   memberImage?: string;
   memberPoints?: number;
   memberCardHolder?: string;
   memberCardNumber?: string;
   memberCardExpiry?: string;
   memberEmail: string;

   memberCardCVV?: string;
}

export interface LoginInput {
   memberNick: string;
   memberPassword: string;
}

export interface MemberUpdateInput {
   memberNick?: string;
   memberPhone?: string;
   memberPassword?: string;
   memberAddress?: string;
   memberDesc?: string;
   memberImage?: string;
   memberPoints?: number;
   memberCardHolder?: string;
   memberCardNumber?: string;
   memberCardExpiry?: string;
   memberCardCVV?: string;
   memberEmail?: string;
}

export interface sendMessasgeInput {
   email: string;
   message: string;
   name: string;
   subject: string;
}
