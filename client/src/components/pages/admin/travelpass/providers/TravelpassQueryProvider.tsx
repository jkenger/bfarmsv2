import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

import { QueryKeys } from "@/types/common";
import {
  createTravelpass,
  deleteTravelpass,
  editTravelpass,
} from "../api/travelpass.api";

type Props = {
  children: React.ReactNode;
};

const TravelPassContext = React.createContext<TQueryContext>(
  {} as TQueryContext
);

function TravelpassQueryProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createTravelpass({ queryClient }));
  const editMutation = useMutation(editTravelpass({ queryClient }));
  const deleteMutation = useMutation(deleteTravelpass({ queryClient }));
  const deletedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.DELETE_TRAVELPASS],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const editedActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.EDIT_TRAVELPASS],
      status: "success",
    },
    select: (mutation) => mutation.state.variables,
  }) as TDataFields[];
  const createdActivities = useMutationState({
    filters: {
      mutationKey: [QueryKeys.CREATE_TRAVELPASS],
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
    <TravelPassContext.Provider value={value}>
      {children}
    </TravelPassContext.Provider>
  );
}

export function useTravelpassQuery(): TQueryContext {
  const context = React.useContext<TQueryContext>(TravelPassContext);
  if (context === undefined) {
    throw new Error(
      "useTravelpassQuery must be used within a TravelpassQueryProvider"
    );
  }
  return context;
}

export default TravelpassQueryProvider;
