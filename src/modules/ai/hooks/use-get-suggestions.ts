import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/get-suggestions";

export function useGetSuggestions() {
  const { data = [], isLoading } = useQuery({
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryKey: ["@atm.chat.suggestions"],
    queryFn: getSuggestions,
  });

  return {
    suggestions: data,
    isLoadingSuggestions: isLoading,
  };
}
