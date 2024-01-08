import { Badge } from "./badge";

type Props = {
  label?: string;
  fullLabel?: string;
};

function EmptyCellBadge({ label, fullLabel }: Props) {
  return (
    <Badge variant="outline" className="text-red-400 border-red-400">
      {fullLabel ? fullLabel : "No " + label}
    </Badge>
  );
}

export default EmptyCellBadge;
