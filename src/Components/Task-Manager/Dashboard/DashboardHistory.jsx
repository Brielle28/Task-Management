import DashboardCalendar from "../../Calendarfolder/DashboardCalendar";
import DashboardProjectListDisplay from "../Dashboard/DashboardProjectListDisplay";
const DashboardHistory = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-stretch justify-between w-full gap-4 sm:gap-6 lg:gap-4 xl:gap-6">
        {/* shows orders  */}
        <div className="w-full lg:w-[58%] xl:w-[60%] 2xl:w-[62%] lg:flex-shrink-0 lg:h-full">
          <DashboardProjectListDisplay />
        </div>

        {/* shows the min calendar for viewing your day */}
        <div className="w-full lg:w-[40%] xl:w-[38%] 2xl:w-[36%] lg:flex-shrink-0 lg:h-full">
          <DashboardCalendar />
        </div>
      </div>
    </>
  );
};

export default DashboardHistory;
