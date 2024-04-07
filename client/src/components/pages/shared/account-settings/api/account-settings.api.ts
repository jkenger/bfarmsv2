import { fetch } from "@/lib/utils";

import { QueryKeys } from "@/types/common";
import { toast } from "sonner";

export type getResponse = {
  data: TDataFields[];
  numOfPages: number;
};

// export const getTravelpass = ({
//   type = GetQueryType.PAGINATED,
// }: TGetQueryOptions) => {
//   const { searchParams: travelpassParams } = getSearchParams();
//   const searchParams = new URLSearchParams(travelpassParams);
//   // If type is paginated, then add the search params to the query key
//   const qKey =
//     type === GetQueryType.PAGINATED
//       ? [QueryKeys.TRAVELPASS, searchParams.toString()]
//       : [QueryKeys.TRAVELPASS];

//   const qFnQuery =
//     type === GetQueryType.PAGINATED
//       ? `admin/travelpass?${searchParams.toString()}`
//       : `admin/travelpass/all`;
//   return {
//     queryKey: qKey,
//     queryFn: async () => {
//       return await fetch.get(qFnQuery);
//     },

//     placeholderData: keepPreviousData,
//     staleTime: 1000 * 60 * 5,
//   };
// };

// export const createTravelpass = ({ queryClient, form }: TMutation) => {
//   return {
//     mutationKey: [QueryKeys.CREATE_TRAVELPASS],
//     mutationFn: async (data: TDataFields) => {
//       return await fetch.post("/admin/travelpass", {
//         ...data,
//       });
//     },
//     onSuccess: async () => {
//       toast.success(`Travelpass Created`, {
//         description: "A new travelpass has been successfully addded.",
//       });
//       await queryClient.invalidateQueries({
//         queryKey: [QueryKeys.TRAVELPASS],
//       });
//       form?.reset();
//     },
//     onError: async () => {
//       toast.error(`Failed to Create Travelpass`, {
//         description:
//           "Travelpass could not be removed due to an issue. Please try again.",
//       });
//     },
//   };
// };

export const editAccount = ({ queryClient }: TMutation) => {
  const type = "Account";
  return {
    mutationKey: [QueryKeys.EDIT_ACCOUNT],
    mutationFn: async (data: TDataFields) => {
      return await fetch.put(`/admin/account/${data.id}`, {
        ...data,
      });
    },
    onSuccess: async () => {
      toast.success(`${type} Updated`, {
        description: `Changes to the ${type} details have been saved.`,
      });
      // Invalidate the account query to refetch the updated data
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.ACCOUNT],
      });
    },
    onError: async () => {
      toast.error(`Failed to Update ${type}`, {
        description: `Changes to the ${type} details could not be saved. Please retry.`,
      });
    },
  };
};

// export const deleteTravelpass = ({ queryClient }: TMutation) => {
//   return {
//     mutationKey: [QueryKeys.DELETE_TRAVELPASS],
//     mutationFn: async (data: TDataFields) => {
//       return await fetch.delete(`/admin/travelpass/${data.id}`);
//     },
//     onSuccess: async () => {
//       toast.warning(`Travelpass Deleted`, {
//         className: "bg-primary",
//         description: "Travelpass selected has been removed from the records.",
//       });
//       await queryClient.invalidateQueries({
//         queryKey: [QueryKeys.TRAVELPASS],
//       });
//       // await queryClient.invalidateQueries({ queryKey: [QueryKeys.EMPLOYEES] });
//     },
//     onError: async () => {
//       toast.error("Failed to Delete Travelpass", {
//         description:
//           "Travelpass selected could not be removed due to an issue. Please try again.",
//       });
//     },
//   };
// };
