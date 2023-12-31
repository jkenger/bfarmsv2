import { fetch } from "@/lib/utils";
import { keepPreviousData } from "@tanstack/react-query";

import { GetQueryType, QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

export type getResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getDesignations = ({
  type = GetQueryType.PAGINATED,
  customParams,
}: TGetQueryOptions) => {
  const { searchParams: designationSearchParams } = getSearchParams();
  const searchParams = customParams
    ? new URLSearchParams(customParams)
    : new URLSearchParams(designationSearchParams);
  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.DESIGNATIONS, searchParams.toString()]
      : [QueryKeys.DESIGNATIONS];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/employees/designations?${searchParams.toString()}`
      : `admin/employees/designations/all`;
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createDesignation = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_DESIGNATION],
    mutationFn: async (data: TDataFields) => {
      return await fetch.post("/admin/employees/designations", data);
    },
    onSuccess: async () => {
      toast.success(`Designation Created`, {
        description: "A new designation has been successfully addded.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DESIGNATIONS],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Delete Designation`, {
        description:
          "The designation could not be removed due to an issue. Please try again.",
      });
    },
  };
};

export const editDesignation = ({ queryClient, form }: TMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_DESIGNATION],
    mutationFn: async (data: TDataFields) => {
      return await fetch.put(`/admin/employees/designations/${data.id}`, data);
    },
    onSuccess: async () => {
      toast.success(`Designation Updated`, {
        description: "Changes to the designation details have been saved.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DESIGNATIONS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.EMPLOYEES],
      });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Designation`, {
        description:
          "Changes to the designation details could not be saved. Please retry.",
      });
    },
  };
};

export const deleteDesignation = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_DESIGNATION],
    mutationFn: async (data: TDataFields) => {
      return await fetch.delete(`/admin/employees/designations/${data.id}`);
    },
    onSuccess: async () => {
      toast.warning(`Designation Deleted`, {
        className: "bg-primary",
        description: "Designation selected has been removed from the records.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DESIGNATIONS],
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
    },
    onError: async () => {
      toast.error("Failed to Delete Designation", {
        description:
          "Designation selected could not be removed due to an issue. Please try again.",
      });
    },
  };
};
