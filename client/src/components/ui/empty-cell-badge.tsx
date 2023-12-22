import { Badge } from "./badge";

type Props = {
  label?: string;
  fullLabel?: string;
};

function EmptyCellBadge({ label, fullLabel }: Props) {
  return (
    <Badge variant="outline" className="text-muted-foreground">
      {fullLabel ? fullLabel : "No " + label}
    </Badge>
  );
}

export default EmptyCellBadge;
