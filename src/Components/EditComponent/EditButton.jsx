
import { CiEdit } from "react-icons/ci";

const EditButton = ({ taskId, onEdit }) => {
  return (
    <button 
      className="flex items-center justify-center hover:opacity-70 transition-opacity p-0.5 sm:p-1" 
      onClick={() => onEdit(taskId)}
      aria-label="Edit task"
    >
      <CiEdit className="text-yellow-500 hover:text-yellow-600 size-3.5 sm:size-4 md:size-5" />
    </button>
  );
};
export default EditButton;