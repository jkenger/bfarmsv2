import { Links } from "@/types";
import {
  BadgeDollarSign,
  Briefcase,
  CalendarDays,
  CandyCane,
  FileMinus2,
  FileSignature,
  LayoutGrid,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {
  className?: string;
};

function NavLinkLists({ className }: Props) {
  return (
    <div className={className}>
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
            to={Links.EMPLOYEES}
            className="flex items-center gap-2  rounded-md p-2"
          >
            <CalendarDays size={16} strokeWidth={2} />
            <span>Employees</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={Links.DAILY_TIME_RECORDS}
            className="flex items-center gap-2  rounded-md p-2"
          >
            <CalendarDays size={16} strokeWidth={2} />
            <span>Daily Time Record</span>
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
  );
}

export default NavLinkLists;
