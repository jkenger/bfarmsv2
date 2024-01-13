import React from "react";

type TProps = {
  children: React.ReactNode;
};

function StatsCard({ children }: TProps) {
  return (
    <div className=" text-md bg-card rounded">
      <div className="flex justify-between flex-col ">{children}</div>
    </div>
  );
}

function Header({ children }: TProps) {
  return (
    <div className="p-4 flex justify-start items-center text-xs">
      {children}
    </div>
  );
}

function Body({ children }: TProps) {
  return <div className="flex justify-between text-xl">{children}</div>;
}

StatsCard.Header = Header;
StatsCard.Body = Body;

export default StatsCard;
