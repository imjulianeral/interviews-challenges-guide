# Two Sum

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.

- The same element may not be used twice.
- Indices are returned in ascending order.
- Return `null` when no pair exists.

## Examples

| `nums`           | `target` | Output   |
| ---------------- | -------- | -------- |
| `[2, 7, 11, 15]` | `9`      | `[0, 1]` |
| `[3, 2, 4]`      | `6`      | `[1, 2]` |
| `[3, 3]`         | `6`      | `[0, 1]` |
| `[1, 2, 3]`      | `7`      | `null`   |

## Signature

```ts
function twoSum(
  nums: readonly number[],
  target: number
): [number, number] | null;
```

## Approach

The brute-force answer checks every pair in `O(n²)`.

The one-pass answer keeps a map from each value seen so far to its index. For each number, look up its complement (`target - value`) in the map: if it is there, the pair is found; otherwise record the current number and move on. Looking up before inserting is what prevents an element from pairing with itself.

- Time: `O(n)`
- Space: `O(n)` for the map

## Follow-ups

- The input is sorted: solve it in `O(1)` extra space. (Two pointers.)
- Return every unique pair instead of the first one.
- Extend to three numbers (3Sum).
