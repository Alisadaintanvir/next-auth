"use server";
import { clientPromise } from "./db";
import { signIn } from "@/auth";

export const signUp = async (previousState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const userCollection = db.collection("users");

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return {
        errors: {
          email: "Email already exists",
        },
      };
    }

    const result = await userCollection.insertOne({
      email,
      password,
    });

    if (result.acknowledged) {
      return {
        message: "User registered successfully",
      };
    } else {
      throw new Error("User registration failed");
    }
  } catch (error) {
    console.error(error);
    return {
      errors: {
        general: "An error occurred. Please try again later.",
      },
    };
  }
};

export const loginAction = async (previousState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  let errors = {};

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  await signIn("credentials", { email, password, redirectTo: "/" });

  // try {
  //   await signIn("credentials", formData, { callbackUrl: "/" });
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     errors: {
  //       general: "An error occurred. Please try again later.",
  //     },
  //   };
  // }
};
