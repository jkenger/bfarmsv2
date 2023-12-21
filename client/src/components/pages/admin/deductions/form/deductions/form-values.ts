export const values = (toEditItem?: TDataFields): TDataFields => {
  return {
    name: toEditItem ? toEditItem.name : "",
    amount: toEditItem ? toEditItem.amount : "",
  } as TDataFields;
};
