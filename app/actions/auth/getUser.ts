"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/authOption";

export const getUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
