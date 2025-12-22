import { Link, useLocation } from "react-router-dom";
import { SideBarItems } from "../../Utils/sideBarItems";

const Aside = ({ onClose = null }) => {
  const location = useLocation();

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="h-full lg:h-screen overflow-y-auto bg-white w-full">
      <div className="flex flex-col items-start justify-start w-full gap-6 px-4 lg:gap-8 xl:gap-10 lg:px-4 xl:px-6 py-4 lg:py-0">
        <div className="flex flex-row items-center gap-2 w-full">
          <img src="/diamond3.png" alt="logo" className="size-6 lg:size-7 xl:size-[26px] mt-1 lg:mt-2 flex-shrink-0" />
          <h1 className="text-black font-extrabold text-xl lg:text-2xl xl:text-[26px] whitespace-nowrap">TaskMinder.</h1>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3 lg:gap-4 xl:gap-5">
          {SideBarItems.map((item) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                to={item.link}
                key={item.id}
                onClick={handleLinkClick}
                className={`flex flex-row items-center justify-start gap-2 w-full h-10 lg:h-11 xl:h-[39px] rounded-lg lg:rounded-[7px] px-3 lg:px-4 xl:px-5 transition-all duration-200 hover:scale-105
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-blue-100 text-black hover:bg-blue-200"
                  }`}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="size-4 lg:size-5 xl:size-[15px] flex-shrink-0 bg-transparent"
                />
                <h5 className="font-normal text-sm lg:text-base xl:text-[13px] whitespace-nowrap truncate">{item.title}</h5>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
