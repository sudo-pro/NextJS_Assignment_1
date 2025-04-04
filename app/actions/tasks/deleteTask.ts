"use server";

import { db } from "~/lib/db";
import { TaskFormState } from "./schema";
import { getUser } from "../auth/getUser";

export const deleteTask = async (
  state: TaskFormState,
  formData: FormData
): Promise<TaskFormState> => {
  try {
    const taskId = formData.get("id")?.toString() || "";
    const user = await getUser()

    await db.task.delete({
      where: { id: taskId },
    });
    
    return {
      success: "Task deleted successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong while deleting the task.",
    };
  }
};
