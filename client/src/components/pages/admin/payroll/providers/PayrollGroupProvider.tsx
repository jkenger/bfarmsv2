import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

import { QueryKeys } from "@/types/common";
import {
  createPayrollGroup,
  deletePayrollGroup,
  editPayrollGroup,
} from "../api/payrollGroups.api";

type Props = {
  children: React.ReactNode;
};

const PayrollGropQueryContext = React.createContext<TQueryContext>(
  {} as TQueryContext
);

function PayrollGroupQueryProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createPayrollGroup({ queryClient }));
  const editMutation = useMutation(editPayrollGroup({ queryClient }));
  const deleteMutation = useMutation(deletePayrollGroup({ queryClient }));
  const deletedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.DELETE_PAYROLL_GROUP],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const editedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.EDIT_PAYROLL_GROUP],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const createdActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.CREATE_PAYROLL_GROUP],
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
    <PayrollGropQueryContext.Provider value={value}>
      {children}
    </PayrollGropQueryContext.Provider>
  );
}

export function usePayrollGroupQuery(): TQueryContext {
  const context = React.useContext<TQueryContext>(PayrollGropQueryContext);
  if (context === undefined) {
    throw new Error(
      "usePayrollGroupQuery must be used within a PayrollGroupQueryProvider"
    );
  }
  return context;
}

export default PayrollGroupQueryProvider;
