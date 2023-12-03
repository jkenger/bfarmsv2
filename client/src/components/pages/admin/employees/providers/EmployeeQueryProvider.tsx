import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployees,
} from "../api/employee.api";

import { AxiosResponse } from "axios";
import { QueryKeys } from "@/types/common";

type Props = {
  children: React.ReactNode;
};

type TEmployeeQueryContext = {
  useGetEmployees: () => UseQueryResult<
    AxiosResponse<any, any> | undefined,
    Error
  >;
  useCreateEmployee: () => UseMutationResult<
    void,
    Error,
    TEmployeeForms,
    unknown
  >;

  useEditEmployee: () => UseMutationResult<
    void,
    Error,
    TEmployeeForms,
    unknown
  >;
  useDeleteEmployee: () => UseMutationResult<string, Error, string, unknown>;
  useEmployeeActivities: () => {
    deletedActivities: TDataFields[];
    editedActivities: TDataFields[];
    createdActivities: TDataFields[];
  };
};

const EmployeeQueryContext = React.createContext<TEmployeeQueryContext>(
  {} as TEmployeeQueryContext
);

function EmployeeQueryProvider({ children }: Props) {
  const useGetEmployees = () => {
    return useQuery(getEmployees());
  };

  const useCreateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation(createEmployee({ queryClient }));
  };

  const useEditEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation(editEmployee({ queryClient }));
  };

  const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteEmployee({ queryClient }));
  };

  const useEmployeeActivities = () => {
    const deletedActivities = useMutationState({
      filters: {
        mutationKey: [QueryKeys.DELETE_EMPLOYEE],
        status: "success",
      },
      select: (mutation) => mutation.state.variables,
    }) as TDataFields[];
    const editedActivities = useMutationState({
      filters: {
        mutationKey: [QueryKeys.EDIT_EMPLOYEE],
        status: "success",
      },
      select: (mutation) => mutation.state.variables,
    }) as TDataFields[];
    const createdActivities = useMutationState({
      filters: {
        mutationKey: [QueryKeys.CREATE_EMPLOYEE],
        status: "success",
      },
      select: (mutation) => mutation.state.variables,
    }) as TDataFields[];
    return { deletedActivities, editedActivities, createdActivities };
  };

  const value = {
    useGetEmployees,
    useCreateEmployee,
    useEditEmployee,
    useDeleteEmployee,
    useEmployeeActivities,
  };

  return (
    <EmployeeQueryContext.Provider value={value}>
      {children}
    </EmployeeQueryContext.Provider>
  );
}

export function useEmployeeQuery(): TEmployeeQueryContext {
  const context = React.useContext<TEmployeeQueryContext>(EmployeeQueryContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeQuery must be used within a EmployeeQueryProvider"
    );
  }
  return context;
}

export default EmployeeQueryProvider;
