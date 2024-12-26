import { httpClient } from "@/http/client";
import { suggestionsModel } from "./schema";

export async function getSuggestions() {
  const suggestions = await httpClient<string[]>("/api/chat/suggestions");
  return suggestionsModel.parse(suggestions);
}
