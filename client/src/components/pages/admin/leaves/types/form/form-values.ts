export const values = (toEditItem?: TDataFields): TDataFields => {
  return {
    name: toEditItem ? toEditItem.name : "",
    description: toEditItem ? toEditItem.description : "",
  } as TDataFields;
};
