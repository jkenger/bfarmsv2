import React from "react";
import moment from "moment";
type Props = {
  children: React.ReactNode;
};

function ParseTime({ children }: Props) {
  return <span>{moment(String(children)).local().format("LTS")}</span>;
}

export default ParseTime;
