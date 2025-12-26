import TaskCard from "../Tasks/TaskCard";

const TaskColumn = ({ title, tasks, color, bg, icon, moveTaskToProgress, moveTaskToDone, deleteTask, onEdit, selectedTasks, onSelectTask }) => (
  <div className={`w-full md:flex-1 md:flex-shrink-0 min-w-0 max-w-full px-2 sm:px-3 md:px-2 lg:px-3 xl:px-4 pt-3 sm:pt-4 pb-3 sm:pb-4 ${bg} rounded-lg sm:rounded-xl shadow-sm`}>
    <h2 className={`flex flex-row items-center justify-start text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 px-1 sm:px-2 ${color}`}>
      {icon}
      <span className="ml-1">{title}</span>
      <span className="ml-2 text-[10px] sm:text-xs font-normal text-gray-500">({tasks.length})</span>
    </h2>
    <div className="space-y-2 sm:space-y-3">
      {tasks.length === 0 ? (
        <p className="text-xs sm:text-sm text-gray-400 text-center py-3 sm:py-4">No tasks</p>
      ) : (
        tasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        moveTaskToProgress={moveTaskToProgress}
        moveTaskToDone={moveTaskToDone}
        deleteTask={deleteTask}
        onEdit={onEdit}
            isSelected={selectedTasks?.includes(task.id)}
            onSelect={onSelectTask}
      />
        ))
      )}
    </div>
  </div>
);

export default TaskColumn;