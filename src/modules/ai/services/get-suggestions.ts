import { env } from "@/env";

export async function getSuggestions() {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/api/chat/suggestions`
  const res = await fetch(url);
  const suggestions: string = await res.json();

  return suggestions as unknown as string[];
}
