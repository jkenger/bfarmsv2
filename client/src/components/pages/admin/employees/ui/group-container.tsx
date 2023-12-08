import React from "react";

type Props = { children: React.ReactNode; groupActions: React.ReactNode };

function GroupContainer({ children, groupActions }: Props) {
  return (
    <div className="bg-card rounded-lg  border p-4 flex flex-col gap-2">
      <p className="text-xs">
        The following data for this group will be{" "}
        <span className="text-primary">added</span>:{" "}
      </p>
      <div className="flex flex-col gap-4 items-start">{children}</div>
      <div className="space-x-2 mt-4">
        {/* Navigate to desgination */}
        {groupActions}
      </div>
    </div>
  );
}

export default GroupContainer;
