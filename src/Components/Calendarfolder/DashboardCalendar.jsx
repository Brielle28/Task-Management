import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Calendarfolder/DashboardCalendar.css'; // Custom styles for task dots
import { getTasksFromLocalStorage } from "../../Services/taskService";

const DashboardCalendar = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage(); // Fetch tasks from local storage

    // Parse the startDate of each task
    const parsedTasks = storedTasks.map(task => ({
      ...task,
      date: new Date(task.startDate), // Use startDate instead of date
    }));

    setTasks(parsedTasks);
  }, []);

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
    <div>
      <Calendar
        value={new Date()}  // Always set to current date
        tileContent={getTileContent}  // Add task dots under days
        selectRange={false}  // Disable range selection
        showNeighboringMonth={true}  // Show neighboring month days
      />
    </div>
  );
};

export default DashboardCalendar;