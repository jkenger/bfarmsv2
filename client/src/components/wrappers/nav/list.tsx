import React from "react";

type Props = {
  children: React.ReactNode;
};

function List({ children }: Props) {
  return <li className="flex flex-col relative">{children}</li>;
}

export default List;
