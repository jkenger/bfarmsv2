import { Badge } from "./badge";

type Props = {
  label?: string;
  fullLabel?: string | React.ReactNode;
};

function EmptyCellBadge({ label, fullLabel }: Props) {
  return (
    <Badge variant="outline" className="">
      {fullLabel ? fullLabel : "No " + label}
    </Badge>
  );
}

export default EmptyCellBadge;
