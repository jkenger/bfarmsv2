import React from "react";

type Props = {
  children: React.ReactNode;
};

function ParseTime({ children }: Props) {
  return (
    <span>
      {new Date(String(children)).toLocaleTimeString("en-PH", {
        timeZone: "Asia/Manila",
      })}
    </span>
  );
}

export default ParseTime;
