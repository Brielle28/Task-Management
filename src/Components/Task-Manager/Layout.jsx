import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
const Layout = () => {
  return (
    <div className="flex flex-row items-start justify-start text-start gap-10 bg-white w-[100%]  rounded-[20px] px-[30px]">
      <div className="w-[18%] pt-[25px] ">
        <Aside /> 
      </div>
      <div  className="w-[72%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
