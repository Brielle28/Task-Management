import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Layout from "./Components/Task-Manager/Layout";
import Dashboard from "./Components/Task-Manager/Dashboard/Dashboard";
import Projects from "./Components/Task-Manager/Projects/Projects";
import Tasks from "./Components/Task-Manager/Tasks/Tasks";
import Calendar from "./Components/Task-Manager/Calendar/Calendar";

const routing = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Dashboard />,
        path: "",
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={routing} />;
};

export default AppRouter;
