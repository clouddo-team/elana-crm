import NextAuth from "next-auth"
import authOptions from "./app/auth/authOptions";
 
export const handler = NextAuth(authOptions)