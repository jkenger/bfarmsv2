import StatsCard from "./StatsCard";
import { User } from "lucide-react";
import { Badge } from "./badge";

type Props = {
  data: any;
};

function AttendanceInfoCard({ data }: Props) {
  console.log(data);
  return (
    <StatsCard>
      <StatsCard.Header>
        <div className="bg-bfar mr-4">
          {/* Employee Avatar */}
          <User className="w-6 h-6" strokeWidth={1} />
        </div>
        <div className="flex flex-col">
          <span className=" font-semibold">Employee.Name</span>
          <span className="text-muted-foreground">Employee.Designation</span>
        </div>
      </StatsCard.Header>
      <StatsCard.Body className="flex flex-col text-sm gap-2 px-4">
        <div className="flex gap-2">
          <h2 className="font-medium">Attendance Report</h2>
          <Badge variant="outline" className="text-xs">
            January 1 - 7
          </Badge>
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
                8:00:00 AM
              </span>
              <span className="text-center">8:00:00 AM</span>
            </div>
          </div>
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground text-start border-l-2 border-primary pl-1">
              PM
            </span>

            <div className="space-x-2">
              <span className="text-start border-l-2 border-primary pl-1">
                8:00:00 AM
              </span>
              <span className="text-center">8:00:00 AM</span>
            </div>
          </div>
        </div>
        <div className="text-xs flex justify-evenly w-full">
          {/* Monday */}
          <div className="flex-1 text-center rounded-l-md p-2 border">Mon</div>
          <div className="flex-1 text-center p-2 border-y border-r">Tue</div>
          <div className="flex-1 text-center p-2 border-y border-r">Wed</div>
          <div className="flex-1 text-center p-2 border-y border-r">Thu</div>
          <div className="flex-1 text-center  p-2 border-y border-r">Fri</div>
          <div className="flex-1 text-center  p-2 border-y">Sat</div>
          <div className="flex-1 text-center  p-2 border rounded-r-md">Sun</div>
        </div>
        <div className="text-xs flex gap-2">
          <div className=" flex items-center gap-1 ">
            <span className="p-1 rounded-md bg-red-400"></span>
            Absent
          </div>
          <div className=" flex items-center gap-1 ">
            <span className="p-1 rounded-md bg-green-400"></span>
            In Office
          </div>
        </div>
        {/* Attendance Information */}
      </StatsCard.Body>
    </StatsCard>
  );
}

export default AttendanceInfoCard;
