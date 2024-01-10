import { getSearchParams } from "@/components/hooks/useFilterParams";
import { fetch } from "@/lib/utils";
import { GetQueryType, QueryKeys } from "@/types/common";
import { keepPreviousData } from "@tanstack/react-query";

export const getSheets = ({
  type = GetQueryType.PAGINATED,
  id,
  customParams,
}: TGetQueryOptions & { id: string }) => {
  const { searchParams: receiptParams } = getSearchParams();
  const searchParams = customParams
    ? Object.keys(customParams).length && new URLSearchParams(customParams)
    : new URLSearchParams(receiptParams);

  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.RECEIPTS, searchParams.toString(), id]
      : [QueryKeys.RECEIPTS, id];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/daily-time-records/time-cards/${id}?${searchParams.toString()}`
      : `admin/daily-time-records/time-cards/${id}/all`;

  console.log(qFnQuery);
  return {
    queryKey: qKey,
    queryFn: async () => {
      return await fetch.get(qFnQuery);
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};
