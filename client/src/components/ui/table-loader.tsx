import BFARLogo from "./logo";

function TableLoader() {
  return (
    <div className="inset-0 absolute bg-muted/70 flex items-center justify-center transition-all duration-200">
      <div>
        <BFARLogo cn="w-28 animate-pulse" />
        <div className="flex gap-2 items-center animate-pulse">
          <p className="text-sm text-center text-muted-foreground">
            Loading data...
          </p>
        </div>
      </div>
    </div>
  );
}

export default TableLoader;
