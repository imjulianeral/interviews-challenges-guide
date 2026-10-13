import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isBalanced } from "./balanced-strings.ts";

describe("isBalanced", () => {
  const cases: [input: string, expected: boolean][] = [
    ["", true],
    ["()", true],
    ["()[]{}", true],
    ["{[()]}", true],
    ["((()))", true],
    ["(", false],
    [")", false],
    ["(]", false],
    ["([)]", false],
    ["(()", false],
    ["())", false],
    ["}{", false],
    ["{[()]}]", false],
  ];

  for (const [input, expected] of cases) {
    it(`returns ${expected} for ${JSON.stringify(input)}`, () => {
      assert.equal(isBalanced(input), expected);
    });
  }

  it("ignores non-bracket characters", () => {
    assert.equal(isBalanced("function f(a) { return [a]; }"), true);
    assert.equal(isBalanced("if (x[0] { }"), false);
  });

  it("handles deeply nested input", () => {
    const depth = 100_000;
    assert.equal(isBalanced("(".repeat(depth) + ")".repeat(depth)), true);
    assert.equal(isBalanced("(".repeat(depth) + ")".repeat(depth - 1)), false);
  });
});
