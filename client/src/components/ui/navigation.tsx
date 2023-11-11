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
} from "lucide-react";

function Navigation() {
  return (
    <div className="flex h-full">
      <nav className="flex flex-col justify-between">
        <div className="px-6 ">
          <Link to={Links.DASHBOARD} className="flex items-center gap-2">
            <BFARLogo cn="w-20 h-18" />
            <BfarHeading sizeClass="text-2xl" />
          </Link>
          <div className="mt-8">
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
        </div>

        <div className="border-t px-6">
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
              <span className="text-muted-foreground text-xs">Super Admin</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow h-full bg-background rounded-lg shadow-md">
        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Navigation;
