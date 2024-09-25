import { FiFolderPlus } from "react-icons/fi";
import TaskForm from "../AddToTaskFormFolder/AddToTaskForm";
import { useState } from "react";

const Button = () => {
  // const [isTaskFormOpen, setTaskFormOpen] = useState(false);
  return (
    <>
       <button className="btn flex flex-row items-center justify-center gap-3 bg-blue-500 px-7 py-2 rounded-[17px] hover:bg-blue-400" onClick={()=>document.getElementById('my_modal_3').showModal()}>
       <FiFolderPlus className="text-white " />
        <h1 className="text-[12px] text-white font-Roboto mt-1">Add a task</h1>
        <TaskForm/>
      {/* {isTaskFormOpen && <TaskForm onClose={() => setTaskFormOpen(false)} />} */}
      </button>

    </>
  );
};

export default Button;
