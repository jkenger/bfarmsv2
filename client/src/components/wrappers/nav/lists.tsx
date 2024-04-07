import { useNavigation } from "./Navigation";
import {
  ArrowDownToDot,
  Boxes,
  Calendar,
  CalendarClock,
  Caravan,
  CircleDollarSign,
  Contact,
  FileEdit,
  FileMinus2,
  LayoutGrid,
  Luggage,
  SquareStack,
} from "lucide-react";

import { IconProperties, Links, iconPropertiesDefault } from "@/types/common";
import List from "./list";
import ListSection from "./list-section";
import SubLink from "./sub-link";
import { useLocation, useParams } from "react-router-dom";

function Lists() {
  const {
    overViewState,
    handleOverViewState,
    dailyTimeRecordState,
    handleDailyTimeRecordState,
    employeeState,
    handleEmployeeState,
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
    accountState,
    handleAccountState,
  } = useNavigation();

  const icon = {
    size: 14,
    strokeWidth: 2,
  };

  const location = useLocation();
  const path = location.pathname;
  const { id } = useParams();
  return (
    <>
      <List>
        <ListSection
          title="Overview"
          isOpen={overViewState}
          handleOnClick={handleOverViewState}
        />
        {overViewState && (
          <SubLink
            to={Links.DASHBOARD}
            icon={
              <LayoutGrid
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            }
            title="Dashboard"
          />
        )}
      </List>
      <List>
        <ListSection
          title="Overview"
          isOpen={overViewState}
          handleOnClick={handleOverViewState}
        />
        {overViewState && (
          <SubLink
            to={Links.DASHBOARD}
            icon={
              <LayoutGrid
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            }
            title="Dashboard"
          />
        )}
      </List>
      <List>
        <ListSection
          title="Employees"
          isOpen={employeeState}
          handleOnClick={handleEmployeeState}
        />
        {employeeState && (
          <>
            <div className="absolute h-[35px] w-[1.5px] bg-muted-foreground/20 top-[3.3rem] left-[1.95rem] z-0"></div>
            <SubLink
              to={Links.EMPLOYEES}
              icon={
                <Contact
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="Manage Employees"
              end
            />
            <SubLink
              to={Links.DESIGNATIONS}
              icon={
                <ArrowDownToDot
                  size={IconProperties.SIZE}
                  strokeWidth={icon.strokeWidth}
                />
              }
              title="Designations"
            />
          </>
        )}
      </List>
      <List>
        <ListSection
          title="Daily Time Records"
          isOpen={dailyTimeRecordState}
          handleOnClick={handleDailyTimeRecordState}
        />
        {dailyTimeRecordState && (
          <>
            <div className="absolute h-[35px] w-[1.5px] bg-muted-foreground/20 top-[3.3rem] left-[1.95rem] z-0"></div>
            <SubLink
              to={Links.TIME_CARDS}
              icon={
                <CalendarClock
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="Generate DTR"
            />
            <SubLink
              to={Links.DAILY_TIME_RECORDS}
              icon={
                <Calendar
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="Manage DTR"
              end
            />
          </>
        )}
      </List>
      <List>
        <ListSection
          title="Payroll"
          isOpen={payrollState}
          handleOnClick={handlePayrollState}
        />
        {payrollState && (
          <>
            <div className="absolute h-[35px] w-[1.5px] bg-muted-foreground/20 top-[3.3rem] left-[1.95rem] z-0"></div>
            <SubLink
              to={Links.PAYROLL}
              end={
                path !== Links.PAYROLL &&
                path !== Links.PAYROLL + `/${id}/receipt`
              }
              icon={
                <CircleDollarSign
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="Generate Payroll"
            />
            <SubLink
              to={Links.PAYROLL_GROUPS}
              icon={
                <SquareStack
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="Manage Payroll Groups"
            />
          </>
        )}
      </List>
      <List>
        <ListSection
          title="Holidays"
          isOpen={holidayState}
          handleOnClick={handleHolidayState}
        />
        {holidayState && (
          <SubLink
            to={Links.HOLIDAYS}
            icon={
              <Caravan
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            }
            title="Manage Holidays"
          />
        )}
      </List>
      <List>
        <ListSection
          title="Travel Pass"
          isOpen={travelPassState}
          handleOnClick={handleTravelPassState}
        />
        {travelPassState && (
          <SubLink
            to={Links.TRAVELPASS}
            icon={
              <Luggage
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            }
            title="Manage Travel Pass"
          />
        )}
      </List>
      <List>
        <ListSection
          title="Deductions"
          isOpen={deductionState}
          handleOnClick={handleDeductionState}
        />
        {deductionState && (
          <SubLink
            to={Links.DEDUCTIONS}
            icon={
              <FileMinus2
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            }
            title="Manage Deductions"
          />
        )}
      </List>
      <List>
        <ListSection
          title="Leaves"
          isOpen={leaveState}
          handleOnClick={handleLeaveState}
        />
        {leaveState && (
          <>
            <div className="absolute h-[35px] w-[1.5px] bg-muted-foreground/20 top-[3.3rem] left-[1.95rem] z-0"></div>
            <SubLink
              to={Links.LEAVES}
              end
              icon={
                <FileEdit
                  className="z-5"
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="Leave Applications"
            />
            <SubLink
              to={Links.LEAVE_TYPES}
              icon={
                <Boxes
                  className="z-5"
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="Manage Leave Types"
            />
          </>
        )}
      </List>

      <List className="md:hidden">
        <ListSection
          title="Account"
          isOpen={accountState}
          handleOnClick={handleAccountState}
        />
        {accountState && (
          <>
            <SubLink
              to={Links.ACCOUNT_SETTINGS}
              end
              icon={<FileEdit className="z-5" {...iconPropertiesDefault} />}
              title="Settings"
            />
          </>
        )}
      </List>
    </>
  );
}

export default Lists;
