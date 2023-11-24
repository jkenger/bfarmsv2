import { Skeleton } from "./skeleton";
import TableLoader from "./table-loader";

function TableFallBack() {
  return (
    <Skeleton className="h-[550px] bg-muted relative flex items-center justify-center">
      <TableLoader />
    </Skeleton>
  );
}

export default TableFallBack;
