import { clientPromise } from "@/lib/db";

export const getUserFromDB = async (email) => {
  const client = await clientPromise;
  const db = client.db();
  const userCollection = db.collection("users");
  const user = await userCollection.findOne({ email });
  return user;
};
