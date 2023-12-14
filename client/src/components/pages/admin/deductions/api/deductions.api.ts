import { fetch } from "@/lib/utils";
import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

import { GetQueryType, QueryKeys } from "@/types/common";
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

export const getDeductions = ({
  type = GetQueryType.PAGINATED,
}: TGetQueryOptions) => {
  const { searchParams: travelpassParams } = getSearchParams();
  const searchParams = new URLSearchParams(travelpassParams);
  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.DEDUCTIONS, searchParams.toString()]
      : [QueryKeys.DEDUCTIONS];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/deductions?${searchParams.toString()}`
      : `admin/deductions/all`;
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createDeduction = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_DEDUCTION],
    mutationFn: async (data: TDataFields) => {
      await fetch.post("/admin/deductions", data);
    },
    onSuccess: async () => {
      toast.success(`Deduction Created`, {
        description: "A new deduction has been successfully addded.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DEDUCTIONS],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Create Deduction`, {
        description:
          "Deduction could not be removed due to an issue. Please try again.",
      });
    },
  };
};

export const editDeduction = ({ queryClient, form }: TMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_DEDUCTION],
    mutationFn: async (data: TDataFields) => {
      await fetch.put(`/admin/deductions/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Deduction Updated`, {
        description: "Changes to the Deduction details have been saved.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DEDUCTIONS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.EMPLOYEES],
      });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Deduction`, {
        description:
          "Changes to the Deduction details could not be saved. Please retry.",
      });
    },
  };
};

export const deleteDeduction = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_TRAVELPASS],
    mutationFn: async (data: TDataFields) => {
      await fetch.delete(`/admin/deductions/${data.id}`);
    },
    onSuccess: async () => {
      toast.warning(`Deduction Deleted`, {
        className: "bg-primary",
        description: "Deduction selected has been removed from the records.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DEDUCTIONS],
      });
      // await queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
    },
    onError: async () => {
      toast.error("Failed to Delete Deduction", {
        description:
          "Deduction selected could not be removed due to an issue. Please try again.",
      });
    },
  };
};
