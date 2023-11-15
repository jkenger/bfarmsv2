import { Links } from "@/types";

import React from "react";
import { NavLink } from "react-router-dom";

function SubLink({
  to,
  title,
  icon,
}: {
  to: Links;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="ml-4 mt-3.5 flex flex-col">
      <NavLink to={to} className="flex items-center gap-2 rounded-md p-2">
        {icon}
        <span>{title}</span>
      </NavLink>
    </div>
  );
}

export default SubLink;
