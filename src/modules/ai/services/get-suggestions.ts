export async function getSuggestions() {
  const res = await fetch("http://localhost:3000/api/chat/suggestions");
  const suggestions: string = await res.json();

  return suggestions as unknown as string[];
}
