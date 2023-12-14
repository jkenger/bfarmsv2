import React from "react";
import { Badge } from "./badge";

type Props = {
  length: number;
};

function CountBadge({ length }: Props) {
  return length > 0 ? (
    <span> {length} Employees </span>
  ) : (
    <Badge variant="outline">No employee</Badge>
  );
}

export default CountBadge;
