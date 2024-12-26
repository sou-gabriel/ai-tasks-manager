import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/get-services";

export function useGetTasks(query: string) {
  const { data = [], isLoading, error, refetch, isFetching } = useQuery({
    staleTime: 1000 * 60 * 5,
    queryKey: ["@atm.tasks", query],
    queryFn: () => getTasks(query),
  });

  return {
    tasks: data,
    isLoadingTasks: isLoading,
    tasksErrorMessage: error?.message,
    refetchTasks: refetch,
    isRefetchingTasks: isFetching,
  };
}
