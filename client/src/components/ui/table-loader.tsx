import BFARLogo from "./logo";

function TableLoader() {
  return (
    <div className="inset-0 absolute bg-muted/50  flex items-center justify-center transition-all duration-200">
      <div>
        <BFARLogo cn="w-28 animate-pulse" />
        <div className="flex gap-2 items-center animate-pulse absolute">
          <p className="text-sm text-center text-muted-foreground italic">
            Loading data...
          </p>
        </div>
      </div>
    </div>
  );
}

export default TableLoader;
