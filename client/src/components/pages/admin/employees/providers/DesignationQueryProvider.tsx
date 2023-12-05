import {
  UseMutationResult,
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

type TDesignationQueryContext = {
  createMutation: UseMutationResult<void, Error, TDataFields, unknown>;

  editMutation: UseMutationResult<void, Error, TDataFields, unknown>;

  deleteMutation: UseMutationResult<void, Error, TDataFields, unknown>;

  deletedActivities: TDataFields[];
  editedActivities: TDataFields[];
  createdActivities: TDataFields[];
};

const DesignationQueryContext = React.createContext<TDesignationQueryContext>(
  {} as TDesignationQueryContext
);

function DesignationQueryProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const createMutation = useMutation(createDesignation({ queryClient }));
  const editMutation = useMutation(editDesignation({ queryClient }));
  const deleteMutation = useMutation(deleteDesignation({ queryClient }));
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
    <DesignationQueryContext.Provider value={value}>
      {children}
    </DesignationQueryContext.Provider>
  );
}

export function useDesignationQuery(): TDesignationQueryContext {
  const context = React.useContext<TDesignationQueryContext>(
    DesignationQueryContext
  );
  if (context === undefined) {
    throw new Error(
      "useDesignationQuery must be used within a DesignationQueryProvider"
    );
  }
  return context;
}

export default DesignationQueryProvider;
