import { useTasks } from "../../../Context/TaskContext";
import { useMemo } from "react";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { FaChartLine, FaFlag, FaClock, FaArrowUp } from "react-icons/fa";

const TaskStatistics = () => {
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Basic counts
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter(t => t.status === "done");
    const inProgressTasks = tasks.filter(t => t.status === "inprogress");
    const todoTasks = tasks.filter(t => t.status === "todo");

    // Completion rate
    const completionRate = totalTasks > 0 ? Math.round((doneTasks.length / totalTasks) * 100) : 0;

    // Priority breakdown
    const priorityBreakdown = {
      high: tasks.filter(t => t.priority === "high").length,
      medium: tasks.filter(t => t.priority === "medium").length,
      low: tasks.filter(t => t.priority === "low").length,
      none: tasks.filter(t => !t.priority || (t.priority !== "high" && t.priority !== "medium" && t.priority !== "low")).length,
    };

    // Average completion time (for done tasks with dates)
    const completedWithDates = doneTasks.filter(t => {
      if (!t.startDate || !t.endDate) return false;
      try {
        const start = new Date(t.startDate);
        const end = new Date(t.endDate);
        return !isNaN(start.getTime()) && !isNaN(end.getTime());
      } catch {
        return false;
      }
    });

    let avgCompletionTime = 0;
    if (completedWithDates.length > 0) {
      const totalDays = completedWithDates.reduce((sum, task) => {
        try {
          const start = new Date(task.startDate);
          const end = new Date(task.endDate);
          const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
          return sum + (days > 0 ? days : 0);
        } catch {
          return sum;
        }
      }, 0);
      avgCompletionTime = Math.round(totalDays / completedWithDates.length);
    }

    // Weekly trends
    const tasksThisWeek = tasks.filter(t => {
      if (!t.startDate) return false;
      try {
        const taskDate = new Date(t.startDate);
        if (isNaN(taskDate.getTime())) return false;
        return isWithinInterval(taskDate, { start: startOfDay(weekStart), end: endOfDay(weekEnd) });
      } catch {
        return false;
      }
    });

    const doneThisWeek = doneTasks.filter(t => {
      if (!t.endDate) return false;
      try {
        const taskDate = new Date(t.endDate);
        if (isNaN(taskDate.getTime())) return false;
        return isWithinInterval(taskDate, { start: startOfDay(weekStart), end: endOfDay(weekEnd) });
      } catch {
        return false;
      }
    });

    // Monthly trends
    const tasksThisMonth = tasks.filter(t => {
      if (!t.startDate) return false;
      try {
        const taskDate = new Date(t.startDate);
        if (isNaN(taskDate.getTime())) return false;
        return isWithinInterval(taskDate, { start: startOfDay(monthStart), end: endOfDay(monthEnd) });
      } catch {
        return false;
      }
    });

    const doneThisMonth = doneTasks.filter(t => {
      if (!t.endDate) return false;
      try {
        const taskDate = new Date(t.endDate);
        if (isNaN(taskDate.getTime())) return false;
        return isWithinInterval(taskDate, { start: startOfDay(monthStart), end: endOfDay(monthEnd) });
      } catch {
        return false;
      }
    });

    return {
      totalTasks,
      doneTasks: doneTasks.length,
      inProgressTasks: inProgressTasks.length,
      todoTasks: todoTasks.length,
      completionRate,
      priorityBreakdown,
      avgCompletionTime,
      completedWithDatesCount: completedWithDates.length,
      tasksThisWeek: tasksThisWeek.length,
      doneThisWeek: doneThisWeek.length,
      tasksThisMonth: tasksThisMonth.length,
      doneThisMonth: doneThisMonth.length,
    };
  }, [tasks]);

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl lg:rounded-[15px] shadow-lg p-4 sm:p-6">
      <div className="flex flex-row items-center justify-between w-full mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6" />
          Task Statistics
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Completion Rate */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaArrowUp className="w-4 h-4 text-blue-500" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">Completion Rate</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.completionRate}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>

        {/* Average Completion Time */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="w-4 h-4 text-purple-500" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">Avg. Completion</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-800">
            {stats.completedWithDatesCount > 0 ? `${stats.avgCompletionTime}d` : "0d"}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.completedWithDatesCount > 0 ? "Days per task" : "No completed tasks"}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="w-4 h-4 text-green-500" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">This Week</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.doneThisWeek}</div>
          <div className="text-xs text-gray-500 mt-1">of {stats.tasksThisWeek} tasks</div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="w-4 h-4 text-indigo-500" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">This Month</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.doneThisMonth}</div>
          <div className="text-xs text-gray-500 mt-1">of {stats.tasksThisMonth} tasks</div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <FaFlag className="w-4 h-4 text-orange-500" />
          <span className="text-sm sm:text-base font-semibold text-gray-800">Priority Breakdown</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex flex-col items-center p-2 sm:p-3 bg-red-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.priorityBreakdown.high}</div>
            <div className="text-xs sm:text-sm text-red-700 font-medium">High</div>
          </div>
          <div className="flex flex-col items-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.priorityBreakdown.medium}</div>
            <div className="text-xs sm:text-sm text-yellow-700 font-medium">Medium</div>
          </div>
          <div className="flex flex-col items-center p-2 sm:p-3 bg-green-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.priorityBreakdown.low}</div>
            <div className="text-xs sm:text-sm text-green-700 font-medium">Low</div>
          </div>
          <div className="flex flex-col items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-gray-600">{stats.priorityBreakdown.none}</div>
            <div className="text-xs sm:text-sm text-gray-700 font-medium">None</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;

