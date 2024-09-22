import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { bg } from "date-fns/locale";
import Button from "../../ButtonFolder/Button";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiHourglass } from "react-icons/pi";


const TaskCard = ({ task }) => (
  <div className="card bg-white rounded-[10px] mb-4">
    <div className="card-body p-4 flex-col items-start justify-center gap-1 ">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="font-roboto font-bold">Task Title</h1>
        <div className="flex gap-[6px]">
          <button className="">
            <CiEdit className="size-[13px] text-yellow-700" />
          </button>
          <button className="">
            <MdDeleteForever className="size-[13px] text-red-700"  />
          </button>
        </div>
      </div>
      <p className="flex-grow text-[12px] font-roboto font-normal">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt
      </p>
    </div>
  </div>
);

const TaskColumn = ({ title, tasks, color, bg, icon}) => (
  <div className={`w-full md:w-1/3 px-2 pt-4 ${bg} rounded-[10px] `}>
    <h2 className={`flex flex-row items-start justify-start text-lg font-semibold mb-4 ${color}`}> 

      {icon}
      {title}</h2>
    {tasks.map((task, index) => (
      <TaskCard key={index} task={task} />
    ))}
  </div>
);

const Tasks = () => {
  const columns = [
    {
      title: "To do",
      color: "text-blue-400",
      tasks: [{}, {}, {}, {}, {}],
      bg: "bg-blue-100",
      icon : <MdCheckBoxOutlineBlank className="mt-[6px] mr-2"/>,
    },
    {
      title: "In progress",
      color: "text-yellow-500",
      tasks: [{}, {}, {}, {}, {}],
      bg: "bg-yellow-100",
      icon: <PiHourglass className="mt-[6px] mr-2"/>,
    },
    {
      title: "Done",
      color: "text-green-500",
      tasks: [{}, {}, {}, {}, {}],
      bg: "bg-green-100",
      icon : <IoIosCheckboxOutline className="mt-[6px] mr-2"/>
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="rounded-lg w-[100%]"> {/* Outer container is wider */}
        {/* Sticky Header and Button */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 w-full p-10  ">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button />
        </div>
  
        {/* Scrollable Task Columns */}
        <div className="flex flex-col md:flex-row -mx-2 gap-5 overflow-y-auto w-[90%] mx-auto"> {/* Scrollable div with limited width */}
          {columns.map((column, index) => (
            <TaskColumn key={index} {...column} />
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default Tasks;
