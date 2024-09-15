import DashboardCalendar from "../../Calendarfolder/DashboardCalendar";
import DashboardProjectListDisplay from "../Dashboard/DashboardProjectListDisplay";
const DashboardHistory = () => {
  return (
    <>
      <div className="flex flex-row items-start justify-between w-full">
        {/* shows orders  */}
        <div className="w-[60%]">
          <DashboardProjectListDisplay />
        </div>

        {/* shows the min calendar for viewing your day */}
        <div>
          <DashboardCalendar />
        </div>
      </div>
    </>
  );
};

export default DashboardHistory;
