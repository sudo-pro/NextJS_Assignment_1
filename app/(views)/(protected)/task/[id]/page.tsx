import Link from "next/link";
import { AUTHPAGE, HOMEPAGE } from "~/lib/constants";
import { redirect } from "next/navigation";
import { getUser } from "~/app/actions/auth/getUser";
import { getTaskById } from "~/app/actions/tasks/getTaskById";
import { EditTaskForm } from "./TaskEditForm";

export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await getUser();
  if (!user || !user?.id) {
    redirect(AUTHPAGE);
  }

  const { id } = await params;
  const task = await getTaskById(id);
  if (!task) {
    redirect(HOMEPAGE);
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center ">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Task</h2>
          <Link
            href={HOMEPAGE}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </Link>
        </div>
        <EditTaskForm task={task} />
      </div>
    </div>
  );
};
