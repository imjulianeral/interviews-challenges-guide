# Interview Challenges

Worked examples of coding-interview challenges in TypeScript. Each challenge lives in its own folder under `src/` with the problem statement, a solution and tests; they all share this package's `package.json` and `tsconfig.json`.

| Challenge                                  | Technique  |
| ------------------------------------------ | ---------- |
| [Balanced Strings](./src/balanced-strings) | Stack      |
| [Fibonacci Sequence](./src/fibonacci)      | Iteration  |
| [FizzBuzzBaz](./src/fizz-buzz-baz)         | Object map |
| [Two Sum](./src/two-sum)                   | Hash map   |

## Running

Requires Node 24+, which runs TypeScript files directly.

```sh
nub install            # TypeScript and Node types, for type checking only
nub run test           # run every challenge's tests
nub run test:watch     # re-run on change
nub run typecheck
```

Run a single challenge:

```sh
nub run test "src/two-sum/*.test.ts"
```

## Imports

`#/` is an alias for `src/`, declared under `imports` in `package.json`, so it works in Node and TypeScript without extra config:

```ts
import { twoSum } from "#/two-sum/two-sum.ts";
```

Files in the same folder import each other with `./`.

## Adding a challenge

Create a folder under `src/` named after the challenge containing:

- `README.md` — problem statement, examples, approach and follow-ups
- `<name>.ts` — the solution, exported as a named function
- `<name>.test.ts` — tests using `node:test` and `node:assert/strict`

Tests are discovered automatically; add a row to the table above.
