import { PiHourglass } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { GiCheckMark } from "react-icons/gi";
import { useTasks } from "../../../Context/TaskContext";

const RingUpBoxes = () => {
  const { tasks } = useTasks();

  const inProgressTasks = tasks.filter((task) => task.status === "inprogress");
  const doneTasks = tasks.filter((task) => task.status === "done");
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-4 lg:gap-6 w-full">
      {/* tasks */}
      <div className="flex flex-row justify-start items-center gap-3 sm:gap-[7px] w-full sm:flex-1 h-auto sm:h-[110px] min-h-[100px] sm:min-h-[110px] text-white font-roboto bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl lg:rounded-[10px] p-4 sm:pl-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <h5 className="text-4xl sm:text-5xl lg:text-[65px] font-roboto font-bold">{tasks.length}</h5>
        <div className="flex flex-col items-start justify-center gap-1 sm:gap-2">
          <SlCalender className="size-4 sm:size-[18px]" />
          <h5 className="font-roboto text-sm sm:text-base">All tasks</h5>
        </div>
      </div>
      {/* progress */}
      <div className="flex flex-row justify-start items-center gap-3 sm:gap-[7px] w-full sm:flex-1 h-auto sm:h-[110px] min-h-[100px] sm:min-h-[110px] text-white font-roboto bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl lg:rounded-[10px] p-4 sm:pl-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <h5 className="text-4xl sm:text-5xl lg:text-[65px] font-roboto font-bold">{inProgressTasks.length}</h5>
        <div className="flex flex-col items-start justify-center gap-1 sm:gap-2">
          <PiHourglass className="size-4 sm:size-[18px]" />
          <h5 className="font-roboto text-sm sm:text-base">In progress</h5>
        </div>
      </div>
      {/* done  */}
      <div className="flex flex-row justify-start items-center gap-3 sm:gap-[7px] w-full sm:flex-1 h-auto sm:h-[110px] min-h-[100px] sm:min-h-[110px] text-white font-roboto p-4 sm:pl-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl lg:rounded-[10px] shadow-lg hover:shadow-xl transition-shadow duration-200">
        <h5 className="text-4xl sm:text-5xl lg:text-[65px] font-roboto font-bold">{doneTasks.length}</h5>
        <div className="flex flex-col items-start justify-center gap-1 sm:gap-2">
          <GiCheckMark className="size-4 sm:size-[18px]" />
          <h5 className="font-roboto text-sm sm:text-base">Project completed</h5>
        </div>
      </div>
    </div>
  );
};

export default RingUpBoxes;
