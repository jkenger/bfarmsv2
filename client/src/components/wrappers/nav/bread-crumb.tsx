import { IconProperties, Links } from "@/types/common";
import { Home, Slash } from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {
  title: string;
  navTo?: Links;
};

function BreadCrumb({ title }: Props) {
  return (
    <ol className="flex items-center gap-4 text-md">
      <li>
        <span className="sr-only"> Dashboard </span>

        <NavLink to={Links.DASHBOARD}>
          <Home
            className="font-semibold"
            width={IconProperties.SIZE}
            strokeWidth={IconProperties.STROKE_WIDTH}
          />
        </NavLink>
      </li>

      <li>
        <Slash
          size={IconProperties.SIZE}
          strokeWidth={IconProperties.STROKE_WIDTH}
        />
      </li>

      <li>
        <span className="font-medium">{title}</span>
      </li>
    </ol>
  );
}

export default BreadCrumb;
