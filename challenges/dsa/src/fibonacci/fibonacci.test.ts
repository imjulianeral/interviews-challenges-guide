import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { MAX_TERMS, fibonacci } from "./fibonacci.ts";

describe("fibonacci", () => {
  const cases: [n: number, expected: number[]][] = [
    [0, []],
    [1, [0]],
    [2, [0, 1]],
    [3, [0, 1, 1]],
    [10, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]],
  ];

  for (const [n, expected] of cases) {
    it(`returns ${JSON.stringify(expected)} for ${n}`, () => {
      assert.deepEqual(fibonacci(n), expected);
    });
  }

  it("makes every term the sum of the previous two", () => {
    const sequence = fibonacci(MAX_TERMS);
    assert.equal(sequence.length, MAX_TERMS);
    for (let i = 2; i < sequence.length; i += 1) {
      const [a, b, sum] = sequence.slice(i - 2, i + 1) as [
        number,
        number,
        number,
      ];
      assert.equal(sum, a + b);
    }
  });

  it("stays exact up to the largest supported term", () => {
    const last = fibonacci(MAX_TERMS).at(-1);
    assert.equal(last, 8_944_394_323_791_464);
    assert.ok(Number.isSafeInteger(last));
  });

  it("rejects more terms than can be represented exactly", () => {
    assert.throws(() => fibonacci(MAX_TERMS + 1), RangeError);
  });

  it("rejects negative and non-integer input", () => {
    assert.throws(() => fibonacci(-1), RangeError);
    assert.throws(() => fibonacci(2.5), RangeError);
    assert.throws(() => fibonacci(Number.NaN), RangeError);
    assert.throws(() => fibonacci(Number.POSITIVE_INFINITY), RangeError);
  });
});
