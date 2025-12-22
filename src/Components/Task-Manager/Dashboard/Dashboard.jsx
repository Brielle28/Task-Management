import RingUpBoxes from "./RingUpBoxes";
import DashboardHistory from "./DashboardHistory";
import Button from "../../AddToTaskFormFolder/Button";
const Dashboard = () => {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen mt-4 sm:mt-6 w-full px-2 sm:px-4 lg:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-0">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-black text-2xl sm:text-3xl lg:text-[35px] font-semibold font-sans">
            Overview
          </h1>
          <h5 className="text-base sm:text-lg lg:text-[20px] font-roboto text-gray-600 mt-1">
            Have a bird eye view of your tasks
          </h5>
        </div>
        {/* button form  */}
        <div className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto"/>
        </div>
      </div>

      {/* Boxes showing totals of tasks, progress and done tasks */}
      <div className="mt-4 sm:mt-6 lg:mt-[20px] w-full">
        <RingUpBoxes />
      </div>

      {/* dash board history  */}
      <div className="mt-6 sm:mt-8 lg:mt-[50px] xl:mt-[50px] flex w-full">
        <DashboardHistory />
      </div>
    </div>
  );
};

export default Dashboard;
