import { z } from "zod";

export const TaskFormSchema = z.object({
  id: z.string().nonempty({ message: "Task ID is required." }),
  title: z
    .string()
    .trim()
    .min(3, { message: "Task title must be at least 3 characters long." }),
  description: z
    .string()
    .trim()
    .max(100, { message: "Description must be less than 100 characters." })
    .optional(),
  status: z.enum(["todo", "in_progress", "done"], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
});

export type TaskType = {
  id: string;
  title: string;
  description: string | null;
  status: string;
};

export type TaskFormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
        status?: string[];
      };
      error?: string;
      message?: string;
      success?: string;
      redirectTo?: string;
      task?: TaskType;
    }
  | undefined;
