import React from "react";
import { Badge } from "./badge";
import { Loader2, MoveRight } from "lucide-react";
import { AxiosError } from "axios";
import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "./button";
import { TableCell } from "./table";

type Props = {
  children: React.ReactNode;
};

function DataTableColumnStatus({ children }: Props) {
  return (
    <TableCell className="flex items-center justify-center backdrop-blur-sm bg-muted gap-2 absolute inset-0">
      {children}
    </TableCell>
  );
}

function DataTableColumnStatusAdding() {
  return (
    <DataTableColumnStatus>
      <Badge className="hover:cursor-default space-x-2">
        <Loader2 size="14" className="animate-spin" />
        <span> Creating your new information </span>
      </Badge>
    </DataTableColumnStatus>
  );
}

function DataTableColumnStatusAddingFails({
  mutation,
  action,
}: {
  mutation?: UseMutationResult<void, Error, TDataFields, unknown>;
  action?: React.ReactNode;
}) {
  const error = mutation?.error as AxiosError;

  return (
    <DataTableColumnStatus>
      <Badge variant="destructive" className="hover:cursor-default space-x-2">
        <span className="font-bold">{error?.response?.status}</span>
        <span>
          {" "}
          {typeof error.response?.data === "string"
            ? error.response.data.toString()
            : ""}{" "}
        </span>
      </Badge>
      {action}
    </DataTableColumnStatus>
  );
}
function DataTableColumnStatusEdit({ variables }: { variables: TDataFields }) {
  return (
    <DataTableColumnStatus>
      <Badge className="hover:cursor-default space-x-2">
        <Loader2 size="14" className="animate-spin" />
        <span> Updating data</span>
      </Badge>
      <MoveRight size="16" />
      <Badge variant="outline">
        <span>{variables.id}</span>
      </Badge>
    </DataTableColumnStatus>
  );
}

function DataTableColumnStatusEditFails({
  mutation,
  action,
}: {
  mutation?: UseMutationResult<void, Error, TDataFields, unknown>;
  action?: React.ReactNode;
}) {
  const error = mutation?.error as AxiosError;

  return (
    <DataTableColumnStatus>
      <Badge variant="destructive" className="hover:cursor-default space-x-2">
        <span className="font-bold">{error?.response?.status}</span>
        <span>
          {" "}
          {typeof error.response?.data === "string"
            ? error.response.data.toString()
            : ""}{" "}
        </span>
      </Badge>
      {action}
    </DataTableColumnStatus>
  );
}

function DataTableColumnStatusDelete({
  variables,
}: {
  variables: TDataFields;
}) {
  return (
    <DataTableColumnStatus>
      <Badge variant="destructive" className="hover:cursor-default space-x-2">
        <Loader2 size="14" className="animate-spin" />

        <span> Deleting data</span>
      </Badge>
      <MoveRight size="16" />
      <Badge variant="outline">
        <span>{variables.id}</span>
      </Badge>
    </DataTableColumnStatus>
  );
}

function DataTableColumnStatusDeleteFails({
  mutation,
}: {
  mutation: UseMutationResult<void, Error, TDataFields, unknown>;
}) {
  const error = mutation.error as AxiosError;
  return (
    <DataTableColumnStatus>
      <Badge variant="destructive" className="hover:cursor-default space-x-2">
        <span className="font-bold">{error?.response?.status}</span>
        <span>
          {" "}
          {typeof error.response?.data === "string"
            ? error.response.data.toString()
            : ""}{" "}
        </span>
      </Badge>
      <Button
        variant="outline"
        size="xs"
        className="font-semibold my-1 ml-2"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload page
      </Button>
    </DataTableColumnStatus>
  );
}

export {
  DataTableColumnStatusAdding,
  DataTableColumnStatusAddingFails,
  DataTableColumnStatusEdit,
  DataTableColumnStatusEditFails,
  DataTableColumnStatusDelete,
  DataTableColumnStatusDeleteFails,
};
