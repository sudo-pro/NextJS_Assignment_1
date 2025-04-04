"use server";

import { db } from "~/lib/db";
import { TaskFormSchema, TaskFormState } from "./schema";
import { getUser } from "../auth/getUser";

export const editTask = async (
  state: TaskFormState,
  formData: FormData
): Promise<TaskFormState> => {
  try {
    const validatedFields = TaskFormSchema.safeParse({
      id: formData.get("id"),
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const user = await getUser();
    if (!user || !user?.id) {
      return {
        error: "You must be logged in to edit a task.",
      };
    }

    const { id, title, description, status } = validatedFields.data;

    const task = await db.task.update({
      where: { id: id, userId: user.id },
      data: {
        title,
        description,
        status,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });

    return {
      success: "Task updated successfully!",
      task,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};
