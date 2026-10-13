import { useEffect, useState } from "react";

import { getJson } from "#/api.ts";

export type FetchState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export const useFetch = <T>(url: string): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setState({ status: "loading" });

      try {
        const data = await getJson<T>(url, controller.signal);
        if (!controller.signal.aborted) {
          setState({ data, status: "success" });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({ error: error as Error, status: "error" });
        }
      }
    };

    load();

    // Cancels the request when the url changes or the component unmounts, so
    // a slow, outdated response can never overwrite a newer one.
    return () => controller.abort();
  }, [url]);

  return state;
};
