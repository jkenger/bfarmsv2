import { AlertCircle } from "lucide-react";

type Props = {
  status?: "success" | "error";
  message?: string;
};

function ActionMessage({ status = "success", message }: Props) {
  const renders: { [key: string]: React.ReactElement } = {
    success: (
      <div className="flex items-center gap-2 border border-yellow-300 bg-yellow-500/70 p-2 px-3 rounded-full text-primary-foreground">
        <AlertCircle />
        <p className="font-semibold text-xs sm:text-sm">
          Successfully clocked in for today. Have a nice day!
        </p>
      </div>
    ),
    error: (
      <div className="flex gap-2 border border-red-300 bg-red-500/70 p-2 px-3 rounded-full text-primary-foreground">
        <AlertCircle />
        <p className="font-semibold text-xs sm:text-sm">
          {message || "Failed to clock in. Please try again."}
        </p>
      </div>
    ),
  };
  return renders[status];
}

export default ActionMessage;
