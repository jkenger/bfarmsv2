import { useMutation, useMutationState } from "@tanstack/react-query";
import React from "react";

import { QueryKeys } from "@/types/common";
import { AxiosResponse } from "axios";

type Props = {
  children: React.ReactNode;
  api: {
    create: {
      mutationKey: QueryKeys[];
      mutationFn: (data: TDataFields) => Promise<AxiosResponse<any, any>>;
      onSuccess: (data?: AxiosResponse) => Promise<void>;
      onError: () => Promise<void>;
    };
    edit: {
      mutationKey: QueryKeys[];
      mutationFn: (data: TDataFields) => Promise<AxiosResponse<any, any>>;
      onSuccess: (data?: AxiosResponse) => Promise<void>;
      onError: () => Promise<void>;
    };
    delete: {
      mutationKey: QueryKeys[];
      mutationFn: (data: TDataFields) => Promise<AxiosResponse<any, any>>;
      onSuccess: (data?: AxiosResponse) => Promise<void>;
      onError: () => Promise<void>;
    };
  };
  queryKeys: {
    create: QueryKeys;
    edit: QueryKeys;
    delete: QueryKeys;
  };
};

const QueryProviderContext = React.createContext<TQueryContext>(
  {} as TQueryContext
);

function QueryProvider({ children, api, queryKeys }: Props) {
  const createMutation = useMutation(api.create);
  const editMutation = useMutation(api.edit);
  const deleteMutation = useMutation(api.delete);
  const deletedActivities = useMutationState({
    filters: {
      mutationKey: [queryKeys.delete],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const editedActivities = useMutationState({
    filters: {
      mutationKey: [queryKeys.edit],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const createdActivities = useMutationState({
    filters: {
      mutationKey: [queryKeys.create],
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
    <QueryProviderContext.Provider value={value}>
      {children}
    </QueryProviderContext.Provider>
  );
}

export function useQueryProvider(): TQueryContext {
  const context = React.useContext<TQueryContext>(QueryProviderContext);
  if (context === undefined) {
    throw new Error(
      "useQueryProvider must be used within a QueryProviderContext"
    );
  }
  return context;
}

export default QueryProvider;
