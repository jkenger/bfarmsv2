/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { UseMutationResult } from "@tanstack/react-query";

import { useEmployeeQuery } from "./EmployeeQueryProvider";

type Props = {
  children: React.ReactNode;
};

type TEmployeeContext = {
  createMutation: UseMutationResult<void, Error, TEmployeeForms, unknown>;

  editMutation: UseMutationResult<void, Error, TEmployeeForms, unknown>;

  deleteMutation: UseMutationResult<string, Error, string, unknown>;
  deletedActivities: TDataFields[];
  editedActivities: TDataFields[];
  createdActivities: TDataFields[];
};

const EmployeeContext = React.createContext({} as TEmployeeContext);

function EmployeeProvider({ children }: Props) {
  const {
    useCreateEmployee,
    useEditEmployee,
    useDeleteEmployee,
    useEmployeeActivities,
  } = useEmployeeQuery();
  const createMutation = useCreateEmployee();
  const editMutation = useEditEmployee();
  const deleteMutation = useDeleteEmployee();
  const { deletedActivities, editedActivities, createdActivities } =
    useEmployeeActivities();

  const value = {
    createMutation,
    editMutation,
    deleteMutation,
    deletedActivities,
    editedActivities,
    createdActivities,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = React.useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployee must be used within a EmployeeProvider");
  }
  return context;
}
export default EmployeeProvider;
