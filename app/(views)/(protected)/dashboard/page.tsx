import { redirect } from "next/navigation";
import { getUser } from "~/app/actions/auth/getUser";
import { getAllTask } from "~/app/actions/tasks/getAllTask";
import { TaskType } from "~/app/actions/tasks/schema";
import { AUTHPAGE } from "~/lib/constants";
import { Dashboard } from "./Dashboard";

export default async () => {
  const user = await getUser();
  if (!user || !user?.id || !user?.name) {
    return redirect(AUTHPAGE);
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const tasks: TaskType[] = await getAllTask();

  return (
    <div className="min-h-screen min-w-full px-4">
      <Dashboard initialTask={tasks} userName={user?.name} />
    </div>
  );
};
