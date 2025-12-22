import { useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
import { HiMenu, HiX } from "react-icons/hi";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-start text-start bg-white w-full min-h-screen rounded-[20px] px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed z-50 p-2 text-white transition-colors bg-blue-500 rounded-lg shadow-lg lg:hidden top-4 left-4 hover:bg-blue-600"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 lg:w-[220px] xl:w-[240px] 2xl:w-[260px] pt-8 lg:pt-[25px] bg-white lg:bg-transparent border-r lg:border-r-2 border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}
      >
        <Aside onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full lg:w-[calc(100%-220px)] xl:w-[calc(100%-240px)] 2xl:w-[calc(100%-260px)] pt-16 lg:pt-0 bg-white lg:pl-6 xl:pl-8 2xl:pl-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
