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
    // onMutate: async (data: AxiosResponse) => {
    //   const { searchParams } = getSearchParams();
    //   const params = new URLSearchParams(searchParams);

    //   await queryClient.cancelQueries({
    //     queryKey: [QueryKeys.PAYROLLS, params.toString()],
    //   });

    //   const axiosQueryData = queryClient.getQueryData([
    //     QueryKeys.PAYROLLS,
    //     params.toString(),
    //   ]);

    //   const previousData = axiosQueryData?.data.data;

    //   const sampleData = {
    //     ...data.data,
    //     payrollGroup: {
    //       name: "Creating project name...",
    //       fundCluster: "Creating fund cluster...",
    //       programName: "Creating program name...",
    //     },
    //   };

    //   queryClient.setQueryData(
    //     [QueryKeys.PAYROLLS, params.toString()],
    //     (oldData: AxiosResponse) => {
    //       const oldDataCopy = oldData.data.data;
    //       return {
    //         ...oldData,
    //         data: {
    //           data: [sampleData, ...oldDataCopy],
    //           numOfPages: oldData.data.numOfPages,
    //         },
    //       };
    //     }
    //   );
    //   return { previousData };
    // },
    onSuccess: async () => {
      // get path

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
      return await fetch.put(`/admin/payrolls/${data.id}`, {
        ...data,
        action: "update",
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYROLLS],
      });
      toast.success(`Payroll Updated`, {
        description: "Changes to the payroll details have been saved.",
      });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Payroll`, {
        description:
          "Changes to the payroll details could not be saved. Please retry.",
      });
    },
  };
};

export const deletePayroll = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_PAYROLL],
    mutationFn: async (data: TDataFields) => {
      return await fetch.delete(`/admin/payrolls/${data.id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYROLLS],
      });
      toast.warning(`Payroll Deleted`, {
        className: "bg-primary",
        description: "Payroll selected has been removed from the records.",
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
    },
    onError: async () => {
      toast.error("Failed to Delete Payroll", {
        description:
          "Payroll selected could not be removed due to an issue. Please try again.",
      });
    },
  };
};
