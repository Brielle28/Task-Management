import { useState, useEffect } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { getTasksFromLocalStorage } from "../../../Services/taskService";
import Button from "../../AddToTaskFormFolder/Button";

const Calendar = () => {
  // State to hold tasks from local storage
  const [tasks, setTasks] = useState([]);

  // Get the current date
  const currentDate = new Date();

  // Use state to keep track of the selected year and month
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth()); // 0 = January, 11 = December

  // Fetch tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks); // Update state with tasks from localStorage
  }, []); // Empty dependency array ensures this runs once on mount

  // Calculate days in the current month and the first day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of the current month
  const startDay = new Date(year, month, 1).getDay(); // First day of the current month

  // Function to handle navigating to the previous month
  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11); // Set to December
      setYear(year - 1); // Decrease year
    } else {
      setMonth(month - 1);
    }
  };

  // Function to handle navigating to the next month
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0); // Set to January
      setYear(year + 1); // Increase year
    } else {
      setMonth(month + 1);
    }
  };

  // Months array for display purposes
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pt-4 sm:pt-6 lg:pt-10 gap-4 sm:gap-6 lg:gap-7 px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">My Schedule</h1>
        <div className="w-full sm:w-auto">
          <Button/>
        </div>
      </div>
      <div className="bg-blue-50 p-3 sm:p-4 lg:p-5 rounded-xl lg:rounded-[10px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handlePreviousMonth} 
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <FaLongArrowAltLeft className="text-lg sm:text-xl" />
          </button>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
            {months[month]} {year}
          </h2>
          <button 
            onClick={handleNextMonth} 
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <FaLongArrowAltRight className="text-lg sm:text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4 text-center mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-semibold text-xs sm:text-sm text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-2">
          {/* Empty cells before the first day of the month */}
          {Array(startDay)
            .fill(null)
            .map((_, idx) => (
              <div key={idx} className="min-h-[60px] sm:min-h-[80px]"></div>
            ))}

          {/* Render the actual days of the month */}
          {Array.from({ length: daysInMonth }, (_, idx) => idx + 1).map((day) => (
            <div key={day} className="relative border border-gray-200 p-1 sm:p-2 min-h-[60px] sm:min-h-[80px] lg:h-20 rounded hover:bg-blue-100 transition-colors">
              <span className="absolute top-1 right-1 text-xs font-semibold text-gray-700">{day}</span>
              {/* Render tasks for this day */}
              <div className="mt-4 sm:mt-5 space-y-1">
                {tasks.map((task) => {
                  const taskStartDate = new Date(task.startDate);
                  return (
                    taskStartDate.getDate() === day &&
                    taskStartDate.getMonth() === month &&
                    taskStartDate.getFullYear() === year && (
                      <div
                        key={task.title}
                        className="bg-purple-200 p-1 rounded text-[10px] sm:text-xs text-purple-700 truncate"
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
