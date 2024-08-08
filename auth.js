import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { client } from "./lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getUserFromDB } from "./utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getUserFromDB(credentials.email);
        if (!user) {
          throw new Error("User not found.");
        }

        if (user.password !== credentials.password) {
          throw new Error("Incorrect password.");
        }

        return user;
      },
    }),
  ],
});
