import { PiHourglass } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { GiCheckMark } from "react-icons/gi";
import { useEffect, useState } from "react";
import { getTasksFromLocalStorage } from "../../../Services/taskService";
const RingUpBoxes = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress");
  const doneTasks = tasks.filter((task) => task.status === "done");
  return (
    <div className="flex flex-row items-center justify-center gap-[60px]">
      {/* tasks */}
      <div className="flex flex-row justify-start items-start gap-[7px] w-[270px] h-[110px] text-white font-roboto bg-blue-600 rounded-[10px] pl-4">
        <h5 className="text-[65px] font-roboto">{todoTasks.length}</h5>
        <div className="flex flex-col items-start justify-start mt-6 gap-2">
          <SlCalender className="size-[18px] " />
          <h5 className="font-roboto">All tasks</h5>
        </div>
      </div>
      {/* progress */}
      <div className="flex flex-row justify-start items-start gap-[7px] w-[270px] h-[110px] text-white font-roboto bg-yellow-500 rounded-[10px] pl-4">
        <h5 className="text-[65px] font-roboto">{inProgressTasks.length}</h5>
        <div className="flex flex-col items-start justify-start mt-6 gap-2">
          <PiHourglass className="size-[18px] " />
          <h5 className="font-roboto"> In progress </h5>
        </div>
      </div>
      {/* done  */}
      <div className="flex flex-row justify-start items-start gap-[7px] w-[270px] h-[110px] text-white font-roboto pl-4 bg-green-500 rounded-[10px]">
        <h5 className="text-[65px] font-roboto">{doneTasks.length}</h5>
        <div className="flex flex-col items-start justify-start mt-6 gap-2">
          <GiCheckMark className="size-[18px] " />
          <h5 className="font-roboto">Project completed</h5>
        </div>
      </div>
    </div>
  );
};

export default RingUpBoxes;
