# Fetch challenge

A worked example of the data-fetching challenge that comes up in most React interviews, solved twice: with a custom `useFetch` hook and with React 19's `use` hook.

## The challenge

> Fetch a list of users from `https://jsonplaceholder.typicode.com/users` and render their names and emails. Show a loading state while the request is in flight and an error state if it fails.

What the interviewer is usually looking for:

- Loading, success and error are all handled.
- HTTP errors are handled: `fetch` only rejects on network failures, so a 404 or 500 has to be detected with `response.ok`.
- The request is cleaned up when the component unmounts or the URL changes, so a slow, outdated response cannot overwrite a newer one (the race condition).
- The fetching logic is reusable instead of being written inside the component.

## Running

```sh
nub install        # from anywhere in the workspace
nub run dev
```

The page shows both solutions side by side. Tick **Simulate a failed request** to point both at a URL that responds with a 404.

Other scripts: `nub run build` (type check and bundle). Linting and formatting run from the workspace root.

## Solution 1: a custom `useFetch` hook

[`src/hooks/use-fetch.ts`](./src/hooks/use-fetch.ts), used by [`src/components/users-with-use-fetch.tsx`](./src/components/users-with-use-fetch.tsx).

```tsx
const state = useFetch<User[]>(url);

if (state.status === "loading") return <p>Loading…</p>;
if (state.status === "error") return <p>Error: {state.error.message}</p>;
return <UserList users={state.data} />;
```

- The hook runs the request in a `useEffect` that depends on `url`.
- The state is a single object with a `status` of `loading`, `success` or `error`. Three separate `useState` calls would allow combinations that make no sense, such as loading and error at the same time; here TypeScript only exposes `data` once the status is `success`.
- The effect's cleanup calls `controller.abort()`. That cancels the request, and the `signal.aborted` checks stop an outdated response from updating state.

## Solution 2: the `use` hook

[`src/components/users-with-use.tsx`](./src/components/users-with-use.tsx), with [`src/components/error-boundary.tsx`](./src/components/error-boundary.tsx).

```tsx
const Users = ({ usersPromise }: { usersPromise: Promise<User[]> }) => {
  const users = use(usersPromise);
  return <UserList users={users} />;
};

<ErrorBoundary key={url} fallback={renderError}>
  <Suspense fallback={<p>Loading…</p>}>
    <Users usersPromise={getJsonCached<User[]>(url)} />
  </Suspense>
</ErrorBoundary>;
```

`use` reads the value of a promise during render:

- While the promise is pending, the component suspends and the nearest `<Suspense>` shows its fallback. That is the loading state.
- If the promise rejects, `use` throws and the nearest error boundary catches it. That is the error state.
- Otherwise it returns the resolved value, so `Users` contains no loading or error code at all.

The one rule that trips people up: **the promise must be the same object on every render**. Calling `fetch` inside the component would create a new promise each time it renders, and it would suspend forever. Here `getJsonCached` keeps one promise per URL in a `Map`. In a real app that cache is the job of a framework or a library such as TanStack Query, or the promise comes from a Server Component.

Other things worth knowing about `use`:

- Unlike other hooks, it can be called inside conditions and loops. It still has to be called from a component or a hook, and not inside `try`/`catch`.
- Error boundaries still have to be class components, which is why `error-boundary.tsx` exists. The `key={url}` resets it when the URL changes.
- React logs errors caught by a boundary to the console in development, so the simulated failure prints one there. That is expected.

## Comparing the two

|  | `useFetch` | `use` |
| --- | --- | --- |
| Loading state | `status === 'loading'` branch | `<Suspense fallback>` |
| Error state | `status === 'error'` branch | Error boundary |
| When the request starts | After the first render, in an effect | During render, when the promise is created |
| Outdated responses | Aborted in the effect cleanup | Never rendered, but the request is not cancelled |
| Repeated requests | Refetches every time the URL changes back | Served from the cache |
| Extra pieces needed | None | A promise cache and an error boundary |
| Works before React 19 | Yes | No |

With React's Strict Mode in development, loading the page makes three requests for the users: two from `useFetch`, because Strict Mode runs the effect twice and the first request is aborted, and one from `use`.

The cache in this example is deliberately minimal: it never expires and it also keeps failed requests, so a URL that failed once keeps failing until the page is reloaded. That limitation is the usual argument for a data-fetching library.

## Follow-ups

- Add a retry button to both solutions. (`useFetch`: return a `refetch` function. `use`: remove the cache entry and reset the error boundary.)
- Keep the previous list visible while a new URL loads. (`use`: wrap the state update in `startTransition`.)
- Add pagination or a search box that changes the URL, with a debounce.
- Cache responses in `useFetch` so going back to a URL does not refetch.
- When would you not write either and use TanStack Query or a framework loader?
