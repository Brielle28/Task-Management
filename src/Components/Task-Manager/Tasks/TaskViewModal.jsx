import { useEffect } from "react";
import { useTasks } from "../../../Context/TaskContext";
import { format } from "date-fns";
import { MdAccessTime, MdCheckCircle } from "react-icons/md";
import { PiHourglass } from "react-icons/pi";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaFlag, FaTag } from "react-icons/fa";

const TaskViewModal = ({ taskId, onClose }) => {
  const { tasks, trackTaskView } = useTasks();
  const task = tasks.find((t) => t.id === taskId);

  // Track view when modal opens
  useEffect(() => {
    if (taskId && trackTaskView) {
      trackTaskView(taskId);
    }
  }, [taskId, trackTaskView]);

  if (!task) {
    return null;
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case "done":
        return { icon: <MdCheckCircle className="w-5 h-5 text-green-500" />, label: "Done", color: "bg-green-100 text-green-700" };
      case "inprogress":
        return { icon: <PiHourglass className="w-5 h-5 text-yellow-500" />, label: "In Progress", color: "bg-yellow-100 text-yellow-700" };
      default:
        return { icon: <MdCheckBoxOutlineBlank className="w-5 h-5 text-blue-500" />, label: "To Do", color: "bg-blue-100 text-blue-700" };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "high":
        return { color: "bg-red-100 text-red-700", label: "High" };
      case "medium":
        return { color: "bg-yellow-100 text-yellow-700", label: "Medium" };
      case "low":
        return { color: "bg-green-100 text-green-700", label: "Low" };
      default:
        return { color: "bg-gray-100 text-gray-700", label: "None" };
    }
  };

  const statusInfo = getStatusInfo(task.status);
  const priorityInfo = getPriorityInfo(task.priority);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return format(date, "MMM d, yyyy 'at' hh:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="modal-box w-11/12 max-w-2xl bg-white shadow-2xl border border-blue-100">
      {/* Close button */}
      <form method="dialog">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost text-gray-500 absolute right-3 top-3 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          aria-label="Close modal"
        >
          ✕
        </button>
      </form>

      <div className="flex flex-col gap-6 px-4 sm:px-6 mt-8">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-blue-100">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800 flex-1">Task Details</h3>
        </div>

        {/* Task Title */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{task.title}</h2>
        </div>

        {/* Status and Priority */}
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${statusInfo.color}`}>
            {statusInfo.icon}
            <span>{statusInfo.label}</span>
          </div>
          {task.priority && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${priorityInfo.color}`}>
              <FaFlag className="w-4 h-4" />
              <span>{priorityInfo.label} Priority</span>
            </div>
          )}
          {task.category && (
            <div className="px-3 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
              {task.category}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {task.description || "No description provided"}
          </p>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <MdAccessTime className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Start Date</p>
              <p className="text-sm font-medium text-gray-800 mt-1">{formatDate(task.startDate)}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <MdAccessTime className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">End Date</p>
              <p className="text-sm font-medium text-gray-800 mt-1">{formatDate(task.endDate)}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {task.tags && Array.isArray(task.tags) && task.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200"
                >
                  <FaTag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="btn bg-blue-500 text-white border-0 rounded-lg font-semibold hover:bg-blue-600 transition-all text-sm sm:text-base px-6"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;

