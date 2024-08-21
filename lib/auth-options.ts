import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Define your auth options
export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // Replace this with your user authentication logic
          if (credentials?.username === "john" && credentials.password === "password") {
            return { id: "1", name: "John Doe", email: "john@example.com", admin: true };
          } else {
            return null; // Return null if authentication fails
          }
        },
      }),
    ],
    callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl; 
      },
    },
  };