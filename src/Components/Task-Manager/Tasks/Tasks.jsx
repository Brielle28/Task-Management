import { useState, useMemo, useEffect } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiHourglass } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { MdDeleteSweep, MdCheckCircle } from "react-icons/md";
import TaskColumn from "../Tasks/TaskColumn"
import { useTasks } from "../../../Context/TaskContext";
import { useToast } from "../../../Context/ToastContext";
import Button from "../../AddToTaskFormFolder/Button";
import EditButton from "../../EditComponent/EditButton";
import EditForm from "../../EditComponent/EditForm";
import DeleteConfirmationModal from "../../EditComponent/DeleteConfirmationModal";
import TaskViewModal from "./TaskViewModal";

const Tasks = () => {
  const { tasks, editTask, removeTask } = useTasks();
  const { success, error } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date, priority, title, status
  const [sortOrder, setSortOrder] = useState("asc"); // asc, desc
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Move task to 'In Progress'
  const moveTaskToProgress = (task) => {
    const updatedTask = { ...task, status: "inprogress" };
    const result = editTask(updatedTask);
    if (result) {
      success("Task moved to In Progress!");
    }
  };

  // Move task to 'Done'
  const moveTaskToDone = (task) => {
    const updatedTask = { ...task, status: "done" };
    const result = editTask(updatedTask);
    if (result) {
      success("Task marked as Done!");
    }
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
      if (taskToDelete.bulkCount) {
        // Bulk delete
        handleBulkDeleteConfirm();
      } else {
        // Single delete
        const result = removeTask(taskToDelete.id);
        if (result) {
          success("Task deleted successfully!");
        } else {
          error("Failed to delete task. Please try again.");
        }
        setTaskToDelete(null);
        document.getElementById("delete_modal").close();
      }
    }
  };

  const handleDeleteCancel = () => {
    setTaskToDelete(null);
    document.getElementById("delete_modal").close();
  };

  // Sort function
  const sortTasks = (taskList) => {
    const sorted = [...taskList].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const aPriority = priorityOrder[a.priority] || 2;
          const bPriority = priorityOrder[b.priority] || 2;
          comparison = aPriority - bPriority;
          break;
        case "title":
          comparison = (a.title || "").localeCompare(b.title || "");
          break;
        case "status":
          const statusOrder = { todo: 1, inprogress: 2, done: 3 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case "date":
        default:
          const dateA = new Date(a.startDate || 0);
          const dateB = new Date(b.startDate || 0);
          comparison = dateA - dateB;
          break;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });
    
    return sorted;
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = tasks.filter((task) => {
        const query = searchQuery.toLowerCase();
        return (
          task.title?.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.category?.toLowerCase().includes(query) ||
          (Array.isArray(task.tags) && task.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      });
    }
    
    return sortTasks(filtered);
  }, [tasks, searchQuery, sortBy, sortOrder]);

  // Split tasks by status
  const todoTasks = filteredAndSortedTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredAndSortedTasks.filter((task) => task.status === "inprogress");
  const doneTasks = filteredAndSortedTasks.filter((task) => task.status === "done");

  // Bulk operations
  const handleSelectTask = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredAndSortedTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredAndSortedTasks.map((task) => task.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedTasks.length > 0) {
      const taskToDelete = tasks.find((t) => t.id === selectedTasks[0]);
      if (taskToDelete) {
        setTaskToDelete({ ...taskToDelete, bulkCount: selectedTasks.length });
        document.getElementById("delete_modal").showModal();
      }
    }
  };

  const handleBulkStatusChange = (newStatus) => {
    const count = selectedTasks.length;
    selectedTasks.forEach((taskId) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        editTask({ ...task, status: newStatus });
      }
    });
    success(`${count} task${count !== 1 ? 's' : ''} status updated!`);
    setSelectedTasks([]);
    setShowBulkActions(false);
  };

  const handleBulkDeleteConfirm = () => {
    const count = selectedTasks.length;
    selectedTasks.forEach((taskId) => {
      removeTask(taskId);
    });
    success(`${count} task${count !== 1 ? 's' : ''} deleted successfully!`);
    setSelectedTasks([]);
    setShowBulkActions(false);
    setTaskToDelete(null);
    document.getElementById("delete_modal").close();
  };

  //for edit functionality 
  // const [tasks, setTasks] = useState(getTasksFromLocalStorage());
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [viewingTaskId, setViewingTaskId] = useState(null);

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
    document.getElementById("edit_modal").showModal();
  };

  const handleViewClick = (taskId) => {
    setViewingTaskId(taskId);
    document.getElementById("view_modal").showModal();
  };

  const handleCloseEditModal = () => {
    setEditingTaskId(null);
    document.getElementById("edit_modal").close();
    // Tasks will automatically refresh via context
  };

  const handleCloseViewModal = () => {
    setViewingTaskId(null);
    document.getElementById("view_modal").close();
  };


  // Update showBulkActions when selection changes
  useEffect(() => {
    setShowBulkActions(selectedTasks.length > 0);
  }, [selectedTasks.length]);

  return (
    <>
    <div className="min-h-screen w-full">
      <div className="rounded-lg w-full">
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6 sticky top-0 bg-white z-10 w-full p-3 sm:p-4 md:p-4 lg:p-6 xl:p-10 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Tasks</h1>
            <div className="w-full sm:w-auto">
              <Button/>
            </div>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <CiSearch className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="input input-bordered w-full pl-8 sm:pl-10 pr-3 sm:pr-4 bg-white text-xs sm:text-sm h-9 sm:h-10 placeholder:text-xs sm:placeholder:text-sm"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered bg-white text-xs sm:text-sm flex-1 sm:flex-none sm:min-w-[140px] h-9 sm:h-10"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="title">Sort by Title</option>
                <option value="status">Sort by Status</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="btn btn-outline bg-white text-sm sm:text-base h-9 sm:h-10 w-10 sm:w-12 px-2"
                title={sortOrder === "asc" ? "Ascending" : "Descending"}
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedTasks.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <input
                  type="checkbox"
                  checked={selectedTasks.length === filteredAndSortedTasks.length}
                  onChange={handleSelectAll}
                  className="checkbox checkbox-primary checkbox-sm sm:checkbox-md"
                />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleBulkStatusChange("todo")}
                  className="btn btn-xs sm:btn-sm bg-blue-500 text-white hover:bg-blue-600 text-[10px] sm:text-xs px-2 sm:px-3"
                >
                  <MdCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline ml-1">To Do</span>
                </button>
                <button
                  onClick={() => handleBulkStatusChange("inprogress")}
                  className="btn btn-xs sm:btn-sm bg-yellow-500 text-white hover:bg-yellow-600 text-[10px] sm:text-xs px-2 sm:px-3"
                >
                  <PiHourglass className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline ml-1">In Progress</span>
                </button>
                <button
                  onClick={() => handleBulkStatusChange("done")}
                  className="btn btn-xs sm:btn-sm bg-green-500 text-white hover:bg-green-600 text-[10px] sm:text-xs px-2 sm:px-3"
                >
                  <MdCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline ml-1">Done</span>
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="btn btn-xs sm:btn-sm bg-red-500 text-white hover:bg-red-600 text-[10px] sm:text-xs px-2 sm:px-3"
                >
                  <MdDeleteSweep className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline ml-1">Delete</span>
                </button>
                <button
                  onClick={() => setSelectedTasks([])}
                  className="btn btn-xs sm:btn-sm btn-ghost text-[10px] sm:text-xs px-2 sm:px-3"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-stretch gap-2 sm:gap-3 md:gap-2 lg:gap-3 xl:gap-4 overflow-x-auto w-full px-2 sm:px-3 md:px-2 lg:px-0 pb-4">
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
            onView={handleViewClick}
            selectedTasks={selectedTasks}
            onSelectTask={handleSelectTask}
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
            onView={handleViewClick}
            selectedTasks={selectedTasks}
            onSelectTask={handleSelectTask}
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
            onView={handleViewClick}
            selectedTasks={selectedTasks}
            onSelectTask={handleSelectTask}
          />
        </div>
      </div>
    </div>
    <dialog id="view_modal" className="modal">
        {viewingTaskId && (
          <TaskViewModal taskId={viewingTaskId} onClose={handleCloseViewModal} />
        )}
      </dialog>
      <dialog id="edit_modal" className="modal">
        {editingTaskId && (
          <EditForm taskId={editingTaskId} onClose={handleCloseEditModal} />
        )}
      </dialog>
    <dialog id="delete_modal" className="modal">
        {taskToDelete && (
          <DeleteConfirmationModal
            taskTitle={taskToDelete.bulkCount ? `${taskToDelete.bulkCount} tasks` : taskToDelete.title}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </dialog>
    </>
  );
};

export default Tasks;
