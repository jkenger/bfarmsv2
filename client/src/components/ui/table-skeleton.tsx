import { Skeleton } from "./skeleton";
import { Loader2 } from "lucide-react";

function TableSkeleton() {
  return (
    <Skeleton className="h-[550px] bg-muted relative flex items-center justify-center">
      <Loader2 className="text-primary animate-spin " />
    </Skeleton>
  );
}

export default TableSkeleton;
