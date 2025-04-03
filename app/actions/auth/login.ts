"use server";

import { signIn } from "next-auth/react";
import { SignupFormState, LoginFormSchema } from "./schema";
import { db } from "~/lib/db";

export async function login(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  try {
    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validatedFields.data;
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        errors: {
          email: ["This email could not register yet."],
        },
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: "Wellcome back in AgriArena!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
}
