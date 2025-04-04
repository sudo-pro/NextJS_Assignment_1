"use server";

import { db } from "~/lib/db";
import { getUser } from "../auth/getUser";

export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    const user = await getUser();
    if (!user || !user?.id) return false;

    await db.task.delete({
      where: { id: taskId, userId: user.id },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
