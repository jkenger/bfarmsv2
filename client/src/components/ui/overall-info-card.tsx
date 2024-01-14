import StatsCard from "./StatsCard";
import { User } from "lucide-react";
import { BarRechart } from "./bar-rechart";

type Props = {
  data: any;
};

function OverallInfoCard({ data }: Props) {
  console.log(data);
  return (
    <StatsCard>
      <StatsCard.Header>
        <div className="bg-bfar mr-4">
          <User className="w-6 h-6" strokeWidth={1} />
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Total Employees</span>
          <span className="font-semibold">20</span>
        </div>
      </StatsCard.Header>
      <StatsCard.Body>
        <div className="w-full h-[150px] mr-4">
          <BarRechart />
        </div>
      </StatsCard.Body>
    </StatsCard>
  );
}

export default OverallInfoCard;
