import {
  UseMutationResult,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
} from "../api/employee.api";

import { QueryKeys } from "@/types/common";

type Props = {
  children: React.ReactNode;
};

type TEmployeeQueryContext = {
  createMutation: UseMutationResult<void, Error, TAdminForms, unknown>;

  editMutation: UseMutationResult<void, Error, TAdminForms, unknown>;

  deleteMutation: UseMutationResult<void, Error, TAdminForms, unknown>;

  deletedActivities: TDataFields[];
  editedActivities: TDataFields[];
  createdActivities: TDataFields[];
};

const EmployeeQueryContext = React.createContext<TEmployeeQueryContext>(
  {} as TEmployeeQueryContext
);

function EmployeeQueryProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const createMutation = useMutation(createEmployee({ queryClient }));
  const editMutation = useMutation(editEmployee({ queryClient }));
  const deleteMutation = useMutation(deleteEmployee({ queryClient }));
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

  const value = {
    createMutation,
    editMutation,
    deleteMutation,
    deletedActivities,
    editedActivities,
    createdActivities,
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
