import { useState, useRef } from "react";
import { useTasks } from "../../Context/TaskContext";
import { SlCalender } from "react-icons/sl";

const TaskForm = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const handleCalendarClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
      inputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      startDate,
      endDate,
      status: "todo",
      priority: priority || "medium",
      category: category.trim() || "",
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    console.log(newTask);
    const success = addTask(newTask);
    
    if (success) {
      // Clear the form fields
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setPriority("medium");
      setCategory("");
      setTags("");

      // Close the modal
      document.getElementById('my_modal_3').close();
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-11/12 max-w-2xl bg-white">
        {/* Close button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost text-black absolute right-2 top-2 hover:text-blue-500 hover:bg-blue-50 transition-colors">
            ✕
          </button>
        </form>

        {/* Form */}
        <form
          className="flex flex-col items-start justify-center gap-4 px-4 sm:px-5 mt-5"
          onSubmit={handleSubmit}
        >
          <h3 className="font-bold text-lg sm:text-xl text-blue-600">Add a Task</h3>

          {/* Start and End date */}
          <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-3 sm:gap-4 ">
            <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-2 pr-10 bg-white relative">
              <span className="text-xs text-gray-600 mb-1">Start date</span>
              <input
                ref={startDateInputRef}
                type="datetime-local"
                className="grow text-xs sm:text-sm w-full bg-white border-0 focus:outline-none pr-8"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
            <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-2 pr-10 bg-white relative">
              <span className="text-xs text-gray-600 mb-1">End date</span>
              <input
                ref={endDateInputRef}
                type="datetime-local"
                className="grow text-xs sm:text-sm w-full bg-white border-0 focus:outline-none pr-8"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
          <label className="input input-bordered flex items-center gap-2 w-full bg-white">
            <input
              type="text"
              className="grow text-sm sm:text-base"
              placeholder="Name of the task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          {/* Task Description */}
          <label className="form-control w-full bg-white">
            <textarea
              className="textarea textarea-bordered h-24 sm:h-28 text-sm sm:text-base bg-white"
              placeholder="Description about the task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          {/* Priority and Category */}
          <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-3 sm:gap-4">
            <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-2 bg-white">
              <span className="text-xs text-gray-600 mb-1">Priority</span>
              <select
                className="grow text-xs sm:text-sm w-full bg-white border-0 focus:outline-none"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="input input-bordered flex flex-col items-start w-full sm:w-[48%] pl-3 sm:pl-2 bg-white">
              <span className="text-xs text-gray-600 mb-1">Category</span>
              <input
                type="text"
                className="grow text-xs sm:text-sm w-full bg-white border-0 focus:outline-none"
                placeholder="e.g., Work, Personal"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
          </div>

          {/* Tags */}
          <label className="input input-bordered flex flex-col items-start w-full pl-3 sm:pl-2 bg-white">
            <span className="text-xs text-gray-600 mb-1">Tags (comma separated)</span>
            <input
              type="text"
              className="grow text-xs sm:text-sm w-full bg-white border-0 focus:outline-none"
              placeholder="e.g., urgent, meeting, project"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </label>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 btn border-0 rounded-lg text-white font-roboto font-semibold hover:bg-blue-600 transition-colors text-sm sm:text-base">
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default TaskForm;
