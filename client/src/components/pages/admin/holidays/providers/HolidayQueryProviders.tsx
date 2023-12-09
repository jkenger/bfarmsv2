import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

import { QueryKeys } from "@/types/common";
import { createHoliday, deleteHoliday, editHoliday } from "../api/holidays.api";

type Props = {
  children: React.ReactNode;
};

const HolidyQueryContext = React.createContext<TQueryContext>(
  {} as TQueryContext
);

function HolidayQueryProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createHoliday({ queryClient }));
  const editMutation = useMutation(editHoliday({ queryClient }));
  const deleteMutation = useMutation(deleteHoliday({ queryClient }));
  const deletedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.DELETE_HOLIDAY],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const editedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.EDIT_HOLIDAY],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const createdActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.CREATE_HOLIDAY],
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
    <HolidyQueryContext.Provider value={value}>
      {children}
    </HolidyQueryContext.Provider>
  );
}

export function useHolidayQuery(): TQueryContext {
  const context = React.useContext<TQueryContext>(HolidyQueryContext);
  if (context === undefined) {
    throw new Error(
      "usePayrollGroupQuery must be used within a PayrollGroupQueryProvider"
    );
  }
  return context;
}

export default HolidayQueryProvider;
