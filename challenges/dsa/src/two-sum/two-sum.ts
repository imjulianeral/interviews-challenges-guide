/**
 * Returns the indices of the two numbers in `nums` that add up to `target`,
 * in ascending order, or null when no such pair exists.
 *
 * Time: O(n) — Space: O(n)
 */
export const twoSum = (
  nums: readonly number[],
  target: number
): [number, number] | null => {
  const indexByValue = new Map<number, number>();

  for (const [i, value] of nums.entries()) {
    const complementIndex = indexByValue.get(target - value);
    if (complementIndex !== undefined) {
      return [complementIndex, i];
    }
    indexByValue.set(value, i);
  }

  return null;
};
