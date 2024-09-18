import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Button from "../../ButtonFolder/Button";

const Calendar = () => {
  // Mock tasks with dates
  const defaultTasks = [
    {
      date: "2024-08-15",
      title: "Meeting with Team",
      description: "Team meeting to discuss the project.",
      startTime: "2024-08-15T09:00:00",
      endTime: "2024-08-15T10:00:00",
    },
    {
      date: "2024-08-16",
      title: "Infographic Session",
      description: "Creating an infographic for the project.",
      startTime: "2024-08-16T09:00:00",
      endTime: "2024-08-16T12:00:00",
    },
    {
      date: "2024-09-10",
      title: "Design Review",
      description: "Review UI changes with the design team.",
      startTime: "2024-09-10T11:00:00",
      endTime: "2024-09-10T12:30:00",
    },
    {
      date: "2024-09-15",
      title: "Sprint Planning",
      description: "Plan tasks for the upcoming sprint.",
      startTime: "2024-09-15T10:00:00",
      endTime: "2024-09-15T12:00:00",
    },
    {
      date: "2024-09-21",
      title: "Feature Demo",
      description: "Showcase the new features to stakeholders.",
      startTime: "2024-09-21T14:00:00",
      endTime: "2024-09-21T15:00:00",
    },
    {
      date: "2024-10-03",
      title: "Team Retrospective",
      description: "Reflect on the last sprint and discuss improvements.",
      startTime: "2024-10-03T09:00:00",
      endTime: "2024-10-03T10:00:00",
    },
    {
      date: "2024-10-12",
      title: "Bug Fixing Session",
      description: "A session focused on fixing critical bugs.",
      startTime: "2024-10-12T10:00:00",
      endTime: "2024-10-12T14:00:00",
    },
    {
      date: "2024-10-23",
      title: "Marketing Strategy Meeting",
      description: "Discuss new marketing strategies with the team.",
      startTime: "2024-10-23T13:00:00",
      endTime: "2024-10-23T14:30:00",
    },
    {
      date: "2024-11-02",
      title: "Backend Integration",
      description: "Integrate the backend services with the frontend.",
      startTime: "2024-11-02T11:00:00",
      endTime: "2024-11-02T15:00:00",
    },
    {
      date: "2024-11-14",
      title: "Code Freeze",
      description: "Freeze all new code changes before the release.",
      startTime: "2024-11-14T09:00:00",
      endTime: "2024-11-14T10:00:00",
    },
    {
      date: "2024-11-25",
      title: "Launch Preparation",
      description: "Prepare for the product launch.",
      startTime: "2024-11-25T12:00:00",
      endTime: "2024-11-25T16:00:00",
    },
    {
      date: "2024-12-05",
      title: "Client Wrap-Up",
      description: "Wrap up the project with a final meeting with the client.",
      startTime: "2024-12-05T10:00:00",
      endTime: "2024-12-05T11:30:00",
    },
    {
      date: "2024-12-15",
      title: "Year-End Review",
      description: "Review overall performance for the year.",
      startTime: "2024-12-15T14:00:00",
      endTime: "2024-12-15T15:30:00",
    },

    // Add more tasks as needed
  ];

  // Get the current date
  const currentDate = new Date();

  // Use state to keep track of the selected year and month
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth()); // 0 = January, 11 = December

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
    <div className="flex flex-col w-full max-w-5xl mx-auto pt-10  gap-7">
      <div className="flex items-center justify-between w-full ">
        <h1 className="text-2xl font-bold mb-4 text-blue-600 ">My Schedule</h1>
        <Button />
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
          {Array.from({ length: daysInMonth }, (_, idx) => idx + 1).map(
            (day) => (
              <div key={day} className="relative border p-2 h-20">
                <span className="absolute top-1 right-1 text-xs">{day}</span>
                {defaultTasks.map((task) =>
                  new Date(task.startTime).getDate() === day &&
                  new Date(task.startTime).getMonth() === month &&
                  new Date(task.startTime).getFullYear() === year ? (
                    <div
                      key={task.title}
                      className="bg-purple-200 p-1 rounded text-xs text-purple-700 mt-2"
                    >
                      {task.title}
                    </div>
                  ) : null
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
