import { env } from "@/env";
import { logError } from "@/lib/utils";

class HttpClientError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);

    this.status = status;
    this.name = "HttpClientError";
  }
}

export async function httpClient<T = unknown>(
  path: string,
  options: RequestInit = {},
) {
  const url = new URL(path, env.NEXT_PUBLIC_API_BASE_URL);

  const res = await fetch(url, options);

  const contentType = res.headers.get("Content-Type");
  const isJson = contentType?.includes("application/json");

  if (res.ok) {
    return isJson ? (res.json() as Promise<T>) : undefined;
  }

  const errorMessage = isJson
    ? (await res.json()).message
    : `Failed to fetch "${path}"`;

  logError(errorMessage);
  throw new HttpClientError(errorMessage, res.status);
}
