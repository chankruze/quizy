/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 07:53:39 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import NextAuth from "next-auth";
// providers
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
// adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// mongodb connection
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
