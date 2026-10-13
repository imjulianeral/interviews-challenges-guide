export interface User {
  id: number;
  name: string;
  email: string;
}

export const USERS_URL = "https://jsonplaceholder.typicode.com/users";
// Responds with a 404, to see the error state.
export const BROKEN_URL = "https://jsonplaceholder.typicode.com/not-found";

export const getJson = async <T>(
  url: string,
  signal?: AbortSignal
): Promise<T> => {
  const response = await fetch(url, { signal });

  // fetch only rejects on network failures, so HTTP errors are checked by hand.
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};
