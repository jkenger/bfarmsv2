import { AlertCircle } from "lucide-react";

type Props = {
  status?: "success" | "error";
};

function ActionMessage({ status = "success" }: Props) {
  const renders: { [key: string]: React.ReactElement } = {
    success: (
      <div className="flex items-center gap-2 border border-yellow-300 bg-yellow-500/70 p-2 px-3 rounded-full text-primary-foreground">
        <AlertCircle />
        <p className="font-semibold text-sm sm:text-md">
          Successfully clocked in within the office time in
        </p>
      </div>
    ),
    error: (
      <div className="flex gap-2 border border-red-300 bg-red-500/70 p-2 px-3 rounded-full text-primary-foreground">
        <AlertCircle />
        <p className="font-semibold">
          You are late to clock in, please contact your manager
        </p>
      </div>
    ),
  };
  return renders[status];
}

export default ActionMessage;
