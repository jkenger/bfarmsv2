import Card from "@/components/ui/card";
import { Delete, ListPlus, PenLine } from "lucide-react";

function ActivityCard({
  type = "created",
  activity,
}: {
  type?: "created" | "edited" | "deleted";
  activity?: TDataFields;
}) {
  return (
    <Card variant="secondary">
      <div className="text-sm flex items-center justify-between">
        <div className="flex flex-col justify-between">
          {type === "created" && (
            <>
              <div className="text-sm font-semibold">Employee Created</div>
              <div className="text-sm text-muted-foreground">
                {activity?.employeeId}
              </div>
              <div className="text-sm text-muted-foreground">
                {activity?.lastName} {activity?.firstName}{" "}
                {activity?.middleName?.[0]}
              </div>
            </>
          )}
          {type === "edited" && (
            <>
              <div className="text-sm font-semibold">Employee Edited</div>
              <div className="text-sm text-muted-foreground">
                {activity?.employeeId}
              </div>
              <div className="text-sm text-muted-foreground">
                {activity?.lastName} {activity?.firstName}{" "}
                {activity?.middleName?.[0]}
              </div>
            </>
          )}
          {type === "deleted" && (
            <>
              <div className="text-sm font-semibold">Employee Deleted</div>
              <div className="text-sm text-muted-foreground">
                Employee {} has been recently deleted
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between items-center">
          {type === "created" && (
            <div className="flex gap-2 items-center">
              <span className="text-sm">Created</span>
              <ListPlus size="16" />
            </div>
          )}
          {type === "edited" && (
            <div className="flex gap-2 items-center">
              <span className="text-sm">Edited</span>
              <PenLine size="16" />
            </div>
          )}
          {type === "deleted" && (
            <div className="flex gap-2 items-center">
              <span className="text-sm">Deleted</span>
              <Delete size="16" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ActivityCard;
