import { Suspense, use } from "react";

import { getJson } from "#/api.ts";
import type { User } from "#/api.ts";

import { ErrorBoundary } from "./error-boundary.tsx";
import { UserList } from "./user-list.tsx";

// `use` needs the same promise on every render. A promise created during
// render would be a new one each time, and the component would suspend forever.
const cache = new Map<string, Promise<unknown>>();

const getJsonCached = <T,>(url: string): Promise<T> => {
  if (!cache.has(url)) {
    cache.set(url, getJson<T>(url));
  }
  return cache.get(url) as Promise<T>;
};

const renderError = (error: Error) => (
  <p role="alert">Error: {error.message}</p>
);

const Users = ({ usersPromise }: { usersPromise: Promise<User[]> }) => {
  // Suspends while the promise is pending and throws if it rejected, so this
  // component only ever runs with the data.
  const users = use(usersPromise);

  return <UserList users={users} />;
};

export const UsersWithUse = ({ url }: { url: string }) => (
  // The key resets the boundary when the url changes.
  <ErrorBoundary key={url} fallback={renderError}>
    <Suspense fallback={<p>Loading…</p>}>
      <Users usersPromise={getJsonCached<User[]>(url)} />
    </Suspense>
  </ErrorBoundary>
);
