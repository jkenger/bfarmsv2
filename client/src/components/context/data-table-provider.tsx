import { UseMutationResult } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { createContext, useContext } from "react";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isFetching?: boolean;
  numOfPages?: number;
  dataReloader?: () => void;
  mutations?: {
    create: UseMutationResult<void, Error, TDataFields, unknown>;
    delete: UseMutationResult<void, Error, TDataFields, unknown>;
    edit: UseMutationResult<void, Error, TDataFields, unknown>;
  };
  onEditErrorAction?: React.ReactElement;
  onCreateErrorAction?: React.ReactElement;
  facetedFilterButtons?: React.ReactElement;
  dateRangePicker?: boolean;
}
type Props<TData, TValue> = {
  children: React.ReactNode;
  value: DataTableProps<TData, TValue>;
};

const DataTableContext = createContext({});

function DataTableProvider<TData extends TDataFields, TValue>({
  children,
  value,
}: Props<TData, TValue>) {
  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
}

export function useDataTable() {
  const context = useContext(DataTableContext);
  if (context === undefined) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context;
}

export default DataTableProvider;
