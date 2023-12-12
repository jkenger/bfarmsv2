import React from "react";
import Group from "../pages/admin/employees/ui/group";

type Props = {
  detailsSelect: React.RefObject<HTMLSpanElement>;
  selectedItem: TDataFields;
  objectKey: string;
};

function GroupItem({ detailsSelect, selectedItem, objectKey }: Props) {
  if (typeof selectedItem[objectKey as keyof TDataFields] !== "object") {
    return (
      <Group assignTo={objectKey} key={objectKey}>
        <span ref={detailsSelect}>
          {selectedItem[objectKey as keyof TDataFields] ? (
            (selectedItem[objectKey as keyof TDataFields] as React.ReactNode)
          ) : (
            <span className="text-muted-foreground">No data</span>
          )}
        </span>
      </Group>
    );
  }
  return null;
}

export default GroupItem;
