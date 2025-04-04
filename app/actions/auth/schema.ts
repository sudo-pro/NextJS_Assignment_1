import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Be at least 2 characters long." })
    .max(20, { message: "Be at most 20 characters long." }),
  email: z.string().trim().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    }),
});

export const LoginFormSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password field must not be empty." }),
});

export type AuthFormState = FormState & {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  user?: {
    email: string;
    password: string;
  };
};
