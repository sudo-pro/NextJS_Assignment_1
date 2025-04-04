"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteTask } from "~/app/actions/tasks/deleteTask";
import { TaskType } from "~/app/actions/tasks/schema";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { CreateTaskForm } from "./CreateTaskForm";
import clsx from "clsx";
import { toast } from "sonner";

export const Dashboard = ({
  initialTask,
  userName,
}: {
  initialTask: TaskType[];
  userName: string;
}) => {
  const [tasks, setTasks] = useState(initialTask);

  const addTask = (newTask: TaskType): void => {
    setTasks([newTask, ...tasks]);
  };

  const [openConfirmation, setOpenConfirmation] = useState<string | null>(null);
  const removeTask = (taskId: string): void => {
    setOpenConfirmation(taskId);
  };
  const closeConfirmation = (): void => {
    setOpenConfirmation(null);
  };
  const confirmDelete = async (): Promise<void> => {
    try {
      if (openConfirmation) {
        await deleteTask(openConfirmation);
        setTasks(tasks.filter((task) => task.id !== openConfirmation));
        toast.success("Task deleted successfully");
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setOpenConfirmation(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="sticky top-16 pt-5 pb-3 z-10 bg-white">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5">
            <span className="text-indigo-700 font-extrabold">{userName}'s</span>{" "}
            Dashboard
          </h1>
          <CreateTaskForm addTask={addTask} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[rgb(241,246,175)] rounded-xl p-6 shadow-md hover:shadow-lg
                        transition-all duration-300 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {task.title}
            </h2>
            <p className={`text-gray-600 mb-4 line-clamp-2 min-w-10 `}>
              {task.description}
            </p>
            <div className="flex justify-between items-center">
              <span
                className={clsx(
                  "px-2 py-1 rounded-full text-sm font-medium",
                  task?.status == "done" && "bg-green-200",
                  task?.status == "in_progress" && "bg-orange-300",
                  task?.status == "todo" && "bg-pink-300",
                )}
              >
                {task.status}
              </span>
              <div className="space-x-2">
                <Link
                  href={`/task/${task?.id}`}
                  className="px-3 py-1 bg-[#08131df7] text-white rounded-md
                              hover:bg-[#6b4886] transition-colors duration-200"
                >
                  Edit
                </Link>
                <button
                  onClick={() => removeTask(task.id)}
                  className="px-3 py-1 bg-rose-500 text-white rounded-md
                              hover:bg-red-700 transition-colors duration-200"
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

      <ConfirmationModal
        isOpen={openConfirmation}
        onConfirm={confirmDelete}
        onClose={closeConfirmation}
      />
    </div>
  );
};
