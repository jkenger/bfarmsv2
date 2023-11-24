import BFARLogo from "./logo";

function TableLoader() {
  return (
    <div className="inset-0 absolute bg-muted/70 flex items-center justify-center transition-all duration-200">
      <div>
        <BFARLogo cn="w-28 animate-pulse" />
      </div>
    </div>
  );
}

export default TableLoader;
