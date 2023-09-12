import type { HydratedDocument } from "mongoose";

import NextAuth from "next-auth";
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
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile?.id;
      }

      return token;
    },
    async session({ session, token }) {
      const dbUser = (await User.findOne({
        email: session.user?.email
      })) satisfies HydratedDocument<MongoUser> | null;

      if (!dbUser) {
        return session;
      }

      // session.accessToken = token.accessToken;
      session.user.id = dbUser.id;

      return session;
    },
    async signIn({ profile, user }) {
      try {
        await connectToDB();

        if (!profile?.email_verified) {
          return false;
        }

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
          email: user?.email
        });

        if (userExists) {
          return true;
        }

        await User.create({
          email: user?.email,
          username: user?.name?.replace(" ", "").toLowerCase(),
          image: user?.image
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
