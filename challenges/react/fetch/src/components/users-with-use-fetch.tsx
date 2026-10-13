import type { User } from "#/api.ts";
import { useFetch } from "#/hooks/use-fetch.ts";

import { UserList } from "./user-list.tsx";

export const UsersWithUseFetch = ({ url }: { url: string }) => {
  const state = useFetch<User[]>(url);

  if (state.status === "loading") {
    return <p>Loading…</p>;
  }

  if (state.status === "error") {
    return <p role="alert">Error: {state.error.message}</p>;
  }

  return <UserList users={state.data} />;
};
