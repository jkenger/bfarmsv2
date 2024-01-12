import React from "react";

type Props = {
  children: React.ReactNode;
};

function StatsContainer({ children }: Props) {
  return <div className="grid grid-cols-4 gap-2 w-full ">{children}</div>;
}

export default StatsContainer;
