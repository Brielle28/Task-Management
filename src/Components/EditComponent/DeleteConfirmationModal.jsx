import { MdDeleteForever } from "react-icons/md";

const DeleteConfirmationModal = ({ taskTitle, onConfirm, onCancel }) => {
  return (
    <div className="modal-box w-11/12 max-w-md bg-white shadow-2xl border border-red-200">
      {/* Close button */}
      <form method="dialog">
        <button 
          onClick={onCancel}
          className="btn btn-sm btn-circle btn-ghost text-gray-500 absolute right-3 top-3 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          aria-label="Close modal"
        >
          ✕
        </button>
      </form>

      <div className="flex flex-col items-center justify-center gap-5 px-4 sm:px-6 mt-8 pb-4">
        {/* Warning Icon */}
        <div className="p-4 bg-red-100 rounded-full">
          <MdDeleteForever className="w-12 h-12 text-red-600" />
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl sm:text-2xl text-gray-800 text-center">
          Delete Task?
        </h3>

        {/* Message */}
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            {taskTitle && taskTitle.includes('tasks') 
              ? `Are you sure you want to delete ${taskTitle}?`
              : "Are you sure you want to delete this task?"
            }
          </p>
          {taskTitle && !taskTitle.includes('tasks') && (
            <p className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-2 rounded-lg inline-block">
              "{taskTitle}"
            </p>
          )}
          <p className="text-xs sm:text-sm text-red-600 mt-3 font-medium">
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full pt-2">
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 btn bg-gray-100 text-gray-700 border-0 rounded-lg font-roboto font-semibold hover:bg-gray-200 transition-all text-sm sm:text-base"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onConfirm}
            className="flex-1 btn bg-gradient-to-r from-red-500 to-red-600 text-white border-0 rounded-lg font-roboto font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

