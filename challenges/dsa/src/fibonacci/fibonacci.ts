/** F(78) is the largest Fibonacci number that fits in a safe integer. */
export const MAX_TERMS = 79;

/**
 * Returns the first `n` terms of the Fibonacci sequence, starting at 0, 1.
 *
 * Time: O(n) — Space: O(n)
 */
export const fibonacci = (n: number): number[] => {
  if (!Number.isInteger(n) || n < 0 || n > MAX_TERMS) {
    throw new RangeError(
      `n must be an integer between 0 and ${MAX_TERMS}, got ${n}`
    );
  }

  const sequence: number[] = [];
  let current = 0;
  let next = 1;

  for (let i = 0; i < n; i += 1) {
    sequence.push(current);
    [current, next] = [next, current + next];
  }

  return sequence;
};
