import React from "react";

type Props = {
  children: React.ReactNode;
};

function ParseDate({ children }: Props) {
  return (
    <span>
      {new Date(String(children)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
}

export default ParseDate;
