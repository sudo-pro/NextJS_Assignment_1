"use server";

import { db } from "~/lib/db";
import { TaskFormSchema, TaskFormState } from "./schema";
import { getUser } from "../auth/getUser";

export const createTask = async (
  _state: TaskFormState,
  formData: FormData,
): Promise<TaskFormState> => {
  try {
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const status = "todo";

    const validatedFields = TaskFormSchema.safeParse({
      title,
      description,
      status,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const user = await getUser();
    if (!user || !user?.id) {
      return {
        error: "You must be logged in to create a task.",
      };
    }

    const task = await db.task.create({
      data: {
        userId: user?.id,
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        status: validatedFields.data.status,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });

    return {
      success: "Task created successfully!",
      task,
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      error: "Failed to create task.",
    };
  }
};
