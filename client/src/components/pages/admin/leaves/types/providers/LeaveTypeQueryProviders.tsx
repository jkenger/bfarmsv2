import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

import { QueryKeys } from "@/types/common";
import {
  createLeaveType,
  deleteLeaveType,
  editLeaveType,
} from "../api/types.api";

type Props = {
  children: React.ReactNode;
};

const LeaveTypeQueryContext = React.createContext<TQueryContext>(
  {} as TQueryContext
);

function LeaveTypeQueryProviders({ children }: Props) {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createLeaveType({ queryClient }));
  const editMutation = useMutation(editLeaveType({ queryClient }));
  const deleteMutation = useMutation(deleteLeaveType({ queryClient }));
  const deletedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.DELETE_LEAVE_TYPE],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const editedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.EDIT_LEAVE_TYPE],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const createdActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.CREATE_LEAVE_TYPE],
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
    <LeaveTypeQueryContext.Provider value={value}>
      {children}
    </LeaveTypeQueryContext.Provider>
  );
}

export function useLeaveTypeQuery(): TQueryContext {
  const context = React.useContext<TQueryContext>(LeaveTypeQueryContext);
  if (context === undefined) {
    throw new Error(
      "usePayrollGroupQuery must be used within a PayrollGroupQueryProvider"
    );
  }
  return context;
}

export default LeaveTypeQueryProviders;
