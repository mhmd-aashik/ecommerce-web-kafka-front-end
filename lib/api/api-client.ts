import { auth } from "@/auth";

interface ApiRequestOptions extends RequestInit {
  authenticated?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { authenticated = true, headers, ...requestOptions } = options;

  const requestHeaders = new Headers(headers);

  requestHeaders.set("Content-Type", "application/json");

  if (authenticated) {
    const session = await auth();

    if (!session?.accessToken) {
      throw new Error("Authentication is required");
    }

    requestHeaders.set("Authorization", `Bearer ${session.accessToken}`);
  }

  const baseUrl = process.env.API_GATEWAY_URL;

  if (!baseUrl) {
    throw new Error("API_GATEWAY_URL is not configured");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...requestOptions,
    headers: requestHeaders,
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(`API request failed: ${response.status} ${body}`);
  }

  return response.json() as Promise<T>;
}
