import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
const TaskCard = ({ task, moveTaskToProgress, moveTaskToDone, deleteTask }) => (
    <div className="card bg-white rounded-[10px] mb-4">
      <div className="card-body p-4 flex-col items-start justify-center gap-1">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="font-roboto font-bold">{task.title}</h1>
          <div className="flex gap-[6px]">
            <button>
              <CiEdit className="size-[13px] text-yellow-700" />
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <MdDeleteForever className="size-[13px] text-red-700" />
            </button>
          </div>
        </div>
        <p className="flex-grow text-[12px] font-roboto font-normal">
          {task.description}
        </p>
        {/* Buttons to move tasks between stages */}
        {task.status === "todo" && (
          <button
            className="mt-2 text-[10px] text-blue-600 font-roboto font-semibold"
            onClick={() => moveTaskToProgress(task)}
          >
            Start
          </button>
        )}
        {task.status === "inprogress" && (
          <button
            className="mt-2 text-[10px] text-yellow-600 font-roboto font-semibold"
            onClick={() => moveTaskToDone(task)}
          >
            Done
          </button>
        )}
      </div>
    </div>
  );

  export default TaskCard;