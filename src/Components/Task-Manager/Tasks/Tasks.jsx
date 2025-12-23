import { useEffect, useState } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiHourglass } from "react-icons/pi";
import TaskColumn from "../Tasks/TaskColumn"
import { getTasksFromLocalStorage, editTask, deleteTask } from "../../../Services/taskService";
import Button from "../../AddToTaskFormFolder/Button";
import EditButton from "../../EditComponent/EditButton";
import EditForm from "../../EditComponent/EditForm";
import DeleteConfirmationModal from "../../EditComponent/DeleteConfirmationModal";

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

  // Delete task confirmation
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTaskToDelete(task);
    document.getElementById("delete_modal").showModal();
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTasks(getTasksFromLocalStorage()); // Refresh tasks after deletion
      setTaskToDelete(null);
      document.getElementById("delete_modal").close();
    }
  };

  const handleDeleteCancel = () => {
    setTaskToDelete(null);
    document.getElementById("delete_modal").close();
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
      <div className="rounded-lg w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6 sticky top-0 bg-white z-10 w-full p-4 sm:p-6 lg:p-10 shadow-sm">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Tasks</h1>
          <div className="w-full sm:w-auto">
            <Button/>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 overflow-x-auto w-full px-2 sm:px-4 lg:px-0 pb-4">
          {/* To Do Column */}
          <TaskColumn
            title="To do"
            color="text-blue-500"
            tasks={todoTasks}
            bg="bg-blue-50"
            icon={<MdCheckBoxOutlineBlank className="mt-[6px] mr-2" />}
            moveTaskToProgress={moveTaskToProgress}
            deleteTask={handleDeleteClick}
            onEdit={handleEditClick}
          />
          {/* In Progress Column */}
          <TaskColumn
            title="In progress"
            color="text-yellow-500"
            tasks={inProgressTasks}
            bg="bg-yellow-50"
            icon={<PiHourglass className="mt-[6px] mr-2" />}
            moveTaskToDone={moveTaskToDone}
            deleteTask={handleDeleteClick}
            onEdit={handleEditClick}
          />
          {/* Done Column */}
          <TaskColumn
            title="Done"
            color="text-green-500"
            tasks={doneTasks}
            bg="bg-green-50"
            icon={<IoIosCheckboxOutline className="mt-[6px] mr-2" />}
            deleteTask={handleDeleteClick}
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
    <dialog id="delete_modal" className="modal">
        {taskToDelete && (
          <DeleteConfirmationModal
            taskTitle={taskToDelete.title}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </dialog>
    </>
  );
};

export default Tasks;
