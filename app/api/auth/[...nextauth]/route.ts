import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/lib/auth-options";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



//export { authOptions as GET, authOptions as POST }

