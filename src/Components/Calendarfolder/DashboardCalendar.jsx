import { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Calendarfolder/DashboardCalendar.css'; // Custom styles for task dots
import { useTasks } from "../../Context/TaskContext";

const DashboardCalendar = () => {
  const { tasks: storedTasks } = useTasks();

  // Parse the startDate of each task
  const tasks = useMemo(() => {
    return storedTasks.map(task => ({
      ...task,
      date: new Date(task.startDate), // Use startDate instead of date
    }));
  }, [storedTasks]);

  // Function to check if a day has a task and return corresponding dot
  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const taskForDay = tasks.find(
        (task) =>
          task.date instanceof Date &&
          task.date.getFullYear() === date.getFullYear() &&
          task.date.getMonth() === date.getMonth() &&
          task.date.getDate() === date.getDate()
      );

      if (taskForDay) {
        return <span className="task-dot" style={{ backgroundColor: "#FF8C00", borderRadius: "50px" }}></span>;
      }
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] flex items-start justify-start">
      <Calendar
        value={new Date()}  // Always set to current date
        tileContent={getTileContent}  // Add task dots under days
        selectRange={false}  // Disable range selection
        showNeighboringMonth={true}  // Show neighboring month days
        className="w-full h-full"
      />
    </div>
  );
};

export default DashboardCalendar;