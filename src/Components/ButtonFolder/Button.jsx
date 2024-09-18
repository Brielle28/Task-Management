import { FiFolderPlus } from "react-icons/fi";

const Button = () => {
  return (
    <>
      <button className="flex flex-row items-center justify-center gap-3 bg-blue-500 px-7 py-2 rounded-[17px]">
        <FiFolderPlus className="text-white " />
        <h1 className="text-[12px] text-white font-Roboto mt-1">Add a task</h1>
      </button>
    </>
  );
};

export default Button;
