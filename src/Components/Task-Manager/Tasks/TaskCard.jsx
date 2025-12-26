import { MdDeleteForever } from "react-icons/md";
import { FaFlag, FaTag } from "react-icons/fa";
import EditButton from "../../EditComponent/EditButton";

const TaskCard = ({ task, moveTaskToProgress, moveTaskToDone, deleteTask, onEdit, isSelected, onSelect }) => {
  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    low: "bg-green-100 text-green-700 border-green-300",
  };

  const priorityIcons = {
    high: "🔴",
    medium: "🟡",
    low: "🟢",
  };

  return (
    <div className={`card bg-white rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border ${
      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'
    }`}>
      <div className="card-body p-2.5 sm:p-3 md:p-4 flex-col items-start justify-center gap-1.5 sm:gap-2">
        <div className="flex flex-row items-start justify-between w-full gap-1.5 sm:gap-2">
          <div className="flex items-start gap-1.5 sm:gap-2 flex-1 min-w-0">
            {onSelect && (
              <input
                type="checkbox"
                checked={isSelected || false}
                onChange={() => onSelect(task.id)}
                className="checkbox checkbox-xs sm:checkbox-sm checkbox-primary mt-0.5 sm:mt-1 flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-roboto font-bold text-xs sm:text-sm md:text-base text-gray-800 break-words leading-tight">{task.title}</h1>
              {/* Priority and Category */}
              {(task.priority || task.category) && (
                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                  {task.priority && (
                    <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold border ${priorityColors[task.priority] || priorityColors.medium}`}>
                      <FaFlag className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
                      <span className="hidden sm:inline">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                      <span className="sm:hidden">{task.priority.charAt(0).toUpperCase()}</span>
                    </span>
                  )}
                  {task.category && task.category.trim() && (
                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-300 truncate max-w-[100px] sm:max-w-none">
                      {task.category}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <EditButton taskId={task.id} onEdit={onEdit} />
            <button 
              onClick={() => deleteTask(task.id)}
              className="hover:opacity-70 transition-opacity p-0.5"
              aria-label="Delete task"
            >
              <MdDeleteForever className="size-3.5 sm:size-4 md:size-[16px] text-red-600" />
            </button>
          </div>
        </div>
        <p className="flex-grow text-[10px] sm:text-xs md:text-sm font-roboto font-normal text-gray-600 line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {task.description}
        </p>
        {/* Tags */}
        {task.tags && Array.isArray(task.tags) && task.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mt-0.5 sm:mt-1">
            {task.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] md:text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200"
              >
                <FaTag className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
                <span className="max-w-[60px] sm:max-w-none truncate">{tag}</span>
              </span>
            ))}
            {task.tags.length > 3 && (
              <span className="text-[8px] sm:text-[9px] text-gray-500">+{task.tags.length - 3}</span>
            )}
          </div>
        )}
        {/* Buttons to move tasks between stages */}
        {task.status === "todo" && (
          <button
            className="mt-1.5 sm:mt-2 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm text-white bg-blue-600 hover:bg-blue-700 font-roboto font-semibold rounded-md transition-colors duration-200 w-full sm:w-auto"
            onClick={() => moveTaskToProgress(task)}
          >
            Start
          </button>
        )}
        {task.status === "inprogress" && (
          <button
            className="mt-1.5 sm:mt-2 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm text-white bg-yellow-500 hover:bg-yellow-600 font-roboto font-semibold rounded-md transition-colors duration-200 w-full sm:w-auto"
            onClick={() => moveTaskToDone(task)}
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;