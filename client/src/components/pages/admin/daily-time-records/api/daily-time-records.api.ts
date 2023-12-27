import { fetch } from "@/lib/utils";
import { keepPreviousData } from "@tanstack/react-query";

import { GetQueryType, QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

export type getResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getDTR = ({ type = GetQueryType.PAGINATED }: TGetQueryOptions) => {
  console.log(type);

  const { searchParams: payrollGroupParams } = getSearchParams();
  const searchParams = new URLSearchParams(payrollGroupParams);
  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.ATTENDACE, searchParams.toString()]
      : [QueryKeys.ATTENDACE];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/daily-time-records?${searchParams.toString()}`
      : `admin/daily-time-records/all`;
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createDTR = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_ATTENDANCE],
    mutationFn: async (data: TDataFields) => {
      return await fetch.post("/admin/daily-time-records", {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Attendance Created`, {
        description: "A new attendance has been successfully addded.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.ATTENDACE],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Delete Attendance`, {
        description:
          "Attendance could not be removed due to an issue. Please try again.",
      });
    },
  };
};

export const editDTR = ({ queryClient, form }: TMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_ATTENDANCE],
    mutationFn: async (data: TDataFields) => {
      await fetch.put(`/admin/daily-time-records/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Attendance Updated`, {
        description: "Changes to the Attendance details have been saved.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.ATTENDACE],
      });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Attendance`, {
        description:
          "Changes to the Attendance details could not be saved. Please retry.",
      });
    },
  };
};

export const deleteDTR = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_ATTENDANCE],
    mutationFn: async (data: TDataFields) => {
      await fetch.delete(`/admin/daily-time-records/${data.id}`);
    },
    onSuccess: async () => {
      toast.warning(`Attendance Deleted`, {
        className: "bg-primary",
        description: "Attendance selected has been removed from the records.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.ATTENDACE],
      });
    },
    onError: async () => {
      toast.error("Failed to Delete Attendance", {
        description:
          "Attendance selected could not be removed due to an issue. Please try again.",
      });
    },
  };
};
