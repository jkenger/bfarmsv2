import { fetch } from "@/lib/utils";
import { keepPreviousData } from "@tanstack/react-query";

import { GetQueryType, QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

export type getResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getPayroll = ({
  type = GetQueryType.PAGINATED,
  customParams,
}: TGetQueryOptions) => {
  const { searchParams: payrollParams } = getSearchParams();
  const searchParams = customParams
    ? Object.keys(customParams).length && new URLSearchParams(customParams)
    : new URLSearchParams(payrollParams);

  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.PAYROLLS, searchParams.toString()]
      : [QueryKeys.PAYROLLS];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/payrolls?${searchParams.toString()}`
      : `admin/payrolls/all`;
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createPayroll = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_PAYROLL],
    mutationFn: async (data: TDataFields) => {
      return await fetch.post("/admin/payrolls", {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Payroll Created`, {
        description: "A new payroll has been successfully addded.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYROLLS],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Delete Payroll Group`, {
        description:
          "Payroll group could not be removed due to an issue. Please try again.",
      });
    },
  };
};

export const editPayroll = ({ queryClient, form }: TMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_PAYROLL],
    mutationFn: async (data: TDataFields) => {
      await fetch.put(`/admin/payrolls/groups/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`Payroll Group Updated`, {
        description: "Changes to the payroll group details have been saved.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYROLLS],
      });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Payroll Group`, {
        description:
          "Changes to the payroll group details could not be saved. Please retry.",
      });
    },
  };
};

export const deletePayroll = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_PAYROLL_GROUP],
    mutationFn: async (data: TDataFields) => {
      await fetch.delete(`/admin/payrolls/groups/${data.id}`);
    },
    onSuccess: async () => {
      toast.warning(`Payroll Group Deleted`, {
        className: "bg-primary",
        description:
          "Payroll Group selected has been removed from the records.",
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYROLLS],
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
    },
    onError: async () => {
      toast.error("Failed to Delete Payroll Group", {
        description:
          "Payroll Group selected could not be removed due to an issue. Please try again.",
      });
    },
  };
};
