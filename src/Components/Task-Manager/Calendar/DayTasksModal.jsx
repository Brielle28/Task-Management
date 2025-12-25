import { format, parseISO, isValid } from "date-fns";
import { MdClose, MdAccessTime } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const DayTasksModal = ({ selectedDate, tasks, onClose }) => {
  const safeFormatDate = (dateString, formatStr) => {
    if (!dateString) return "Invalid Date";
    const date = parseISO(dateString);
    return isValid(date) ? format(date, formatStr) : "Invalid Date";
  };

  const formatSelectedDate = (date) => {
    if (!date) return "";
    return format(date, "EEEE, MMMM d, yyyy");
  };

  return (
    <div className="modal-box w-[95%] sm:w-11/12 max-w-2xl max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden animate-slideUp bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-5 lg:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="p-1.5 sm:p-2 bg-white bg-opacity-20 rounded-lg flex-shrink-0">
              <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold truncate">Tasks for {formatSelectedDate(selectedDate)}</h2>
              <p className="text-blue-100 text-xs sm:text-sm mt-0.5 sm:mt-1">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200 flex-shrink-0 ml-2 active:scale-95"
            aria-label="Close modal"
          >
            <MdClose className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-120px)] bg-white">
          {tasks.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-base sm:text-lg">No tasks for this day</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 break-words">{task.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 break-words">{task.description}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <MdAccessTime className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">
                            {safeFormatDate(task.startDate, "hh:mm a")} - {safeFormatDate(task.endDate, "hh:mm a")}
                          </span>
                        </div>
                        <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${
                          task.status === 'done' ? 'bg-green-100 text-green-700' :
                          task.status === 'inprogress' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {task.status === 'done' ? 'Done' : task.status === 'inprogress' ? 'In Progress' : 'To Do'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
};

export default DayTasksModal;

