import { useState } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { useTasks } from "../../../Context/TaskContext";
import Button from "../../AddToTaskFormFolder/Button";
import DayTasksModal from "./DayTasksModal";

const Calendar = () => {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);

  // Get the current date
  const currentDate = new Date();

  // Use state to keep track of the selected year and month
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth()); // 0 = January, 11 = December

  // Get tasks for a specific day (including tasks that span across this day)
  const getTasksForDay = (day, month, year) => {
    const currentDay = new Date(year, month, day);
    currentDay.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      if (!task.startDate || !task.endDate) return false;
      
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
      
      // Set time to midnight for accurate date comparison
      taskStartDate.setHours(0, 0, 0, 0);
      taskEndDate.setHours(0, 0, 0, 0);
      
      // Check if current day falls between start and end date (inclusive)
      return currentDay >= taskStartDate && currentDay <= taskEndDate;
    });
  };

  // Check if a day has tasks
  const hasTasks = (day) => {
    return getTasksForDay(day, month, year).length > 0;
  };

  // Handle day click
  const handleDayClick = (day) => {
    const dayTasks = getTasksForDay(day, month, year);
    if (dayTasks.length > 0) {
      const date = new Date(year, month, day);
      setSelectedDate(date);
      setSelectedDayTasks(dayTasks);
      document.getElementById("day_tasks_modal").showModal();
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedDate(null);
    setSelectedDayTasks([]);
    document.getElementById("day_tasks_modal").close();
  };

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
    <div className="flex flex-col w-full max-w-5xl mx-auto pt-2 sm:pt-4 lg:pt-10 gap-3 sm:gap-4 lg:gap-7 px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600">My Schedule</h1>
        <div className="w-full sm:w-auto">
          <Button/>
        </div>
      </div>
      <div className="bg-white p-2 sm:p-3 lg:p-4 xl:p-5 rounded-lg sm:rounded-xl lg:rounded-[10px] shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4 px-1">
          <button 
            onClick={handlePreviousMonth} 
            className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg transition-colors active:scale-95"
            aria-label="Previous month"
          >
            <FaLongArrowAltLeft className="text-base sm:text-lg lg:text-xl" />
          </button>
          <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-800 px-2 text-center">
            {months[month]} {year}
          </h2>
          <button 
            onClick={handleNextMonth} 
            className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg transition-colors active:scale-95"
            aria-label="Next month"
          >
            <FaLongArrowAltRight className="text-base sm:text-lg lg:text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3 xl:gap-4 text-center mb-1 sm:mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-semibold text-[10px] sm:text-xs lg:text-sm text-gray-600 py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 lg:gap-2 mt-1 sm:mt-2">
          {/* Empty cells before the first day of the month */}
          {Array(startDay)
            .fill(null)
            .map((_, idx) => (
              <div key={idx} className="min-h-[40px] sm:min-h-[50px] md:min-h-[60px] lg:min-h-[70px] xl:min-h-[80px]"></div>
            ))}

          {/* Render the actual days of the month */}
          {Array.from({ length: daysInMonth }, (_, idx) => idx + 1).map((day) => {
            const dayHasTasks = hasTasks(day);
            const taskCount = getTasksForDay(day, month, year).length;
            const isToday = 
              day === currentDate.getDate() &&
              month === currentDate.getMonth() &&
              year === currentDate.getFullYear();

            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={`relative border bg-white p-0.5 sm:p-1 lg:p-1.5 min-h-[40px] sm:min-h-[50px] md:min-h-[60px] lg:min-h-[70px] xl:min-h-[80px] lg:h-20 rounded transition-all duration-300 cursor-pointer touch-manipulation ${
                  dayHasTasks
                    ? 'bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-300 hover:from-blue-200 hover:to-indigo-200 hover:shadow-md active:scale-95'
                    : 'border-gray-200 hover:bg-blue-50 active:bg-blue-100'
                } ${
                  isToday ? 'ring-2 ring-blue-400 ring-offset-1 sm:ring-offset-2' : ''
                }`}
              >
                <span className={`absolute top-0.5 right-0.5 sm:top-1 sm:right-1 text-[10px] sm:text-xs font-semibold ${
                  dayHasTasks ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {day}
                </span>
                {/* Task indicator */}
                {dayHasTasks && (
                  <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-full px-0.5">
                    <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-blue-500 text-white px-1 sm:px-1.5 lg:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] lg:text-[10px] font-bold shadow-sm">
                      <span>{taskCount}</span>
                      <span className="hidden sm:inline">{taskCount === 1 ? 'task' : 'tasks'}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Tasks Modal */}
      <dialog id="day_tasks_modal" className="modal backdrop-blur-sm">
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
        {selectedDate && (
          <DayTasksModal
            selectedDate={selectedDate}
            tasks={selectedDayTasks}
            onClose={handleCloseModal}
          />
        )}
      </dialog>
    </div>
  );
};

export default Calendar;
