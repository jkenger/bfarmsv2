import { getSearchParams } from "@/components/hooks/useFilterParams";
import { fetch } from "@/lib/utils";
import { GetQueryType, QueryKeys } from "@/types/common";
import { keepPreviousData } from "@tanstack/react-query";

export const getReceipts = ({
  type = GetQueryType.PAGINATED,
  payrollId,
  customParams,
}: TGetQueryOptions & { payrollId?: string }) => {
  const { searchParams: receiptParams } = getSearchParams();
  const searchParams = customParams
    ? Object.keys(customParams).length && new URLSearchParams(customParams)
    : new URLSearchParams(receiptParams);

  // If type is paginated, then add the search params to the query key
  const qKey =
    type === GetQueryType.PAGINATED
      ? [QueryKeys.RECEIPTS, searchParams.toString(), payrollId]
      : [QueryKeys.RECEIPTS, payrollId];

  const qFnQuery =
    type === GetQueryType.PAGINATED
      ? `admin/payrolls/${payrollId}/receipt?${searchParams.toString()}`
      : `admin/payrolls/${payrollId}/receipt/all`;

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
