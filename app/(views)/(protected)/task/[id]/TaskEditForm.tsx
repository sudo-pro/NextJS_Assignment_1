"use client";

import Link from "next/link";
import { editTask } from "~/app/actions/tasks/editTask";
import { ReactButton } from "~/components/ReactButton";
import { useFormAction } from "~/lib/hooks/useFormAction";
import { Task } from "~/prisma/generated/prisma_client";

export const EditTaskForm = ({ task }: { task: Partial<Task> | null }) => {
  // if (!task) {
  //   toast.error("No task found!");
  //   redirect(HOMEPAGE);
  // }

  const [state, editAction] = useFormAction(editTask);

  return (
    <form action={editAction}>
      <input type="hidden" name="id" defaultValue={task?.id} />

      {/* Title Field */}
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 my-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={task?.title}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
          placeholder="Enter task title"
          required
        />
        {state?.errors?.title && (
          <p className="text-sm text-red-800">{state.errors.title}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={task?.description || ""}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400 resize-none h-32"
          placeholder="Enter task description"
        />
        {state?.errors?.description && (
          <p className="text-sm text-red-800">{state.errors.description}</p>
        )}
      </div>

      {/* Status Field */}
      <div className="mb-6">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={task?.status}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800"
        >
          <option value="todo">ToDo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {state?.errors?.status && (
          <p className="text-sm text-red-800">{state.errors.status}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-2">
        <Link
          href="/dashboard"
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </Link>
        <ReactButton
          className="px-4 py-2 bg-indigo-600 text-white rounded-md 
                            hover:bg-indigo-700 transition-colors duration-300"
          onStatic="Edit Task"
          onAction="Editing..."
        />
      </div>
    </form>
  );
};
