import DashboardCalendar from "../../Calendarfolder/DashboardCalendar"
const DashboardHistory = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        {/* shows orders  */}
        <div>order history or recently opened tasks</div>
        {/* shows the min calendar for viewing your day */}
        <div>
          <DashboardCalendar/>
        </div>
      </div>
    </>
  );
};

export default DashboardHistory;
