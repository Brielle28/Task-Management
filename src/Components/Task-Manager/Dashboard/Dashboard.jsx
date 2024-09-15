import { FiFolderPlus } from "react-icons/fi";
import RingUpBoxes from "./RingUpBoxes";
import DashboardHistory from "./DashboardHistory";
const Dashboard = () => {
  return (
    <div className="flex flex-col items-start justify-start mt-6 ">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-black text-[35px] font-semibold font-sans">
            overview
          </h1>
          <h5 className="text-[20px] font-Roboto ">
            {" "}
            Have a bird eye view of your tasks{" "}
          </h5>
        </div>
        <button className="flex flex-row items-center justify-center gap-3 bg-blue-500 px-7 py-2 rounded-[17px] mt-10">
          <FiFolderPlus className="text-white " />
          <h1 className="text-[12px] text-white font-Roboto mt-1">
            Add a task
          </h1>
        </button>
      </div>

      {/* Boxes showing totals of tasks, progress and done tasks */}
      <div className="mt-[20px]">
        <RingUpBoxes />
      </div>

      {/* dash board history  */}
      <div className="mt-[50px] flex w-full">
        <DashboardHistory />
      </div>
    </div>
  );
};

export default Dashboard;
