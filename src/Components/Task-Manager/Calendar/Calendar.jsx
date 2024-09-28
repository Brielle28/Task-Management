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
    <div className="flex flex-col w-full max-w-5xl mx-auto pt-10 gap-7">
      <div className="flex items-center justify-between w-full ">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">My Schedule</h1>
        <Button/>
      </div>
      <div className="bg-blue-50 p-5 rounded-[10px] shadow-1xl">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePreviousMonth} className="">
            <FaLongArrowAltLeft />
          </button>
          <h2 className="text-xl font-semibold">
            {months[month]} {year}
          </h2>
          <button onClick={handleNextMonth} className="">
            <FaLongArrowAltRight />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-4 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-semibold">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-2">
          {/* Empty cells before the first day of the month */}
          {Array(startDay)
            .fill(null)
            .map((_, idx) => (
              <div key={idx}></div> // Empty cells for days before the first of the month
            ))}

          {/* Render the actual days of the month */}
          {Array.from({ length: daysInMonth }, (_, idx) => idx + 1).map((day) => (
            <div key={day} className="relative border p-2 h-20">
              <span className="absolute top-1 right-1 text-xs">{day}</span>
              {/* Render tasks for this day */}
              {tasks.map((task) => {
                const taskStartDate = new Date(task.startDate); // Parse task's start date
                return (
                  taskStartDate.getDate() === day &&
                  taskStartDate.getMonth() === month &&
                  taskStartDate.getFullYear() === year && (
                    <div
                      key={task.title}
                      className="bg-purple-200 p-1 rounded text-xs text-purple-700 mt-2"
                    >
                      {task.title}
                    </div>
                  )
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
