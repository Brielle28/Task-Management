import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook from react-router
import { SideBarItems } from "../../Utils/sideBarItems";

const Aside = () => {
  const location = useLocation(); // Get the current location (current route)

  return (
    <aside>
      <div className="flex flex-col items-start justify-center w-[100%] gap-10">
        <div className="flex flex-row gap-2">
          <img src="/diamond3.png" alt="logo" className="size-[26px] mt-2" />
          <h1 className="text-black font-extrabold text-[26px]">TaskMinder.</h1>
        </div>
        <div className="flex flex-col items-start justify-center gap-4 ml-4">
          {SideBarItems.map((item) => {
            // Check if the current location matches the item's link
            const isActive = location.pathname === item.link;

            return (
              <div
                key={item.id}
                className={`flex flex-row items-center justify-start text-center gap-2 w-[160px] h-[39px] rounded-[7px] 
                  ${isActive ? "bg-blue-500 text-white" : "bg-blue-100 text-black"}`}
              >
                <img src={item.icon} alt={item.title} className="size-[15px] ml-5 bg-transparent" />
                <a href={item.link}>
                  <h5 className="font-normal text-[13px]">{item.title}</h5>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
