import { QueryKeys } from "@/types/common";
import { QueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const setDateTime = (
  h: number,
  m: number,
  s: number,
  ms?: number,
  mDate?: string
) => {
  const hour = h ? h : 0;
  const minute = m ? m : 0;
  const second = s ? s : 0;
  const milisec = ms ? ms : 0;
  const date = mDate ? new Date(mDate) : new Date();
  date.setHours(hour, minute, second, milisec);
  return date;
};

export const performOptimisticUpdate = ({
  queryClient,
  queryKeys,
  data,
  action = "create",
}: {
  queryClient: QueryClient;
  queryKeys: QueryKeys[] | string[];
  data: TDataFields;
  action?: "create" | "update" | "delete";
}) => {
  queryClient.setQueryData(queryKeys, (oldData: AxiosResponse) => {
    let oldDataCopy = oldData.data.data;
    if (action === "update") {
      oldDataCopy = oldDataCopy.map((item: TDataFields) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      });
    }
    if (action === "delete") {
      oldDataCopy = oldDataCopy.filter((item: TDataFields) => {
        return item.id !== data.id;
      });
      console.log(oldDataCopy);
    }
    return {
      ...oldData,
      data: {
        data: action === "create" ? [data, ...oldDataCopy] : [...oldDataCopy],
        numOfPages: oldData.data.numOfPages,
      },
    };
  });
};
