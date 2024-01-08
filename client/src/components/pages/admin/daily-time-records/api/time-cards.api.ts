import { fetch } from "@/lib/utils";
import { keepPreviousData } from "@tanstack/react-query";

import { GetQueryType, QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

export type getResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getTimeCards = ({
  type = GetQueryType.PAGINATED,
  customParams,
}: TGetQueryOptions) => {
  const { searchParams: params } = getSearchParams();
  const searchParams = customParams
    ? Object.keys(customParams).length && new URLSearchParams(customParams)
    : new URLSearchParams(params);

  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.TIME_CARDS, searchParams.toString()]
      : [QueryKeys.TIME_CARDS];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/time-cards?${searchParams.toString()}`
      : `admin/time-cards/all`;
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createTimeCard = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_TIME_CARD],
    mutationFn: async (data: TDataFields) => {
      return await fetch.post("/admin/time-cards", {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Time Card Created`, {
        description: "A new time card has been successfully addded.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.TIME_CARDS],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Create Time Card`, {
        description:
          "Time Card could not be removed due to an issue. Please try again.",
      });
    },
  };
};

export const editTimeCard = ({ queryClient, form }: TMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_TIME_CARD],
    mutationFn: async (data: TDataFields) => {
      return await fetch.put(`/admin/time-cards/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Time Card Updated`, {
        description: "Changes to the Time Card details have been saved.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.TIME_CARDS],
      });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Time Card`, {
        description:
          "Changes to the Time Card details could not be saved. Please retry.",
      });
    },
  };
};

export const deleteTimeCard = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_TIME_CARD],
    mutationFn: async (data: TDataFields) => {
      return await fetch.delete(`/admin/time-cards/${data.id}`);
    },
    onSuccess: async () => {
      toast.warning(`Time Card Deleted`, {
        className: "bg-primary",
        description: "Time Card selected has been removed from the records.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.TIME_CARDS],
      });
    },
    onError: async () => {
      toast.error("Failed to Delete Time Card", {
        description:
          "Time Card selected could not be removed due to an issue. Please try again.",
      });
    },
  };
};
