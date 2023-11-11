function BfarHeading({ sizeClass = "text-3xl" }: { sizeClass?: string }) {
  return (
    <h1 className={`font-bold ${sizeClass}`}>
      BFAR<span className="text-primary">MS</span>
    </h1>
  );
}

export default BfarHeading;
