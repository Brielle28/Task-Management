
import { CiEdit } from "react-icons/ci";

const EditButton = ({ taskId, onEdit }) => {
  return (
    <button 
      className="flex items-center justify-center hover:opacity-70 transition-opacity" 
      onClick={() => onEdit(taskId)}
      aria-label="Edit task"
    >
      <CiEdit className="text-yellow-500 hover:text-yellow-600 size-4 sm:size-5" />
    </button>
  );
};
export default EditButton;