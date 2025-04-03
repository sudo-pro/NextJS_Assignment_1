"use server";

import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import { db } from "~/lib/db";
import { SignupFormState, SignupFormSchema } from "./schema";

export async function signup(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validatedFields.data;

  try {
    const existedUser = await db.user.findUnique({
      where: { email: email },
      select: {
        id: true,
      },
    });
    if (existedUser) {
      return {
        errors: {
          email: ["This email is already used!"],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
      
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: "Wellcome to AgriArena!",
    };
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
}
