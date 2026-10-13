# Fibonacci Sequence

Given a non-negative integer `n`, return the first `n` terms of the Fibonacci sequence.

The sequence starts with `0` and `1`, and every later term is the sum of the two before it:

```
F(0) = 0
F(1) = 1
F(k) = F(k - 1) + F(k - 2)
```

## Examples

| `n`  | Output                              |
| ---- | ----------------------------------- |
| `0`  | `[]`                                |
| `1`  | `[0]`                               |
| `2`  | `[0, 1]`                            |
| `10` | `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]` |

## Signature

```ts
function fibonacci(n: number): number[];
```

Throws a `RangeError` when `n` is negative, not an integer, or greater than 79. `F(78)` is the largest Fibonacci number a JavaScript `number` can hold exactly, so longer sequences would silently contain wrong values.

## Approach

The naive recursive definition recomputes the same terms over and over and takes exponential time. Since each term only depends on the previous two, keep just those two values and step forward `n` times, pushing each term as you go.

- Time: `O(n)`
- Space: `O(n)` for the output, `O(1)` beyond it

## Follow-ups

- Return only the `n`-th term in `O(1)` space.
- Support arbitrarily long sequences. (Use `bigint`.)
- Make the recursive version fast. (Memoization.)
- Compute the `n`-th term in `O(log n)`. (Matrix exponentiation or fast doubling.)
