const WORDS = new Map<number, string>()
  .set(3, "Fizz")
  .set(5, "Buzz")
  .set(7, "Baz");

/**
 * Returns the FizzBuzzBaz sequence from 1 to `n`: each number is replaced by
 * the words of every divisor that divides it, or kept as a decimal string when
 * none does.
 *
 * Time: O(n) — Space: O(n)
 */
export const fizzBuzzBaz = (n: number): string[] => {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`n must be a non-negative integer, got ${n}`);
  }

  const result: string[] = [];

  for (let i = 1; i <= n; i += 1) {
    let words = "";
    for (const [divisor, word] of WORDS) {
      if (i % divisor === 0) {
        words += word;
      }
    }
    result.push(words || String(i));
  }

  return result;
};
