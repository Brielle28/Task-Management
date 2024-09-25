// import React from "react";
// import { format, isSameDay } from "date-fns";
// import { CiEdit } from "react-icons/ci";
// import { MdDeleteForever } from "react-icons/md";
// import { CiSearch } from "react-icons/ci";

// const defaultTasks = [
//   {
//     date: "2024-08-15",
//     title: "Meeting with Team",
//     description:
//       "A one-hour meeting with the core project team to discuss the current status of all ongoing tasks. We will review progress, address blockers, and finalize key action points for the next sprint. The meeting will be held in the main conference room and will include a presentation of last week’s deliverables.",
//     startTime: "2024-08-15T09:00:00",
//     endTime: "2024-08-15T10:00:00",
//   },
//   {
//     date: "2024-08-15",
//     title: "Desktop UI",
//     description:
//       "A dedicated work session to design, iterate, and refine the desktop interface of our application. This session will involve working closely with the design team to implement feedback from the user experience testing phase. It will focus on responsiveness, accessibility, and visual consistency across multiple devices.",
//     startTime: "2024-08-15T10:00:00",
//     endTime: "2024-08-15T18:00:00",
//   },
//   {
//     date: "2024-08-16",
//     title: "Infographic",
//     description:
//       "A creative morning session focused on producing a high-quality infographic for our marketing campaign. This infographic will summarize key data insights from our recent survey, presenting them in an engaging and visually appealing manner. Collaboration with the marketing and data analytics teams will be essential.",
//     startTime: "2024-08-16T09:00:00",
//     endTime: "2024-08-16T12:00:00",
//   },
//   {
//     date: "2024-08-16",
//     title: "Mobile App",
//     description:
//       "An afternoon development session focused on building out the core features of our mobile application. We will prioritize optimizing the user experience for mobile users, ensuring seamless navigation and performance across both iOS and Android platforms. This session will also involve integrating backend services to support new features.",
//     startTime: "2024-08-16T13:00:00",
//     endTime: "2024-08-16T17:00:00",
//   },
//   {
//     date: "2024-08-17",
//     title: "Client Presentation Preparation",
//     description:
//       "A full-day session devoted to preparing for the upcoming client presentation. We will be finalizing presentation slides, running through a demo of the current product, and rehearsing the key talking points to ensure a polished delivery. This will also include a final review of the project roadmap and the client’s feedback from previous meetings.",
//     startTime: "2024-08-17T09:00:00",
//     endTime: "2024-08-17T17:00:00",
//   },
//   {
//     date: "2024-08-18",
//     title: "Code Review Session",
//     description:
//       "A comprehensive session to review the latest code submissions from the development team. Each team member will present their commits, and we will go over potential optimizations, adherence to coding standards, and areas for refactoring. This will ensure code quality, performance, and maintainability as we move towards the next release.",
//     startTime: "2024-08-18T10:00:00",
//     endTime: "2024-08-18T14:00:00",
//   },
//   {
//     date: "2024-08-19",
//     title: "User Testing Workshop",
//     description:
//       "A hands-on workshop where we will conduct live user testing of the beta version of the product. We will invite a selected group of users to try out various features, gather feedback, and observe how they interact with the application. The goal is to identify any usability issues and areas for improvement before the public release.",
//     startTime: "2024-08-19T11:00:00",
//     endTime: "2024-08-19T16:00:00",
//   },
// ];

// const Projects = ({ tasks = defaultTasks }) => {
//   const groupedTasks = tasks.reduce((acc, task) => {
//     const dateKey = format(new Date(task.date), "yyyy-MM-dd");
//     if (!acc[dateKey]) {
//       acc[dateKey] = [];
//     }
//     acc[dateKey].push(task);
//     return acc;
//   }, {});

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center mt-[50px] w-[90%] ml-[80px] gap-10">
//         {/* search form */}
//         <div className="relative w-full">
//           <input
//             type="text"
//             placeholder="Find a specific project here"
//             className="input input-bordered w-full h-10 rounded-[20px] outline outline-[1px] outline-blue-200 placeholder-gray-500 placeholder-opacity-70 placeholder-italic text-gray-700 pl-10 pr-4"
//           />
//           <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//         </div>

