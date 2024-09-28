import { useEffect, useState } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiHourglass } from "react-icons/pi";
import TaskColumn from "../Tasks/TaskColumn"
import { getTasksFromLocalStorage, editTask, deleteTask } from "../../../Services/taskService";
import Button from "../../AddToTaskFormFolder/Button";
import EditButton from "../../EditComponent/EditButton";
import EditForm from "../../EditComponent/EditForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  // Move task to 'In Progress'
  const moveTaskToProgress = (task) => {
    const updatedTask = { ...task, status: "inprogress" };
    editTask(updatedTask); // Update in local storage
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
    );
  };

  // Move task to 'Done'
  const moveTaskToDone = (task) => {
    const updatedTask = { ...task, status: "done" };
    editTask(updatedTask); // Update in local storage
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
    );
  };

  // Delete task
  const handleDelete = (id) => {
    deleteTask(id); // deleteTask is a function in the taskService file
    setTasks(getTasksFromLocalStorage()); // Refresh tasks after deletion
  };

  // Split tasks by status
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  //for edit functionality 
  // const [tasks, setTasks] = useState(getTasksFromLocalStorage());
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
    document.getElementById("edit_modal").showModal();
  };

  const handleCloseModal = () => {
    setEditingTaskId(null);
    document.getElementById("edit_modal").close();
    setTasks(getTasksFromLocalStorage()); // Refresh tasks after editing
  };


  return (
    <>
    <div className="min-h-screen w-full">
      <div className="rounded-lg w-[100%]">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 w-full p-10">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button/>
        </div>

        <div className="flex flex-col md:flex-row -mx-2 gap-5 overflow-y-auto w-[90%] mx-auto">
          {/* To Do Column */}
          <TaskColumn
            title="To do"
            color="text-blue-400"
            tasks={todoTasks}
            bg="bg-blue-100"
            icon={<MdCheckBoxOutlineBlank className="mt-[6px] mr-2" />}
            moveTaskToProgress={moveTaskToProgress}
            deleteTask={handleDelete}
            onEdit={handleEditClick}
          />
          {/* In Progress Column */}
          <TaskColumn
            title="In progress"
            color="text-yellow-500"
            tasks={inProgressTasks}
            bg="bg-yellow-100"
            icon={<PiHourglass className="mt-[6px] mr-2" />}
            moveTaskToDone={moveTaskToDone}
            deleteTask={handleDelete}
            onEdit={handleEditClick}
          />
          {/* Done Column */}
          <TaskColumn
            title="Done"
            color="text-green-500"
            tasks={doneTasks}
            bg="bg-green-100"
            icon={<IoIosCheckboxOutline className="mt-[6px] mr-2" />}
            deleteTask={handleDelete}
            onEdit={handleEditClick}
          />
        </div>
      </div>
    </div>
    <dialog id="edit_modal" className="modal">
        {editingTaskId && (
          <EditForm taskId={editingTaskId} onClose={handleCloseModal} />
        )}
      </dialog>
    </>
  );
};

export default Tasks;
