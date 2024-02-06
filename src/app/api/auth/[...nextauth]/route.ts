
import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import connectDB from '../../../../libs/connectdb'
import User from "@/model/User";



//code for SignIn
export const authOptions:any = {
  providers: [
        //github login
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        }),
        //google login
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

  ],

  callbacks: {
    async signIn({ user, account, profile}) {
      if (account?.provider == "google") {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              name:user.name,
              image:user.image,
              isAdmin:false
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
