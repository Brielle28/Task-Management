import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
const Layout = () => {
  return (
    <div className="flex flex-row items-start justify-start text-center gap-10 bg-white w-[100%]  rounded-[20px] px-[30px]">
      <div className="w-[18%] h-screen pt-[25px] border-r-2">
        <Aside /> 
      </div>
      <div  className="w-[72%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
