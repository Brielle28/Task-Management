import { FiFolderPlus } from "react-icons/fi";
import TaskForm from "./AddToTaskForm";

const Button = () => {
  return (
    <>
       <button 
         className="border-0btn flex flex-row items-center justify-center gap-2 sm:gap-3 bg-blue-500 px-4 sm:px-6 lg:px-7 py-2 rounded-xl lg:rounded-[17px] hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg" 
         onClick={()=>document.getElementById('my_modal_3').showModal()}
       >
       <FiFolderPlus className="text-white size-4 sm:size-5" />
        <h1 className="text-xs sm:text-sm lg:text-[12px] text-white font-roboto">Add a task</h1>
        <TaskForm/>
      </button>

    </>
  );
};

export default Button;
