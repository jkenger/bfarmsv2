import { Link, NavLink, Outlet } from "react-router-dom";
import BFARLogo from "./logo";
import BfarHeading from "./bfar-heading";
import { Links } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  BadgeDollarSign,
  Briefcase,
  CalendarDays,
  CandyCane,
  FileMinus2,
  FileSignature,
  LayoutGrid,
  Menu,
} from "lucide-react";
import { useTheme } from "../context/theme-provider";
import useMediaQuery from "../hooks/useMediaQuery";
import { useState } from "react";

function Navigation() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={` flex flex-col md:flex-row h-full`}>
      <nav
        className={`
        ${isMobile && " w-full top-0 pt-6"} 
        flex flex-col justify-between `}
      >
        <div className="px-6">
          <div className="flex justify-between items-center mb-6">
            <Link to={Links.DASHBOARD}>
              <div className="flex items-center gap-2">
                <BFARLogo cn="w-20 h-18" />
                <BfarHeading sizeClass="text-2xl" />
              </div>
            </Link>
            {isMobile && (
              <Menu
                size={24}
                strokeWidth={1}
                className="mr-2 hover:cursor-pointer"
                onClick={handleMenuOpen}
              />
            )}
          </div>
          {/* Always show menu on desktop mode */}
          {/* Desktop Links */}
          {!isMobile && (
            <div className="md:block my-8 ">
              <ul className="flex flex-col gap-2 mt-4 text-sm font-semibold tracking-wide">
                <li>
                  <NavLink
                    to={Links.DASHBOARD}
                    className="flex items-center gap-2 rounded-md p-2"
                  >
                    <LayoutGrid size={16} strokeWidth={2} />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.ATTENDANCE}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <CalendarDays size={16} strokeWidth={2} />
                    <span>Attendance</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.PAYROLL}
                    className="flex items-center gap-2 rounded-md p-2"
                  >
                    <BadgeDollarSign size={16} strokeWidth={2} />
                    <span>Payroll</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.HOLIDAYS}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <CandyCane size={16} strokeWidth={2} />
                    <span>Holidays</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.TRAVELPASS}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <Briefcase size={16} strokeWidth={2} />
                    <span>Travel Pass</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.DEDUCTIONS}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <FileMinus2 size={16} strokeWidth={2} />
                    <span>Deductions</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.LEAVES}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <FileSignature size={16} strokeWidth={2} />
                    <span>Leaves</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* For Desktop Avatar*/}
        {!isMobile && (
          <div className="md:block border-t px-6">
            <div className="flex items-center gap-2 py-4">
              <Avatar>
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide">
                  John Doe
                </span>
                <span className="text-muted-foreground text-xs">
                  Super Admin
                </span>
              </div>
            </div>
          </div>
        )}

        {/* For Mobile Links And Avatar*/}
        {isMobile && isMenuOpen && (
          <div
            className={`absolute top-[7em] w-full ${
              theme === "light" ? "bg-muted" : "bg-background"
            } h-full`}
          >
            <div className="md:block mb-8 px-6">
              <ul
                className="flex flex-col gap-2 mt-4 text-sm font-semibold tracking-wide"
                onClick={handleMenuOpen}
              >
                <li>
                  <NavLink
                    to={Links.DASHBOARD}
                    className="flex items-center gap-2 rounded-md p-2"
                  >
                    <LayoutGrid size={16} strokeWidth={2} />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.ATTENDANCE}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <CalendarDays size={16} strokeWidth={2} />
                    <span>Attendance</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.PAYROLL}
                    className="flex items-center gap-2 rounded-md p-2"
                  >
                    <BadgeDollarSign size={16} strokeWidth={2} />
                    <span>Payroll</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.HOLIDAYS}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <CandyCane size={16} strokeWidth={2} />
                    <span>Holidays</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.TRAVELPASS}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <Briefcase size={16} strokeWidth={2} />
                    <span>Travel Pass</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.DEDUCTIONS}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <FileMinus2 size={16} strokeWidth={2} />
                    <span>Deductions</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Links.LEAVES}
                    className="flex items-center gap-2  rounded-md p-2"
                  >
                    <FileSignature size={16} strokeWidth={2} />
                    <span>Leaves</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="md:block border-t px-6">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarImage
                    src="https://i.pravatar.cc/150?img=11"
                    alt="Avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-wide">
                    John Doe
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Super Admin
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      <main
        className={`flex-grow h-full rounded-lg shadow-md mx-6 md:mx-0 ${
          theme === "light" ? "bg-background" : "bg-muted"
        }`}
      >
        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Navigation;
