"use client";

import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createTask } from "~/app/actions/tasks/createTask";

export const TaskFormModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, createTaskAction] = useActionState(createTask, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
      state.error = undefined;
    } else if (state?.success) {
      toast.success(state.success);
      state.success = undefined;
      setIsOpen(false);
    }
  }, [state?.error, state?.message, state?.success]);

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                  hover:bg-indigo-700 transition-colors duration-300 
                  shadow-md hover:shadow-lg"
      >
        Add Task
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
                    animate-fade-in"
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl 
                      transform transition-all duration-300 scale-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Create New Task
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form action={createTaskAction} noValidate={true}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter task title"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 
                            resize-y"
                  placeholder="Enter task description"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md 
                            hover:bg-indigo-700 transition-colors duration-300"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
