import type { ApiResponse } from "@annisa/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export class ApiClientError extends Error {
  public statusCode: number;
  public errors?: unknown[];

  constructor(message: string, statusCode: number, errors?: unknown[]) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  responseType?: "json" | "blob" | "text";
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { query, headers, body, responseType = "json", ...rest } = options;

  let url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  if (query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const reqHeaders: Record<string, string> = {
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
    ...((headers as Record<string, string>) || {}),
  };

  const payload =
    body === undefined || isFormData
      ? (body as BodyInit)
      : JSON.stringify(body);

  const response = await fetch(url, {
    ...rest,
    headers: reqHeaders,
    body: payload,
    credentials: "include", // Otomatis mengirim & menerima httpOnly cookie
  });

  if (responseType === "blob") {
    if (!response.ok) {
      throw new ApiClientError(
        `Gagal mengunduh file (status ${response.status})`,
        response.status,
      );
    }
    return (await response.blob()) as unknown as T;
  }

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (!isJson) {
    if (!response.ok) {
      throw new ApiClientError(
        `Request gagal dengan status ${response.status}`,
        response.status,
      );
    }
    return (await response.text()) as unknown as T;
  }

  const json: ApiResponse<T> = await response.json();

  if (!response.ok || !json.success) {
    throw new ApiClientError(
      json.message || `Request gagal dengan status ${response.status}`,
      response.status,
      json.errors,
    );
  }

  return json.data as T;
}

export const apiClient = {
  get: <T>(
    path: string,
    query?: RequestOptions["query"],
    options?: RequestOptions,
  ) => request<T>(path, { ...options, method: "GET", query }),

  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),

  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),

  getBlob: (
    path: string,
    query?: RequestOptions["query"],
    options?: RequestOptions,
  ) =>
    request<Blob>(path, {
      ...options,
      method: "GET",
      query,
      responseType: "blob",
    }),
};
