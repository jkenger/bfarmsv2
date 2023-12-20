import { fetch } from "@/lib/utils";
import { QueryKeys } from "@/types/common";
import { toast } from "sonner";

export const createAttendance = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_ATTENDANCE],
    mutationFn: async (data: string) => {
      await fetch.post("/attendance", {
        code: data,
      });
    },
    onSuccess: async () => {
      toast.success(`Deduction Created`, {
        description: "A new deduction has been successfully addded.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.ATTENDACE],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Create Attendance`, {
        description:
          "Attendance could not be removed due to an issue. Please try again.",
      });
    },
  };
};
