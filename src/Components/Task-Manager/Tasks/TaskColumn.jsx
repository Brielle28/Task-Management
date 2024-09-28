import TaskCard from "../Tasks/TaskCard";

const TaskColumn = ({ title, tasks, color, bg, icon, moveTaskToProgress, moveTaskToDone, deleteTask, onEdit }) => (
  <div className={`w-full md:w-1/3 px-2 pt-4 ${bg} rounded-[10px]`}>
    <h2 className={`flex flex-row items-start justify-start text-lg font-semibold mb-4 ${color}`}>
      {icon}
      {title}
    </h2>
    {tasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        moveTaskToProgress={moveTaskToProgress}
        moveTaskToDone={moveTaskToDone}
        deleteTask={deleteTask}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default TaskColumn;