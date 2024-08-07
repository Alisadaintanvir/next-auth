import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import clientPromise from "./lib/db"; // Ensure this import path is correct

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const client = await clientPromise; // Await the promise to get the client instance
          const db = client.db();
          const userCollection = db.collection("users");

          const user = await userCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            // No user found
            throw new Error("User not found.");
          }

          // Validate the password (you should hash and compare in a real application)
          if (user.password !== credentials.password) {
            throw new Error("Invalid password.");
          }

          // Return the user object if everything is okay
          return { id: user._id, email: user.email, name: user.name }; // Adjust fields as needed
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authorization failed.");
        }
      },
    }),
  ],
});
