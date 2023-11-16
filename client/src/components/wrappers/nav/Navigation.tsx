import { Link, Outlet } from "react-router-dom";
import BFARLogo from "../../ui/logo";
import BfarHeading from "../../ui/bfar-heading";
import { Links } from "@/types";
import { Menu } from "lucide-react";
import { createContext, useContext, useState } from "react";
import NavLinkLists from "./nav-linklists";
import NavAvatar from "./nav-avatar";
import Main from "../Main";
import { ModeToggle } from "@/components/ui/mode-toggle";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

type TNavigationContext = {
  isMenuOpen: boolean;
  handleMenuOpen: () => React.SetStateAction<boolean>;
  overViewState: boolean;
  handleOverViewState: () => React.SetStateAction<boolean>;
  employeeState: boolean;
  handleEmployeeState: () => React.SetStateAction<boolean>;
  dailyTimeRecordState: boolean;
  handleDailyTimeRecordState: () => React.SetStateAction<boolean>;
  payrollState: boolean;

  handlePayrollState: () => React.SetStateAction<boolean>;
  holidayState: boolean;
  handleHolidayState: () => React.SetStateAction<boolean>;
  travelPassState: boolean;
  handleTravelPassState: () => React.SetStateAction<boolean>;
  deductionState: boolean;
  handleDeductionState: () => React.SetStateAction<boolean>;
  leaveState: boolean;
  handleLeaveState: () => React.SetStateAction<boolean>;
};

const NavigationContext = createContext<TNavigationContext | null>(null);

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overViewState, setOverViewState] = useState(true);
  const [employeeState, setEmployeeState] = useState(true);
  const [dailyTimeRecordState, setDailyTimeRecordState] = useState(true);
  const [payrollState, setPayrollState] = useState(true);
  const [holidayState, setHolidayState] = useState(true);
  const [travelPassState, setTravelPassState] = useState(true);
  const [deductionState, setDeductionState] = useState(true);
  const [leaveState, setLeaveState] = useState(true);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOverViewState = () => {
    setOverViewState(!overViewState);
  };
  const handleEmployeeState = () => {
    setEmployeeState(!employeeState);
  };
  const handleDailyTimeRecordState = () => {
    setDailyTimeRecordState(!dailyTimeRecordState);
  };
  const handlePayrollState = () => {
    setPayrollState(!payrollState);
  };
  const handleHolidayState = () => {
    setHolidayState(!holidayState);
  };
  const handleTravelPassState = () => {
    setTravelPassState(!travelPassState);
  };
  const handleDeductionState = () => {
    setDeductionState(!deductionState);
  };
  const handleLeaveState = () => {
    setLeaveState(!leaveState);
  };

  const value = {
    isMenuOpen,
    handleMenuOpen,
    overViewState,
    handleOverViewState,
    employeeState,
    handleEmployeeState,
    dailyTimeRecordState,
    handleDailyTimeRecordState,
    payrollState,
    handlePayrollState,
    holidayState,
    handleHolidayState,
    travelPassState,
    handleTravelPassState,
    deductionState,
    handleDeductionState,
    leaveState,
    handleLeaveState,
  } as TNavigationContext;
  return (
    <NavigationContext.Provider value={value}>
      <TopNav />
      <div className={`flex flex-col md:flex-row`}>
        <SideNav />
        <Main>
          <Outlet />
        </Main>
      </div>
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}

export default Navigation;
