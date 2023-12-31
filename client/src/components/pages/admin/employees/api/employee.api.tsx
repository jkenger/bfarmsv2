import { fetch } from "@/lib/utils";
import { keepPreviousData } from "@tanstack/react-query";

import { GetQueryType, QueryKeys } from "@/types/common";
import { getSearchParams } from "@/components/hooks/useFilterParams";
import { toast } from "sonner";

export type getEmployeeResponse = {
  data: TDataFields[];
  numOfPages: number;
};

export const getEmployees = ({
  type = GetQueryType.PAGINATED,
  customParams,
}: TGetQueryOptions) => {
  const { searchParams: employeeSearchParams } = getSearchParams();
  const searchParams = customParams
    ? Object.keys(customParams).length && new URLSearchParams(customParams)
    : new URLSearchParams(employeeSearchParams);

  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.EMPLOYEES, searchParams.toString()]
      : [QueryKeys.EMPLOYEES];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/employees?${searchParams.toString()}`
      : `admin/employees/all`;
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};

export const createEmployee = ({ queryClient, form }: TMutation) => {
  return {
    mutationKey: [QueryKeys.CREATE_EMPLOYEE],
    mutationFn: async (data: TDataFields) => {
      return await fetch.post("/admin/employees", data);
    },
    onSuccess: async () => {
      toast.success(`Employee Created`, {
        description: "A new employee has been successfully addded.",
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DESIGNATIONS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYROLL_GROUPS],
      });
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Create Employee`, {
        description:
          "The employee could not be created due to an issue. Please try again.",
      });
    },
  };
};

export const editEmployee = ({ queryClient, form }: TMutation) => {
  const sheetCloseBtn = document.getElementById("sheetCloseBtn");
  return {
    mutationKey: [QueryKeys.EDIT_EMPLOYEE],
    mutationFn: async (data: TDataFields) => {
      return await fetch.put(`/admin/employees/${data.id}`, data);
    },
    onSuccess: async () => {
      toast.success(`Employee Updated`, {
        description: "Changes to the employee details have been saved.",
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DESIGNATIONS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYROLL_GROUPS],
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.TRAVELPASS] });
      sheetCloseBtn?.click();
      form?.reset();
    },
    onError: async () => {
      toast.error(`Failed to Update Employee`, {
        description:
          "Changes to the employee details could not be saved. Please retry.",
      });
    },
  };
};

export const deleteEmployee = ({ queryClient }: TMutation) => {
  return {
    mutationKey: [QueryKeys.DELETE_EMPLOYEE],
    mutationFn: async (data: TDataFields) => {
      return await fetch.delete(`/admin/employees/${data.id}`);
    },
    onSuccess: async () => {
      toast.success(`Employee Deleted`, {
        className: "bg-primary",
        description: "The employee has been removed from the records.",
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.TRAVELPASS] });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.DESIGNATIONS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PAYROLL_GROUPS],
      });
    },
    onError: async () => {
      toast.error("Failed to Delete Employee", {
        description:
          "The employee could not be removed due to an issue. Please try again.",
      });
    },
  };
};
