"use server";

import { db } from "~/lib/db";
import { getUser } from "../auth/getUser";
import { Task } from "~/prisma/generated/prisma_client";

export const getTaskById = async (
  taskId: string,
): Promise<Partial<Task> | null> => {
  try {
    const user = await getUser();
    if (!user || !user?.id) return null;

    const task = await db.task.findUnique({
      where: { id: taskId, userId: user.id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
      },
    });

    return task;
  } catch (error) {
    console.error(error);
    return null;
  }
};
