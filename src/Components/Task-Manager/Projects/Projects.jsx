import { useState, useEffect } from "react";
import { format, parseISO, isValid } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { getTasksFromLocalStorage } from "../../../Services/taskService";
import { deleteTask } from "../../../Services/taskService";
import Button from "../../AddToTaskFormFolder/Button";
import EditButton from "../../EditComponent/EditButton";
import EditForm from "../../EditComponent/EditForm";

const Projects = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage(); // getTasksFromLocalStorage is a function in the taskService file
    setTasks(storedTasks);
  }, []);

  const handleDelete = (id) => {
    deleteTask(id); // deleteTask is a function in the taskService file
    setTasks(getTasksFromLocalStorage()); // Refresh tasks after deletion
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for task ID: ${id}`);
    // You can add the modal or redirect logic for editing here
  };

  const safeFormatDate = (dateString, formatStr) => {
    if (!dateString) return "Invalid Date";
    const date = parseISO(dateString);
    return isValid(date) ? format(date, formatStr) : "Invalid Date";
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const dateKey = safeFormatDate(task.startDate, "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {});
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
      <div className="flex flex-col items-center justify-center mt-[50px] w-[100%] ml-[0px] gap-10">
        {/* Search Form */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a specific project based on title here"
            className="input input-bordered w-full h-10 rounded-[20px] outline outline-[1px] outline-blue-200 placeholder-gray-500 placeholder-opacity-70 placeholder-italic text-gray-700 pl-10 pr-4"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Displaying Tasks or Empty State */}
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[450px] gap-[20px] bg-blue-100  p-6 rounded-lg shadow-md w-full text-center">
            <p className="text-blue-600 font-roboto font-bold text-[28px]">
              It looks like you don't have any tasks yet. Create new ones to get
              started !!!
            </p>
            <Button />
          </div>
        ) : (
          <div className="bg-blue-50 p-4 rounded-lg shadow-md w-full">
            {Object.entries(groupedTasks).map(([dateKey, dateTasks]) => (
              <div key={dateKey} className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="text-blue-500 text-xl font-semibold uppercase mr-4">
                    {safeFormatDate(dateKey, "MMMM")}
                  </div>
                  <div className="text-2xl text-blue-500 font-bold mb-1">
                    {safeFormatDate(dateKey, "d")}
                  </div>
                </div>
                <div className="border-l-2 border-gray-300 ml-2 pl-4">
                  {dateTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg p-5 mb-2 shadow flex justify-center items-start gap-[5%]"
                    >
                      {/* Title of the task and time */}
                      <div className="flex flex-col items-start justify-center w-[20%]">
                        <h3 className="font-bold text-[13px] font-roboto">
                          {task.title.charAt(0).toUpperCase() +
                            task.title.slice(1)}
                        </h3>
                        <p className="text-[11px] font-roboto font-normal text-slate-700">
                          {safeFormatDate(task.startDate, "hh:mm a")} -{" "}
                          {safeFormatDate(task.endDate, "hh:mm a")}
                        </p>
                      </div>
                      {/* Description of the task */}
                      <div className="flex flex-col items-start justify-center w-[55%]">
                        <h3 className="text-[13px] font-roboto font-semibold">
                          Description
                        </h3>
                        <p className="text-[14px] font-roboto font-normal">
                          {task.description.charAt(0).toUpperCase() +
                            task.description.slice(1)}
                        </p>
                      </div>
                      {/* Edit and Delete buttons */}
                      <div className="flex flex-row items-end justify-end gap-3 w-[20%]">
                        <EditButton taskId={task.id} onEdit={handleEditClick} />
                        <button onClick={() => handleDelete(task.id)}>
                          <MdDeleteForever className="text-red-600 hover:text-red-700" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <dialog id="edit_modal" className="modal">
        {editingTaskId && (
          <EditForm taskId={editingTaskId} onClose={handleCloseModal} />
        )}
      </dialog>
    </>
  );
};

export default Projects;
