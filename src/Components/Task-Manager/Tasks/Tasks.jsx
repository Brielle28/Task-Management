import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { bg } from "date-fns/locale";
import Button from "../../ButtonFolder/Button";

const TaskCard = ({ task }) => (
  <div className="card bg-white rounded-[10px] mb-4">
    <div className="card-body p-4 flex-row items-center">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-roboto font-bold">Task Title</h1>
        <div className="flex">
          <button className="btn btn-ghost btn-square btn-sm">
            <CiEdit className="size-[13px] text-yellow-700" />
          </button>
          <button className="btn btn-ghost btn-square btn-sm">
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
    <h2 className={`text-lg font-semibold mb-4 ${color}`}>{title}</h2>
    {tasks.map((task, index) => (
      <TaskCard key={index} task={task} />
    ))}
  </div>
);

const Tasks = () => {
  const columns = [
    {
      title: "To do",
      color: "text-neutral",
      tasks: [{}, {}, {}, {}, {}],
      bg: "bg-blue-100",
    },
    {
      title: "In progress",
      color: "text-warning",
      tasks: [{}, {}, {}, {}, {}],
      bg: "bg-yellow-100",
    },
    {
      title: "Done",
      color: "text-error",
      tasks: [{}, {}, {}, {}, {}],
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="bg-base-100 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button />
        </div>
        <div className="flex flex-col md:flex-row -mx-2 gap-5">
          {columns.map((column, index) => (
            <TaskColumn key={index} {...column} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
