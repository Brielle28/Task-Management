import { useEffect, useState } from "react";
import { editTask, getTasksFromLocalStorage } from "../../Services/taskService";

const EditForm = ({ taskId, onClose }) => {
  const [task, setTask] = useState({
    startDate: "",
    endDate: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const loadTask = () => {
      const allTasks = getTasksFromLocalStorage();
      const foundTask = allTasks.find((t) => t.id === taskId);
      if (foundTask) {
        setTask(foundTask);
      } else {
        console.error(`Task with id ${taskId} not found`);
        setTask({
          startDate: "",
          endDate: "",
          title: "",
          description: "",
        });
      }
    };

    loadTask();
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask({ ...task, id: taskId });
    console.log("Task updated:", task);
    onClose();
  };

  return (
    <div className="modal-box w-11/12 max-w-2xl bg-white shadow-2xl border border-blue-100">
      {/* Close button */}
      <form method="dialog">
        <button 
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost text-gray-500 absolute right-3 top-3 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          aria-label="Close modal"
        >
          ✕
        </button>
      </form>

      <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-5 px-4 sm:px-6 mt-8">
        {/* Header with icon */}
        <div className="flex items-center gap-3 w-full pb-2 border-b border-blue-100">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800">Edit Task</h3>
        </div>

        {/* Date inputs */}
        <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4">
          <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-4 bg-white border-blue-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <span className="text-xs font-medium text-gray-700 mb-1.5">Start date</span>
            <input
              type="datetime-local"
              className="grow text-xs sm:text-sm appearance-none w-full bg-transparent border-0 focus:outline-none"
              name="startDate"
              value={task.startDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-4 bg-white border-blue-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <span className="text-xs font-medium text-gray-700 mb-1.5">End date</span>
            <input
              type="datetime-local"
              className="grow text-xs sm:text-sm appearance-none w-full bg-transparent border-0 focus:outline-none"
              name="endDate"
              value={task.endDate}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        {/* Task Title */}
        <label className="input input-bordered flex items-center gap-2 w-full bg-white border-blue-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <input
            type="text"
            className="grow text-sm sm:text-base bg-transparent border-0 focus:outline-none"
            placeholder="Name of the task"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Task Description */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-xs font-medium text-gray-700">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 sm:h-28 text-sm sm:text-base bg-white border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            placeholder="Description about the task"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Submit Button */}
        <div className="flex gap-3 w-full pt-2">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 btn bg-gray-100 text-gray-700 border-0 rounded-lg font-roboto font-semibold hover:bg-gray-200 transition-all text-sm sm:text-base"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 btn bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 rounded-lg font-roboto font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;