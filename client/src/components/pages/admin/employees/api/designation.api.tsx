import { fetch } from "@/lib/utils";
import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

import { QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

type TMutation = {
  queryClient: QueryClient;
  form?: UseFormReturn<TDataFields, unknown, undefined>;
};

export type getResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getDesignations = () => {
  const { searchParams: designationSearchParams } = getSearchParams();
  const searchParams = new URLSearchParams(designationSearchParams);
  return {
    queryKey: [QueryKeys.DESIGNATIONS, searchParams.toString()],
    queryFn: async () => {
      return await fetch.get(
        `/admin/employees/designations?${searchParams.toString()}`
      );
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createDesignation = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_DESIGNATION],
    mutationFn: async (data: TDataFields) => {
      await fetch.post("/admin/employees/designations", {
        ...data,
        salary: Number(data.salary),
      });
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
      await fetch.put(`/admin/employees/designations/${data.id}`, {
        ...data,
        salary: Number(data.salary),
      });
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
      await fetch.delete(`/admin/employees/designations/${data.id}`);
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
