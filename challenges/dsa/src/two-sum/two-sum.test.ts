import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { twoSum } from "./two-sum.ts";

describe("twoSum", () => {
  const cases: [
    nums: number[],
    target: number,
    expected: [number, number] | null,
  ][] = [
    [[2, 7, 11, 15], 9, [0, 1]],
    [[3, 2, 4], 6, [1, 2]],
    [[3, 3], 6, [0, 1]],
    [[-1, -2, -3, -4, -5], -8, [2, 4]],
    [[0, 4, 3, 0], 0, [0, 3]],
    [[1, 5, 9], 10, [0, 2]],
    [[1, 2, 3], 7, null],
    [[5], 10, null],
    [[], 0, null],
  ];

  for (const [nums, target, expected] of cases) {
    it(`returns ${JSON.stringify(expected)} for ${JSON.stringify(nums)} and target ${target}`, () => {
      assert.deepEqual(twoSum(nums, target), expected);
    });
  }

  it("does not use the same element twice", () => {
    assert.equal(twoSum([3, 1], 6), null);
  });

  it("handles large inputs in linear time", () => {
    const size = 1_000_000;
    const nums = Array.from({ length: size }, (_, i) => i);
    assert.deepEqual(twoSum(nums, 2 * size - 3), [size - 2, size - 1]);
  });
});
