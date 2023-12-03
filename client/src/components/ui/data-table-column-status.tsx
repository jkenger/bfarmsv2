import React from "react";
import { Badge } from "./badge";
import { Loader2, MoveRight } from "lucide-react";
import { AxiosError } from "axios";
import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "./button";

type Props = {
  children: React.ReactNode;
};

function DataTableColumnStatus({ children }: Props) {
  return (
    <div className="flex items-center justify-center bg-muted/80 gap-2 absolute inset-0">
      {children}
    </div>
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
  mutation?: UseMutationResult<void, Error, TAdminForms, unknown>;
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
function DataTableColumnStatusEdit({ variables }: { variables: TAdminForms }) {
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
  mutation?: UseMutationResult<void, Error, TAdminForms, unknown>;
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

function DataTableColumnStatusDelete({ variables }: { variables: string }) {
  return (
    <DataTableColumnStatus>
      <Badge variant="destructive" className="hover:cursor-default space-x-2">
        <Loader2 size="14" className="animate-spin" />

        <span> Deleting data</span>
      </Badge>
      <MoveRight size="16" />
      <Badge variant="outline">
        <span>{variables}</span>
      </Badge>
    </DataTableColumnStatus>
  );
}

function DataTableColumnStatusDeleteFails({
  mutation,
}: {
  mutation: UseMutationResult<string, Error, string, unknown>;
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
