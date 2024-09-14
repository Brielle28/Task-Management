import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Calendarfolder/DashboardCalendar.css'; // Custom styles for task dots

const DashboardCalendar = () => {
  // Sample task data - replace this with your task-fetching logic
  const tasks = [
    { date: new Date(2024, 8, 14), color: 'red' }, // Example task on 14th Sept 2024
    { date: new Date(2024, 8, 16), color: 'yellow' }, // Example task on 16th Sept 2024
  ];

  // Function to check if a day has a task and return corresponding dot
  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const taskForDay = tasks.find(
        (task) =>
          task.date.getFullYear() === date.getFullYear() &&
          task.date.getMonth() === date.getMonth() &&
          task.date.getDate() === date.getDate()
      );

      if (taskForDay) {
        return <span className="task-dot" style={{ backgroundColor: taskForDay.color, borderRadius: "50px" }}></span>;
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
        showNeighboringMonth={true}  // Show only the days of the current month
      />
    </div>
  );
};

export default DashboardCalendar;
