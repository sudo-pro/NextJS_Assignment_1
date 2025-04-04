import { redirect } from "next/navigation";
import React from "react";
import { getUser } from "~/app/actions/auth/getUser";
import { getAllTask } from "~/app/actions/tasks/getAllTask";
import { TaskType } from "~/app/actions/tasks/schema";
import {TaskFormModal} from "~/components/CreateTaskForm";
import { AUTHPAGE } from "~/lib/constants";

export default async function Dashboard() {
  const user = await getUser();
  if (!user || !user?.id || !user?.name) {
    return redirect(AUTHPAGE);
  }

  const tasks: TaskType[] = await getAllTask();

  return (
    <div className="min-h-screen min-w-full">
      <div className="max-w-6xl mx-auto">

        <div className="sticky top-20 z-10 px-10">
          <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-gray-800 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5">
              <span className="text-indigo-700 font-extrabold">{user?.name}'s</span> Dashboard
            </h1>
            <TaskFormModal />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl 
                        transition-all duration-300 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {task.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {task.description || "No description"}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium
                            ${
                              task.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                >
                  {task.status}
                </span>
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md
                              hover:bg-blue-600 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md
                              hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length == 0 && (
          <div className="text-center pt-20">
            <p className="text-gray-500 text-lg">
              No tasks yet. Click "Add Task" to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
`;
