import ActionMessage from "../ui/action-message";
import AttendanceTable from "../ui/attendance-table";

import Card from "../ui/card";
import PunchOutButton from "../ui/punchout-button";
import PunchInButton from "../ui/punchin-button";

function Attendance() {
  return (
    <main>
      <div className="w-full px-6 md:w-1/2 mx-auto my-14">
        <h1 className="heading text-[2.5rem] font-bold">Attendance</h1>
        <p className="sub-heading text-muted-foreground font-semibold">
          Good Morning!
        </p>
        <Card variant="secondary">
          <p className="sub-heading text-muted-foreground font-semibold">
            Today is{" "}
          </p>
          <h3 className="heading text-3xl font-bold">Monday</h3>
        </Card>
        <ActionMessage />
        <div className="flex flex-col lg:flex-row gap-3">
          <Card>
            <div className="flex flex-col items-center justify-center gap-4 px-4 my-6">
              <p className=" font-bold ">Friday, November 10</p>
              <p className="mb-4 text-3xl sm:text-[3rem] tracking-normal  font-bold -mt-2">
                07:30 <span className="capitalize ">AM</span>
              </p>

              <PunchInButton />
            </div>
          </Card>
          <Card variant="secondary">
            <div className="flex flex-col items-center justify-center gap-4 px-4 my-6">
              <p className=" font-bold ">Friday, November 10</p>
              <p className="mb-4 text-3xl sm:text-[3rem] tracking-normal  font-bold -mt-2">
                07:30 <span className="capitalize ">AM</span>
              </p>

              <PunchOutButton />
            </div>
          </Card>
        </div>
        <div>
          <h1 className="font-bold mb-4">Recent Attendances</h1>
          <AttendanceTable />
        </div>
      </div>
    </main>
  );
}

export default Attendance;
