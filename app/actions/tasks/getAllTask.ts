"use server";

import { db } from "~/lib/db";
import { getUser } from "../auth/getUser";
import { TaskType } from "./schema";

export const getAllTask = async (): Promise<TaskType[]> => {
  try {
    const user = await getUser();
    if (!user || !user?.id) {
      return [];
    }
    const data = await db.task.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (!data) {
      return [];
    }
    return data as TaskType[];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
