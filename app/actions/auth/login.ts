"use server";

import bcrypt from "bcrypt";
import { db } from "~/lib/db";
import { AuthFormState, LoginFormSchema } from "./schema";

export async function login(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
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
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return {
        errors: {
          email: ["This email could not register yet."],
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        errors: {
          password: ["Invalid password."],
        },
      };
    }

    delete (user as { password?: string }).password;

    return {
      success: "Wellcome back in TaskTracker!",
      user: {
        email: user.email,
        password: password,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong!",
    };
  }
}
