import type { User } from "#/api.ts";

export const UserList = ({ users }: { users: User[] }) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        <strong>{user.name}</strong>
        <span>{user.email}</span>
      </li>
    ))}
  </ul>
);
