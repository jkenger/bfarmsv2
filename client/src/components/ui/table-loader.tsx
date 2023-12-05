function TableLoader() {
  return (
    <div className="inset-0 absolute bg-muted/80   flex items-center justify-center transition-all duration-200">
      <div className="flex gap-2 items-center animate-pulse absolute">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></span>
      </div>
    </div>
  );
}

export default TableLoader;
