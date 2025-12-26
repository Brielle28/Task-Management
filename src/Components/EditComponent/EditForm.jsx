import { useEffect, useState, useRef } from "react";
import { useTasks } from "../../Context/TaskContext";
import { useToast } from "../../Context/ToastContext";
import { getTasksFromLocalStorage } from "../../Services/taskService";
import { SlCalender } from "react-icons/sl";

const EditForm = ({ taskId, onClose }) => {
  const { tasks, editTask, trackTaskView } = useTasks();
  const { success, error } = useToast();
  const [task, setTask] = useState({
    startDate: "",
    endDate: "",
    title: "",
    description: "",
    priority: "medium",
    category: "",
    tags: [],
  });
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const handleCalendarClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
      inputRef.current.click();
    }
  };

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
      // Track task view when modal opens
      if (trackTaskView) {
        trackTaskView(taskId);
      }
    } else {
      console.error(`Task with id ${taskId} not found`);
      setTask({
        startDate: "",
        endDate: "",
        title: "",
        description: "",
        priority: "medium",
        category: "",
        tags: [],
      });
    }
  }, [taskId, tasks, trackTaskView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const result = editTask({ ...task, id: taskId });
    if (result) {
      success("Task updated successfully!");
      onClose();
    } else {
      error("Failed to update task. Please try again.");
    }
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
          <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-4 pr-10 bg-white border-blue-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all relative">
            <span className="text-xs font-medium text-gray-700 mb-1.5">Start date</span>
            <input
              ref={startDateInputRef}
              type="datetime-local"
              className="grow text-xs sm:text-sm w-full bg-white border-0 focus:outline-none pr-8"
              name="startDate"
              value={task.startDate}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => handleCalendarClick(startDateInputRef)}
              className="absolute right-3 bottom-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer z-10"
              aria-label="Open calendar"
            >
              <SlCalender className="w-5 h-5" />
            </button>
          </label>
          <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-4 pr-10 bg-white border-blue-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all relative">
            <span className="text-xs font-medium text-gray-700 mb-1.5">End date</span>
            <input
              ref={endDateInputRef}
              type="datetime-local"
              className="grow text-xs sm:text-sm w-full bg-white border-0 focus:outline-none pr-8"
              name="endDate"
              value={task.endDate}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => handleCalendarClick(endDateInputRef)}
              className="absolute right-3 bottom-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer z-10"
              aria-label="Open calendar"
            >
              <SlCalender className="w-5 h-5" />
            </button>
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

        {/* Priority and Category */}
        <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4">
          <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-4 bg-white border-blue-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <span className="text-xs font-medium text-gray-700 mb-1.5">Priority</span>
            <select
              className="grow text-xs sm:text-sm w-full bg-white border-0 focus:outline-none"
              name="priority"
              value={task.priority || "medium"}
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="form-control w-full sm:w-[48%]">
            <span className="label-text text-xs font-medium text-gray-700 mb-1.5">Category</span>
            <select
              className="select select-bordered w-full bg-white border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-xs sm:text-sm"
              name="category"
              value={task.category || ""}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Family">Family</option>
              <option value="Hobby">Hobby</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        {/* Tags */}
        <label className="form-control w-full">
          <span className="label-text text-xs font-medium text-gray-700 mb-1.5">Tags</span>
          <select
            className="select select-bordered w-full bg-white border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-xs sm:text-sm"
            name="tags"
            value={Array.isArray(task.tags) ? task.tags[0] || "" : (task.tags || "")}
            onChange={(e) => {
              const selectedTag = e.target.value;
              setTask((prevTask) => ({
                ...prevTask,
                tags: selectedTag ? [selectedTag] : [],
              }));
            }}
          >
            <option value="">Select a tag</option>
            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
            <option value="meeting">Meeting</option>
            <option value="project">Project</option>
            <option value="deadline">Deadline</option>
            <option value="review">Review</option>
            <option value="follow-up">Follow-up</option>
            <option value="client">Client</option>
            <option value="team">Team</option>
            <option value="personal">Personal</option>
          </select>
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