//         {/* displaying of tasks  */}
//         <div className=" bg-blue-50 p-4 rounded-lg shadow-md  w-full">
//           {Object.entries(groupedTasks).map(([dateKey, dateTasks]) => (
//             <div key={dateKey} className="mb-6">
//               <div className="flex items-center mb-2">
//                 <div className="text-blue-500 text-xl font-semibold uppercase mr-4">
//                   {format(new Date(dateKey), "MMMM")}
//                 </div>
//                 <div className="text-2xl text-blue-500 font-bold mb-1">
//                   {format(new Date(dateKey), "d")}
//                 </div>
//               </div>
//               <div className="border-l-2 border-gray-300 ml-2 pl-4">
//                 {dateTasks.map((task, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-lg p-5 mb-2 shadow flex justify-between items-start gap-5"
//                   >
//                     {/* Title of the task and time */}
//                     <div className=" flex flex-col items-start justify-center w-[40%]">
//                       <h3 className="font-bold text-[13px] font-sans">
//                         {task.title}
//                       </h3>
//                       <p className="text-[13px] text-slate-600">
//                         {format(new Date(task.startTime), "hh:mm a")} -{" "}
//                         {format(new Date(task.endTime), "hh:mm a")}
//                       </p>
//                     </div>
//                     {/* Description of the task */}
//                     <div className="flex flex-col items-start justify-center ">
//                       <h3 className="text-[13px] font-sans font-semibold">
//                         {" "}
//                         Description{" "}
//                       </h3>
//                       <p className="text-[14px] font-sans font-normal">
//                         {task.description}
//                       </p>
//                     </div>
//                     {/* edit and delete buttons */}
//                     <button className="flex flex-row items-center justify-center gap-3">
//                       <CiEdit className="text-yellow-500 hover:text-yellow-600 " />
//                       <MdDeleteForever className="text-red-600 hover:text-red-700" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Projects;


// thrid instance of the code
import { useState, useEffect } from "react";
import { format, parseISO, isValid } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import {getTasksFromLocalStorage} from "../../../Services/taskService"
import {deleteTask} from "../../../Services/taskService"


const Projects = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();  // getTasksFromLocalStorage is a function in the taskService file
    setTasks(storedTasks);
  }, []);

  const handleDelete = (id) => {
    deleteTask(id); // deleteTask is a function in the taskService file
    setTasks(getTasksFromLocalStorage()); // Refresh tasks after deletion
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for task ID: ${id}`);
    // You can add the modal or redirect logic for editing here
  };

  const safeFormatDate = (dateString, formatStr) => {
    if (!dateString) return "Invalid Date";
    const date = parseISO(dateString);
    return isValid(date) ? format(date, formatStr) : "Invalid Date";
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const dateKey = safeFormatDate(task.startDate, "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {});

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[50px] w-[90%] ml-[80px] gap-10">
        {/* search form */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a specific project based on title here"
            className="input input-bordered w-full h-10 rounded-[20px] outline outline-[1px] outline-blue-200 placeholder-gray-500 placeholder-opacity-70 placeholder-italic text-gray-700 pl-10 pr-4"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* displaying of tasks */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md w-full">
          {Object.entries(groupedTasks).map(([dateKey, dateTasks]) => (
            <div key={dateKey} className="mb-6">
              <div className="flex items-center mb-2">
                <div className="text-blue-500 text-xl font-semibold uppercase mr-4">
                  {safeFormatDate(dateKey, "MMMM")}
                </div>
                <div className="text-2xl text-blue-500 font-bold mb-1">
                  {safeFormatDate(dateKey, "d")}
                </div>
              </div>
              <div className="border-l-2 border-gray-300 ml-2 pl-4">
                {dateTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg p-5 mb-2 shadow flex justify-between items-start gap-5"
                  >
                    {/* Title of the task and time */}
                    <div className="flex flex-col items-start justify-center w-[40%]">
                      <h3 className="font-bold text-[13px] font-sans">
                        {task.title}
                      </h3>
                      <p className="text-[13px] text-slate-600">
                        {safeFormatDate(task.startDate, "hh:mm a")} -{" "}
                        {safeFormatDate(task.endDate, "hh:mm a")}
                      </p>
                    </div>
                    {/* Description of the task */}
                    <div className="flex flex-col items-start justify-center">
                      <h3 className="text-[13px] font-sans font-semibold">
                        Description
                      </h3>
                      <p className="text-[14px] font-sans font-normal">
                        {task.description}
                      </p>
                    </div>
                    {/* edit and delete buttons */}
                    <div className="flex flex-row items-center gap-3">
                      <button onClick={() => handleEdit(task.id)}>
                        <CiEdit className="text-yellow-500 hover:text-yellow-600" />
                      </button>
                      <button onClick={() => handleDelete(task.id)}>
                        <MdDeleteForever className="text-red-600 hover:text-red-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;