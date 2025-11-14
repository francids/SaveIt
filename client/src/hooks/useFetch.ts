import { useState, useEffect } from "react";
import { backendUrl } from "../config";

export default function useFetch<T = unknown>(
  endpoint: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, unknown>;
    lazy?: boolean;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = async (body?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);

    try {
      const tokenCookie = await cookieStore.get("token");
      const token = tokenCookie?.value;

      const res = await fetch(`${backendUrl}${endpoint}`, {
        method: options?.method || "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: body
          ? JSON.stringify(body)
          : options?.body
          ? JSON.stringify(options.body)
          : undefined,
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!options?.lazy) {
      execute();
    }
  }, [endpoint, options?.method, options?.body, options?.lazy]);

  return { data, error, loading, execute };
}
