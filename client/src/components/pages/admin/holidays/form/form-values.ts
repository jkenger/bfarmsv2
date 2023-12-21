export const values = (toEditItem?: TDataFields): TDataFields => {
  return {
    name: toEditItem?.name || "",
    description: toEditItem?.description || "",
    prerequisiteDate: toEditItem?.prerequisiteDate || "",
    requisiteDate: toEditItem?.requisiteDate || "",
  } as TDataFields;
};
