import { Links } from "@/types";

import React from "react";
import { NavLink } from "react-router-dom";

function SubLink({
  to,
  title,
  icon,
  end = false,
}: {
  to: Links;
  title: string;
  icon: React.ReactNode;
  end?: boolean;
}) {
  return (
    <div className="ml-4 mt-3.5 flex flex-col">
      <NavLink
        to={to}
        className="flex items-center gap-2 rounded-md p-2 text-muted-foreground"
        end={end}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </NavLink>
    </div>
  );
}

export default SubLink;
