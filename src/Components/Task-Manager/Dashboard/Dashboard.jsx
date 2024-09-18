import RingUpBoxes from "./RingUpBoxes";
import DashboardHistory from "./DashboardHistory";
import Button from "../../ButtonFolder/Button";
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
        <Button className="mt-10"/>
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
