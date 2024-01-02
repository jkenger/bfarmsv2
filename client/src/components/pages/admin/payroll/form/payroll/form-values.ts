export const values = (toEditItem?: TDataFields): TDataFields => {
  return {
    from: toEditItem ? toEditItem.from : "",
    to: toEditItem ? toEditItem.to : "",
    payrollGroupId: toEditItem ? toEditItem.payrollGroupId : "",
  } as TDataFields;
};
