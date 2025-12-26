import { useTasks } from "../../../Context/TaskContext";
import { useMemo } from "react";
import { format, addDays, isToday, isPast, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { MdWarning, MdToday, MdCalendarToday, MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaFlag } from "react-icons/fa";

const UpcomingDeadlines = () => {
  const { tasks } = useTasks();

  const { todayTasks, upcomingTasks, overdueTasks } = useMemo(() => {
    const now = new Date();
    const today = startOfDay(now);
    const sevenDaysFromNow = endOfDay(addDays(now, 7));

    const parseDate = (dateString) => {
      if (!dateString) return null;
      try {
        return new Date(dateString);
      } catch {
        return null;
      }
    };

    const todayTasksList = tasks.filter(task => {
      if (!task.endDate) return false;
      const endDate = parseDate(task.endDate);
      if (!endDate || isNaN(endDate.getTime())) return false;
      return isToday(endDate);
    });

    const upcomingTasksList = tasks.filter(task => {
      if (!task.endDate) return false;
      if (task.status === "done") return false;
      const endDate = parseDate(task.endDate);
      if (!endDate || isNaN(endDate.getTime())) return false;
      if (isToday(endDate)) return false;
      return isWithinInterval(endDate, { start: addDays(today, 1), end: sevenDaysFromNow });
    }).sort((a, b) => {
      const dateA = parseDate(a.endDate);
      const dateB = parseDate(b.endDate);
      if (!dateA || !dateB) return 0;
      return dateA - dateB;
    });

    const overdueTasksList = tasks.filter(task => {
      if (!task.endDate) return false;
      if (task.status === "done") return false;
      const endDate = parseDate(task.endDate);
      if (!endDate || isNaN(endDate.getTime())) return false;
      return isPast(endDate) && !isToday(endDate);
    }).sort((a, b) => {
      const dateA = parseDate(a.endDate);
      const dateB = parseDate(b.endDate);
      if (!dateA || !dateB) return 0;
      return dateA - dateB;
    });

    return {
      todayTasks: todayTasksList,
      upcomingTasks: upcomingTasksList.slice(0, 5),
      overdueTasks: overdueTasksList.slice(0, 5),
    };
  }, [tasks]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      if (isToday(date)) return "Today";
      if (isPast(date) && !isToday(date)) return format(date, "MMM d");
      return format(date, "MMM d");
    } catch {
      return dateString;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const TaskItem = ({ task, isOverdue = false }) => (
    <Link
      to="/tasks"
      className={`block p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] border ${
        isOverdue ? "bg-red-50 border-red-200" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 flex-1 line-clamp-2">
            {task.title}
          </h3>
          {task.priority && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
              <FaFlag className="w-3 h-3" />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}
        </div>
        {task.description && (
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{task.description}</p>
        )}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <MdAccessTime className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{formatDate(task.endDate)}</span>
          {task.startDate && (() => {
            try {
              const startDate = new Date(task.startDate);
              if (!isNaN(startDate.getTime())) {
                return (
                  <>
                    <span>•</span>
                    <span>{format(startDate, "hh:mm a")}</span>
                  </>
                );
              }
            } catch {}
            return null;
          })()}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl lg:rounded-[15px] shadow-lg p-4 sm:p-6">
      <div className="flex flex-row items-center justify-between w-full mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MdCalendarToday className="w-5 h-5 sm:w-6 sm:h-6" />
          Upcoming Deadlines
        </h2>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Overdue Tasks */}
        {overdueTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MdWarning className="w-5 h-5 text-red-500" />
              <h3 className="text-sm sm:text-base font-semibold text-red-700">Overdue Tasks</h3>
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {overdueTasks.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              {overdueTasks.map((task) => (
                <TaskItem key={task.id} task={task} isOverdue={true} />
              ))}
            </div>
          </div>
        )}

        {/* Today's Tasks */}
        {todayTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MdToday className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm sm:text-base font-semibold text-blue-700">Today's Tasks</h3>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {todayTasks.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              {todayTasks.slice(0, 5).map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Tasks (Next 7 Days) */}
        {upcomingTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MdCalendarToday className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm sm:text-base font-semibold text-indigo-700">Next 7 Days</h3>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {upcomingTasks.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              {upcomingTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {overdueTasks.length === 0 && todayTasks.length === 0 && upcomingTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <MdCalendarToday className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center">
              No upcoming deadlines
            </p>
            <p className="text-gray-500 text-xs sm:text-sm text-center mt-2">
              All caught up! No tasks due in the next 7 days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;

