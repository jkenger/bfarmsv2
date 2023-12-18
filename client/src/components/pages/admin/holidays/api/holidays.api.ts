import { fetch } from "@/lib/utils";
import { keepPreviousData } from "@tanstack/react-query";

import { GetQueryType, QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

export type getResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getHolidays = ({
  type = GetQueryType.PAGINATED,
}: TGetQueryOptions) => {
  console.log(type);

  const { searchParams: payrollGroupParams } = getSearchParams();
  const searchParams = new URLSearchParams(payrollGroupParams);
  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.HOLIDAYS, searchParams.toString()]
      : [QueryKeys.HOLIDAYS];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/holidays?${searchParams.toString()}`
      : `admin/holidays/all`;
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createHoliday = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_HOLIDAY],
    mutationFn: async (data: TDataFields) => {
      await fetch.post("/admin/holidays", {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Holiday Created`, {
        description: "A new holiday has been successfully addded.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.HOLIDAYS],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Delete Holiday`, {
        description:
          "Holiday could not be removed due to an issue. Please try again.",
      });
    },
  };
};

export const editHoliday = ({ queryClient, form }: TMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_HOLIDAY],
    mutationFn: async (data: TDataFields) => {
      await fetch.put(`/admin/holidays/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Holiday Updated`, {
        description: "Changes to the Holiday details have been saved.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.HOLIDAYS],
      });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Holiday`, {
        description:
          "Changes to the Holiday details could not be saved. Please retry.",
      });
    },
  };
};

export const deleteHoliday = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_HOLIDAY],
    mutationFn: async (data: TDataFields) => {
      await fetch.delete(`/admin/holidays/${data.id}`);
    },
    onSuccess: async () => {
      toast.warning(`Holiday Deleted`, {
        className: "bg-primary",
        description: "Holiday selected has been removed from the records.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.HOLIDAYS],
      });
    },
    onError: async () => {
      toast.error("Failed to Delete Holiday", {
        description:
          "Holiday selected could not be removed due to an issue. Please try again.",
      });
    },
  };
};
