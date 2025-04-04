"use server";

import bcrypt from "bcrypt";
import { db } from "~/lib/db";
import { AuthFormState, SignupFormSchema } from "./schema";

export async function signup(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
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

    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    return {
      success: "Wellcome to TaskTracker!",
      user: {
        email: email,
        password: password,
      },
    };
  } catch (error: any) {
    console.error(error);
    return {
      error: "Something went wrong.",
    };
  }
}
