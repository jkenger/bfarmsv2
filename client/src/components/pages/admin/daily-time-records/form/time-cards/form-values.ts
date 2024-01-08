export const values = (toEditItem?: TDataFields): TDataFields => {
  return {
    from: toEditItem ? toEditItem.from : "",
    to: toEditItem ? toEditItem.to : "",
    employeeId: toEditItem ? toEditItem.employeeId : "",
    isAllEmployees: toEditItem ? toEditItem.isAllEmployees : true,
  } as TDataFields;
};
