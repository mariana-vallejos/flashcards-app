import { useState } from "react";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-80 p-6 shadow-lg">
        {!deletedSuccess ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              "Are you sure you want to delete this flashcard?"
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  setDeletedSuccess(true);
                  // onClose();
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <div className="">
            <p className="text-center font-medium text-gray-700 p-4">Flashcard deleted</p>
            {/* TO DO: change color button */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  onClose();
                  setDeletedSuccess(false);
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Ok
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
