import React from "react";

type TProps = {
  children: React.ReactNode;
};

function StatsCard({ children }: TProps) {
  return (
    <div className="p-4 border text-md bg-card rounded">
      <div className="flex justify-between flex-col gap-3">{children}</div>
    </div>
  );
}

function Header({ children }: TProps) {
  return <div className="flex justify-between text-xs">{children}</div>;
}

function Body({ children }: TProps) {
  return <div className="flex justify-between text-xl">{children}</div>;
}

StatsCard.Header = Header;
StatsCard.Body = Body;

export default StatsCard;
