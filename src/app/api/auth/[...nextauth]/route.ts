import type { Document } from "mongoose";

import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

import { connectToDB } from "@/utils/database";

import User from "@/models/user";
import type { MongoUser } from "@/models/user";

export const OPTIONS: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username",
    //       type: "text",
    //       placeholder: "Your username"
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Your password"
    //     }
    //   },
    //   async authorize(credentials) {
    //     try {
    //       /* This where you need to
    //        retrieve user data to
    //        verify with credentials
    //     */
    //       // const user = {
    //       //   id: "1",
    //       //   name: "Hassan",
    //       //   password: "nextauth"
    //       // };

    //       if (
    //         credentials?.username === user.name &&
    //         credentials?.password === user.password
    //       ) {
    //         return user;
    //       }

    //       return null;
    //     } catch (error) {
    //       console.error(error);
    //       return null;
    //     }
    //   }
    // })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id;
      }

      // console.log({ token });

      return token;
    },
    async session({ session, token }) {
      const dbUser = (await User.findOne({
        email: session.user?.email
      })) as Document<MongoUser>;

      if (!dbUser) {
        return session;
      }

      session.accessToken = token.accessToken;
      session.user.id = dbUser.id;

      return session;
    },
    async signIn({ profile, account }) {
      try {
        await connectToDB();

        // restrict access to people with
        // verified accounts at a particular domain
        // if (account?.provider === "google") {
        //   return !!(
        //     profile &&
        //     profile.email_verified &&
        //     profile.email?.endsWith("@gmail.com")
        //   );
        // }

        const userExists = await User.findOne({
          email: profile?.email
        });

        if (userExists) {
          return true;
        }

        await User.create({
          email: profile?.email,
          username: profile?.name?.replace(" ", "").toLowerCase(),
          image: profile?.image
        });

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  },
  pages: {
    error: "/auth/error" // Error code passed in query string as ?error=
  }
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
