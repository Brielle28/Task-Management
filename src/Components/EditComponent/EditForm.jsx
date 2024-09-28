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
    <div className="modal-box">
      <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-3 px-5 mt-5">
        <h3 className="font-bold text-lg text-blue-600">Edit Task</h3>

          <div className="flex flex-row items-start justify-between w-full">
            <label className="input input-bordered flex flex-col items-start w-[45%] pl-2">
              Start date
              <input
                type="datetime-local"
                className="grow text-[12px] appearance-none"
                name="startDate"
                value={task.startDate}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="input input-bordered flex flex-col items-start w-[45%] pl-2">
              End date
              <input
                type="datetime-local"
                className="grow text-[12px] appearance-none"
                name="endDate"
                value={task.endDate}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <label className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              placeholder="Name of the task"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="form-control w-full">
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Description about the task"
              name="description"
              value={task.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit" className="w-full bg-blue-500 btn rounded-[10px] text-white font-roboto font-semibold hover:bg-blue-400 sm:btn-sm md:btn-md lg:btn-lg">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditForm;