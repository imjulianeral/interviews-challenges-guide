const CLOSING_TO_OPENING: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
};

const OPENING = new Set(Object.values(CLOSING_TO_OPENING));

/**
 * Returns true when every bracket in `input` is closed by the matching
 * bracket type in the correct order. Non-bracket characters are ignored.
 *
 * Time: O(n) — Space: O(n)
 */
export const isBalanced = (input: string): boolean => {
  const stack: string[] = [];

  for (const char of input) {
    if (OPENING.has(char)) {
      stack.push(char);
      continue;
    }

    const expected = CLOSING_TO_OPENING[char];
    if (expected !== undefined && stack.pop() !== expected) {
      return false;
    }
  }

  return stack.length === 0;
};

// [{}]
