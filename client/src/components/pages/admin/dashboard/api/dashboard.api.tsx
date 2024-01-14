import { getSearchParams } from "@/components/hooks/useFilterParams";
import { fetch } from "@/lib/utils";
import { GetQueryType, QueryKeys } from "@/types/common";
import { keepPreviousData } from "@tanstack/react-query";

export const getDashboard = ({
  type = GetQueryType.PAGINATED,

  customParams,
}: TGetQueryOptions) => {
  const { searchParams: receiptParams } = getSearchParams();
  const searchParams = customParams
    ? Object.keys(customParams).length && new URLSearchParams(customParams)
    : new URLSearchParams(receiptParams);

  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.DASHBOARD, searchParams.toString()]
      : [QueryKeys.DASHBOARD];

  const qFnQuery =
    type === GetQueryType.PAGINATED ? `admin/dashboard` : `admin/dashboard`;

  console.log(qFnQuery);
  return {
    queryKey: qKey,
    queryFn: async () => {
      const axiosData = await fetch.get(qFnQuery);
      return axiosData.data;
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  };
};
