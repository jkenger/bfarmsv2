import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

import { QueryKeys } from "@/types/common";
import {
  createDesignation,
  deleteDesignation,
  editDesignation,
} from "../api/designation.api";

type Props = {
  children: React.ReactNode;
};

const DesignationQueryContext = React.createContext<TQueryContext>(
  {} as TQueryContext
);

function DesignationQueryProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createDesignation({ queryClient }));
  const editMutation = useMutation(editDesignation({ queryClient }));
  const deleteMutation = useMutation(deleteDesignation({ queryClient }));
  const deletedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.DELETE_DESIGNATION],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const editedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.EDIT_DESIGNATION],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const createdActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.CREATE_DESIGNATION],
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
    <DesignationQueryContext.Provider value={value}>
      {children}
    </DesignationQueryContext.Provider>
  );
}

export function useDesignationQuery(): TQueryContext {
  const context = React.useContext<TQueryContext>(DesignationQueryContext);
  if (context === undefined) {
    throw new Error(
      "useDesignationQuery must be used within a DesignationQueryProvider"
    );
  }
  return context;
}

export default DesignationQueryProvider;
