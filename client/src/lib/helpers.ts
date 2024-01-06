import { getSearchParams } from "@/components/hooks/useFilterParams";
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
  data: AxiosResponse;
  action?: "create" | "update" | "delete";
}) => {
  const { paramStrings } = getSearchParams();
  const newData: TDataFields = {
    // change this to the correct shape of your data from the api
    ...data.data.data,
    //

    // add the status property to the data, use it to display the status of the data win the ui
    status: action === "create" ? "new" : "updated",
  };
  queryClient.setQueryData(
    [...queryKeys, paramStrings],
    (oldData: AxiosResponse) => {
      // change this to the correct shape of your data from the api
      let oldDataCopy = oldData.data.data;
      //
      if (action === "update") {
        oldDataCopy = oldDataCopy.map((item: TDataFields) => {
          if (item.id === newData.id) {
            return newData;
          }
          return item;
        });
      }
      if (action === "delete") {
        oldDataCopy = oldDataCopy.filter((item: TDataFields) => {
          return item.id !== newData.id;
        });
      }

      return {
        ...oldData,
        data: {
          data:
            action === "create" ? [newData, ...oldDataCopy] : [...oldDataCopy],
          numOfPages: oldData.data.numOfPages,
        },
      };
    }
  );
};
