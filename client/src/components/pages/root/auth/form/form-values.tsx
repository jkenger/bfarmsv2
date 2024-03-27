export const loginValues = (toEditItem?: TDataFields): TDataFields => {
  return {
    email: toEditItem ? toEditItem.email : "",
    password: toEditItem ? toEditItem.password : "",
  } as TDataFields;
};

export const step2Values = (toEditItem?: TDataFields): TDataFields => {
  return {
    twofaToken: toEditItem ? toEditItem.twofaToken : "",
  } as TDataFields;
}
