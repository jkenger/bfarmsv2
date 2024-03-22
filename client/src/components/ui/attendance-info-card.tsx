import StatsCard from "./StatsCard";
import { User } from "lucide-react";
import { format } from "date-fns";

type Props = {
  data: TDailyTimeRecord;
};

function AttendanceInfoCard({ data }: Props) {
  const currentDay = new Date().getDay();
  // const currentDay = new Date().getDay();
  const days = [
    { day: "Sun", value: 0, isAbsent: null },
    { day: "Mon", value: 1, isAbsent: null },
    { day: "Tue", value: 2, isAbsent: null },
    { day: "Wed", value: 3, isAbsent: null },
    { day: "Thu", value: 4, isAbsent: null },
    { day: "Fri", value: 5, isAbsent: null },
    { day: "Sat", value: 6, isAbsent: null },
  ];

  const getAttendanceStatus = (dayValue: number) => {
    return data.user.attendances.length
      ? data.user.attendances
          .map((attendance) =>
            new Date(attendance.attendanceDate ?? "").getDay()
          )
          .includes(dayValue)
        ? false
        : true
      : true;
  };
  const newDays = days.map((day) => ({
    ...day,
    isAbsent: getAttendanceStatus(day.value),
  }));
  console.log(newDays);
  return (
    <StatsCard>
      <StatsCard.Header>
        <div className="bg-bfar mr-4">
          {/* Employee Avatar */}
          <User className="w-6 h-6" strokeWidth={1} />
        </div>
        <div className="flex flex-col">
          <span className=" font-semibold">{data.user.fullName}</span>
          <span className="text-muted-foreground">
            {data.user.designation?.name || "No Designation"}
          </span>
          <span className="text-muted-foreground">
            {data.user.payrollGroup?.name || "No Payroll Group"}
          </span>
        </div>
      </StatsCard.Header>
      <StatsCard.Body className="flex flex-col text-sm gap-2 px-4">
        <div className="flex gap-2">
          <h2 className="font-medium">Attendance Report</h2>
        </div>
        <div
          className="flex justify-around  flex-wrap py-2 px-4 
 bg-background border rounded gap-2"
        >
          <div className="flex flex-col text-xs justify-center">
            <span className="text-muted-foreground text-start border-l-2 border-primary pl-1">
              AM
            </span>

            <div className="space-x-2">
              <span className="text-start border-l-2 border-primary pl-1">
                {data.amTimeIn
                  ? format(new Date(data.amTimeIn), "pp")
                  : "--:--:-- AM"}
              </span>
              <span className="text-center">
                {data.amTimeOut
                  ? format(new Date(data.amTimeOut), "pp")
                  : "--:--:-- AM"}
              </span>
            </div>
          </div>
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground text-start border-l-2 border-primary pl-1">
              PM
            </span>

            <div className="space-x-2">
              <span className="text-start border-l-2 border-primary pl-1">
                {data.pmTimeIn
                  ? format(new Date(data.pmTimeIn), "pp")
                  : "--:--:-- PM"}
              </span>
              <span className="text-center">
                {data.pmTimeOut
                  ? format(new Date(data.pmTimeOut), "pp")
                  : "--:--:-- PM"}
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs flex justify-evenly w-full">
          {newDays.map((day) => {
            const isToday = currentDay === day.value ? "bg-secondary" : "";
            const style =
              day.value === 0
                ? " border rounded-l-md"
                : day.value === 6
                ? "rounded-r-md border border-l-0"
                : "border border-l-0";

            const inOffice = day.isAbsent ? (
              <span className="w-1 h-1 rounded-full bg-orange-400 absolute top-2 right-2"></span>
            ) : (
              <span className="w-1 h-1 rounded-full bg-green-400 absolute top-2 right-2"></span>
            );
            const currentDaySpan = (
              <span className="w-1 h-1 rounded-full bg-primary absolute top-2 right-4"></span>
            );
            return (
              <div
                className={`flex-1 text-center p-2 ${style} ${isToday} relative`}
              >
                {day.day}
                {day.value <= currentDay && inOffice}
                {day.value === currentDay && currentDaySpan}
              </div>
            );
          })}
        </div>
        <div className="text-xs flex gap-2">
          <div className=" flex items-center gap-1 ">
            <span className="p-1 rounded-md bg-orange-400"></span>
            Absent
          </div>
          <div className=" flex items-center gap-1 ">
            <span className="p-1 rounded-md bg-green-400"></span>
            In Office
          </div>
          <div className=" flex items-center gap-1 ">
            <span className="p-1 rounded-md bg-primary"></span>
            Current Day
          </div>
        </div>
        {/* Attendance Information */}
      </StatsCard.Body>
    </StatsCard>
  );
}

export default AttendanceInfoCard;
