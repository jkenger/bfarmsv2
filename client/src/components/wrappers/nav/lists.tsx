import { useNavigation } from "./Navigation";
import {
  ArrowDownToDot,
  Boxes,
  Calendar,
  Caravan,
  CircleDollarSign,
  Contact,
  FileEdit,
  FileMinus2,
  LayoutGrid,
  Luggage,
  SquareStack,
} from "lucide-react";

import { IconProperties, Links } from "@/types/common";
import List from "./list";
import ListSection from "./list-section";
import SubLink from "./sub-link";

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
  } = useNavigation();

  const icon = {
    size: 14,
    strokeWidth: 2,
  };

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
              title="All Records"
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
          <SubLink
            to={Links.DAILY_TIME_RECORDS}
            icon={
              <Calendar
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            }
            title="All Records"
          />
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
              end
              icon={
                <CircleDollarSign
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="All Records"
            />
            <SubLink
              to={Links.PAYROLL_GROUPS}
              icon={
                <SquareStack
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
              }
              title="Groups"
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
            title="All Records"
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
            title="All Records"
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
            title="All Records"
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
              title="All Records"
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
              title="Types"
            />
          </>
        )}
      </List>
    </>
  );
}

export default Lists;
