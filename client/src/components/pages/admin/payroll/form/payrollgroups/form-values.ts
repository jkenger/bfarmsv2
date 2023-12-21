export const values = (toEditItem?: TDataFields): TDataFields => {
  return {
    name: toEditItem ? toEditItem.name : "",
    fundCluster: toEditItem ? toEditItem.fundCluster : "",
    programName: toEditItem ? toEditItem.programName : "",
  } as TDataFields;
};
