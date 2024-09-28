
import { CiEdit } from "react-icons/ci";

const EditButton = ({ taskId, onEdit }) => {
  return (
    <button className="flex items-center justify-center" onClick={() => onEdit(taskId)}>
      <CiEdit className="text-yellow-500 hover:text-yellow-600" />
    </button>
  );
};
export default EditButton;