export const values = (toEditItem?: TDataFields): TDataFields => {
  return {
    userId: toEditItem?.userId || "",
    typeOf: toEditItem?.typeOf || "",
    start: toEditItem?.start || "",
    end: toEditItem?.end || "",
  } as TDataFields;
};
