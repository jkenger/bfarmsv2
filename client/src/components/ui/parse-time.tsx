import React from "react";

type Props = {
  children: React.ReactNode;
};

function ParseTime({ children }: Props) {
  return <span>{new Date(String(children)).toLocaleTimeString()}</span>;
}

export default ParseTime;
