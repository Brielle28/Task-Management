import { useTasks } from "../../../Context/TaskContext";
import { getRecentlyOpenedTasks } from "../../../Services/taskService";
import { formatDistanceToNow } from "date-fns";
import { MdAccessTime, MdCheckCircle, MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiHourglass } from "react-icons/pi";
import { Link } from "react-router-dom";

const DashboardProjectListDisplay = () => {
  const { tasks } = useTasks();
  const recentlyOpened = getRecentlyOpenedTasks();

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <MdCheckCircle className="w-4 h-4 text-green-500" />;
      case "inprogress":
        return <PiHourglass className="w-4 h-4 text-yellow-500" />;
      default:
        return <MdCheckBoxOutlineBlank className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-700";
      case "inprogress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Never";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full h-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl lg:rounded-[15px] shadow-lg p-4 sm:p-6 overflow-hidden">
      <div className="flex flex-row items-center justify-between w-full mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Recently Opened Tasks</h2>
        {recentlyOpened.length > 0 && (
          <span className="text-xs sm:text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
            {recentlyOpened.length} task{recentlyOpened.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {recentlyOpened.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full py-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <MdAccessTime className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center">
            No recently opened tasks
          </p>
          <p className="text-gray-500 text-xs sm:text-sm text-center mt-2">
            Tasks you view or edit will appear here
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4 w-full overflow-y-auto max-h-[calc(100%-80px)]">
          {recentlyOpened.map((task) => {
            const taskFromContext = tasks.find(t => t.id === task.id);
            if (!taskFromContext) return null;

            return (
              <Link
                key={task.id}
                to="/tasks"
                className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] border border-blue-100"
              >
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="flex flex-row items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 flex-1 line-clamp-2">
                      {taskFromContext.title}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {getStatusIcon(taskFromContext.status)}
                    </div>
                  </div>
                  
                  {taskFromContext.description && (
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {taskFromContext.description}
                    </p>
                  )}

                  <div className="flex flex-row items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(taskFromContext.status)}`}>
                        {taskFromContext.status === "done" ? "Done" : 
                         taskFromContext.status === "inprogress" ? "In Progress" : "To Do"}
                      </span>
                      {taskFromContext.priority && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          taskFromContext.priority === 'high' ? 'bg-red-100 text-red-700' :
                          taskFromContext.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {taskFromContext.priority.charAt(0).toUpperCase() + taskFromContext.priority.slice(1)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MdAccessTime className="w-3 h-3" />
                      <span>{formatTime(task.lastViewed || task.lastEdited)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardProjectListDisplay;
