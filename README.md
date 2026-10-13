# Interviews

Interview challenges, as a [nub](https://nubjs.com/docs) workspace.

```
challenges/
  dsa/              algorithm challenges (Node's test runner)
  react/
    autocomplete/   debounced autocomplete (React + Vite)
    fetch/          data fetching with useFetch and use (React + Vite)
```

## Running

```sh
nub install         # installs every package; one nub.lock at the root
nub run test        # each script runs in every package that defines it
nub run typecheck
nub run build
```

Linting ([oxlint](https://oxc.rs/docs/guide/usage/linter)) and formatting ([oxfmt](https://oxc.rs/docs/guide/usage/formatter)) use the [Ultracite](https://www.ultracite.ai) presets. They are configured once at the root, in `oxlint.config.ts` and `oxfmt.config.ts`, and cover every package:

```sh
nub run check       # lint and check formatting, without changing files
nub run fix         # apply lint fixes and format in place
```

`nub run lint`, `nub run fmt` and `nub run fmt:check` run each tool on its own.

Run a script in one package with `-F`, or from inside its folder:

```sh
nub run -F fetch dev
```

## Imports

In every package `#/` is an alias for that package's `src/`, declared under `imports` in its `package.json`:

```ts
import { getJson } from "#/api.ts";
```

## Adding a challenge

- Algorithm: a new folder under `challenges/dsa/src/`; see [its README](./challenges/dsa/README.md).
- React: a new package under `challenges/react/`. It is picked up by the `challenges/react/*` workspace glob; copy the `imports` entry from an existing one.
