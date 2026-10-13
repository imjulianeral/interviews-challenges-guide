import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  // Installed skills are vendored; leave them as published.
  ignorePatterns: [
    ...ultracite.ignorePatterns,
    ".agents/skills",
    ".claude/skills",
  ],
});
