import { MdDeleteForever } from "react-icons/md";
import EditButton from "../../EditComponent/EditButton";

const TaskCard = ({ task, moveTaskToProgress, moveTaskToDone, deleteTask, onEdit }) => {
  return (
    <div className="card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="card-body p-3 sm:p-4 flex-col items-start justify-center gap-2">
        <div className="flex flex-row items-start justify-between w-full gap-2">
          <h1 className="font-roboto font-bold text-sm sm:text-base text-gray-800 flex-1 break-words">{task.title}</h1>
          <div className="flex gap-2 flex-shrink-0">
            <EditButton taskId={task.id} onEdit={onEdit} />
            <button 
              onClick={() => deleteTask(task.id)}
              className="hover:opacity-70 transition-opacity"
              aria-label="Delete task"
            >
              <MdDeleteForever className="size-4 sm:size-[16px] text-red-600" />
            </button>
          </div>
        </div>
        <p className="flex-grow text-xs sm:text-sm font-roboto font-normal text-gray-600 line-clamp-3">
          {task.description}
        </p>
        {/* Buttons to move tasks between stages */}
        {task.status === "todo" && (
          <button
            className="mt-2 px-3 py-1.5 text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 font-roboto font-semibold rounded-md transition-colors duration-200"
            onClick={() => moveTaskToProgress(task)}
          >
            Start
          </button>
        )}
        {task.status === "inprogress" && (
          <button
            className="mt-2 px-3 py-1.5 text-xs sm:text-sm text-white bg-yellow-500 hover:bg-yellow-600 font-roboto font-semibold rounded-md transition-colors duration-200"
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