import React from 'react';
import { Outlet } from "react-router-dom";
import Aside from './Aside';
const Layout = () => {
  return (
    <div className="bg-[#d8f3e3] w-full h-screen flex items-center justify-center">
      <div className="flex flex-row items-start justify-start text-center gap-10 bg-white w-[60%] p-[15px] rounded-[20px]">
        <Aside />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
