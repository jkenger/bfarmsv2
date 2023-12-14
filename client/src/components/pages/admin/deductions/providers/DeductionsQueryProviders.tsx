import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

import { QueryKeys } from "@/types/common";
import {
  createDeduction,
  deleteDeduction,
  editDeduction,
} from "../api/deductions.api";

type Props = {
  children: React.ReactNode;
};

const DeductionsQueryContext = React.createContext<TQueryContext>(
  {} as TQueryContext
);

function DeductionsQueryProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createDeduction({ queryClient }));
  const editMutation = useMutation(editDeduction({ queryClient }));
  const deleteMutation = useMutation(deleteDeduction({ queryClient }));
  const deletedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.DELETE_DEDUCTION],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const editedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.EDIT_DEDUCTION],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const createdActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.CREATE_DEDUCTION],
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
    <DeductionsQueryContext.Provider value={value}>
      {children}
    </DeductionsQueryContext.Provider>
  );
}

export function useDeductionQuery(): TQueryContext {
  const context = React.useContext<TQueryContext>(DeductionsQueryContext);
  if (context === undefined) {
    throw new Error(
      "usePayrollGroupQuery must be used within a PayrollGroupQueryProvider"
    );
  }
  return context;
}

export default DeductionsQueryProvider;
