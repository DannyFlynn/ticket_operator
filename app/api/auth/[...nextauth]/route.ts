import NextAuth from "next-auth"
import  CredentialProvider from "next-auth/providers/credentials"

export const authOptions = NextAuth({
    providers: [
        CredentialProvider({
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
     
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      
        if (credentials?.username === "john" && credentials.password === "password") {

            return { id: "1", name: "John Doe", email: "john@example.com", admin: true };
          } else {

            return null;
          }
          }
        })
      ],
      callbacks: {
        async redirect({ url, baseUrl }) {
          return "/"; 
        }
      }
})

export { authOptions as GET, authOptions as POST }

