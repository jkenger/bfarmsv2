import { Links } from "@/types/common";

import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

function SubLink({
  to,
  title,
  icon,
  end = false,
  cn,
}: {
  to: Links;
  title: string;
  icon: React.ReactNode;
  end?: boolean;
  cn?: string;
}) {
  const [searchParams] = useSearchParams();
  const pathname = window.location.pathname;
  const params = pathname === to ? `?${searchParams.toString()}` : "";

  // const params = searchParams ? `?${searchParams.toString()}` : "";
  return (
    <div className="ml-4 mt-3.5 flex flex-col items-start">
      <NavLink
        to={to + params}
        className={
          `flex items-center gap-2 rounded-md p-2 text-muted-foreground ` + cn
        }
        end={end}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </NavLink>
    </div>
  );
}

export default SubLink;
