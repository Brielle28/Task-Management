import TaskCard from "../Tasks/TaskCard";

const TaskColumn = ({ title, tasks, color, bg, icon, moveTaskToProgress, moveTaskToDone, deleteTask, onEdit }) => (
  <div className={`w-full lg:w-1/3 min-w-[280px] px-3 sm:px-4 pt-4 pb-4 ${bg} rounded-xl shadow-sm`}>
    <h2 className={`flex flex-row items-center justify-start text-base sm:text-lg font-semibold mb-4 px-2 ${color}`}>
      {icon}
      <span className="ml-1">{title}</span>
      <span className="ml-2 text-xs font-normal text-gray-500">({tasks.length})</span>
    </h2>
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            moveTaskToProgress={moveTaskToProgress}
            moveTaskToDone={moveTaskToDone}
            deleteTask={deleteTask}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  </div>
);

export default TaskColumn;