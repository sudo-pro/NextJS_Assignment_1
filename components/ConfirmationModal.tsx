import React from "react";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: string | null;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-10 
                    animate-fade-in"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">🧐</h2>
        <p className="text-black font-semibold mb-6 text-center">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-700 transition duration-200"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md hover:bg-gray-400 transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
