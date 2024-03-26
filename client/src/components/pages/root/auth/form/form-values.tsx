export const loginValues = (toEditItem?: TDataFields): TDataFields => {
  return {
    email: toEditItem ? toEditItem.email : "",
    password: toEditItem ? toEditItem.password : "",
  } as TDataFields;
};
