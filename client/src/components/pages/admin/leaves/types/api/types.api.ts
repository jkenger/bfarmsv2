import { fetch } from "@/lib/utils";
import { keepPreviousData } from "@tanstack/react-query";

import { GetQueryType, QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

export type getResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getLeaveTypes = ({
  type = GetQueryType.PAGINATED,
}: TGetQueryOptions) => {
  console.log(type);

  const { searchParams: payrollGroupParams } = getSearchParams();
  const searchParams = new URLSearchParams(payrollGroupParams);
  // If type is paginated, then add the search params to the query key, if not query all leave types
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.LEAVE_TYPES, searchParams.toString()]
      : [QueryKeys.LEAVE_TYPES];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/leaves/types?${searchParams.toString()}`
      : `admin/leaves/types/all`;
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createLeaveType = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_LEAVE_TYPE],
    mutationFn: async (data: TDataFields) => {
      return await fetch.post("/admin/leaves/types", {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Leave Type Created`, {
        description: "A new leave type has been successfully addded.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.LEAVE_TYPES],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Delete Leave Type`, {
        description:
          "Leave Type could not be removed due to an issue. Please try again.",
      });
    },
  };
};

export const editLeaveType = ({ queryClient, form }: TMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_LEAVE_TYPE],
    mutationFn: async (data: TDataFields) => {
      return await fetch.put(`/admin/leaves/types/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Leave Type Updated`, {
        description: "Changes to the Leave Type details have been saved.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.LEAVE_TYPES],
      });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Leave Type`, {
        description:
          "Changes to the Leave Type details could not be saved. Please retry.",
      });
    },
  };
};

export const deleteLeaveType = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_LEAVE_TYPE],
    mutationFn: async (data: TDataFields) => {
      return await fetch.delete(`/admin/leaves/types/${data.id}`);
    },
    onSuccess: async () => {
      toast.warning(`Leave Type Deleted`, {
        className: "bg-primary",
        description: "Leave Type selected has been removed from the records.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.LEAVE_TYPES],
      });
    },
    onError: async () => {
      toast.error("Failed to Delete Leave Type", {
        description:
          "Leave Type selected could not be removed due to an issue. Please try again.",
      });
    },
  };
};
