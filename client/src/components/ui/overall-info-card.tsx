import StatsCard from "./StatsCard";
import { BarRechart } from "./bar-rechart";

type Props<T> = {
  data: T;
  total: number;
  keys: {
    X: string;
    Y: string;
  };
  label: string;
  icon: React.ReactNode;
};

function OverallInfoCard<T>({ data, total, keys, label, icon }: Props<T>) {
  return (
    <StatsCard>
      <StatsCard.Header>
        <div className="bg-bfar mr-4">{icon}</div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold">{total}</span>
        </div>
      </StatsCard.Header>
      <StatsCard.Body>
        <div className="w-full h-[150px] mr-4 -ml-6">
          <BarRechart data={data} keys={keys} />
        </div>
      </StatsCard.Body>
    </StatsCard>
  );
}

export default OverallInfoCard;
