import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fizzBuzzBaz } from "./fizz-buzz-baz.ts";

describe("fizzBuzzBaz", () => {
  it("returns the sequence from 1 to n", () => {
    assert.deepEqual(fizzBuzzBaz(15), [
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "Baz",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "Baz",
      "FizzBuzz",
    ]);
  });

  const cases: [position: number, expected: string][] = [
    [1, "1"],
    [3, "Fizz"],
    [5, "Buzz"],
    [7, "Baz"],
    [15, "FizzBuzz"],
    [21, "FizzBaz"],
    [35, "BuzzBaz"],
    [105, "FizzBuzzBaz"],
    [104, "104"],
    [210, "FizzBuzzBaz"],
  ];

  const sequence = fizzBuzzBaz(210);

  for (const [position, expected] of cases) {
    it(`has ${JSON.stringify(expected)} at position ${position}`, () => {
      assert.equal(sequence[position - 1], expected);
    });
  }

  it("returns an empty sequence for 0", () => {
    assert.deepEqual(fizzBuzzBaz(0), []);
  });

  it("returns n entries", () => {
    assert.equal(fizzBuzzBaz(1000).length, 1000);
  });

  it("rejects negative and non-integer input", () => {
    assert.throws(() => fizzBuzzBaz(-1), RangeError);
    assert.throws(() => fizzBuzzBaz(2.5), RangeError);
    assert.throws(() => fizzBuzzBaz(Number.NaN), RangeError);
    assert.throws(() => fizzBuzzBaz(Number.POSITIVE_INFINITY), RangeError);
  });
});
