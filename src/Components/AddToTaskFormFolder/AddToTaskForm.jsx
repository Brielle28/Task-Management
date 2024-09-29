import { useState } from "react";
import { addTask } from "../../Services/taskService";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      startDate,
      endDate,
      status: "todo",
    };

    console.log(newTask);
    addTask(newTask);

    // Clear the form fields
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");

    // Close the modal
    document.getElementById('my_modal_3').close();
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        {/* Close button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-blue-500">
            ✕
          </button>
        </form>

        {/* Form */}
        <form
          className="flex flex-col items-start justify-center gap-3 px-5 mt-5"
          onSubmit={handleSubmit}
        >
          <h3 className="font-bold text-lg text-blue-600">Add a Task</h3>

          {/* Start and End date */}
          <div className="flex flex-row items-start justify-between w-full">
            <label className="input input-bordered flex flex-col items-start w-[45%] pl-2">
              Start date
              <input
                type="datetime-local"
                className="grow text-[12px] appearance-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </label>
            <label className="input input-bordered flex flex-col items-start w-[45%] pl-2">
              End date
              <input
                type="datetime-local"
                className="grow text-[12px] appearance-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Task Title */}
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              placeholder="Name of the task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          {/* Task Description */}
          <label className="form-control w-full">
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Description about the task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 btn rounded-[10px] text-white font-roboto font-semibold hover:bg-blue-400 sm:btn-sm md:btn-md lg:btn-lg">
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default TaskForm;
