import { setDateTime } from "@/lib/helpers";

export const dtrStates = (
  toEditItem?: TDataFields,
  action = "create"
): TDataFields => {
  return {
    userId: toEditItem?.userId || "",
    amTimeIn: toEditItem?.amTimeIn
      ? new Date(toEditItem.amTimeIn).toLocaleString()
      : action === "create"
      ? setDateTime(8, 0, 0).toLocaleString()
      : null,
    amTimeOut: toEditItem?.amTimeOut
      ? new Date(toEditItem.amTimeOut).toLocaleString()
      : action === "create"
      ? setDateTime(12, 0, 0).toLocaleString()
      : null,
    pmTimeIn: toEditItem?.pmTimeIn
      ? new Date(toEditItem.pmTimeIn).toLocaleString()
      : action === "create"
      ? setDateTime(13, 0, 0).toLocaleString()
      : null,
    pmTimeOut: toEditItem?.pmTimeOut
      ? new Date(toEditItem.pmTimeOut).toLocaleString()
      : action === "create"
      ? setDateTime(17, 0, 0).toLocaleString()
      : null,
  } as TDataFields;
};
