export const values = (toEditItem?: TDataFields): TDataFields => {
  return {
    employeeId: toEditItem ? toEditItem.employeeId : "",
    rfId: toEditItem ? toEditItem.rfId : "",
    firstName: toEditItem ? toEditItem.firstName : "",
    middleName: toEditItem ? toEditItem.middleName : "",
    lastName: toEditItem ? toEditItem.lastName : "",
    age: toEditItem ? toEditItem.age : "",
    designationId: toEditItem ? toEditItem.designationId : "",
    payrollGroupId: toEditItem ? toEditItem.payrollGroupId : "",
    deductions: toEditItem ? toEditItem.deductions : "",
  } as TDataFields;
};
