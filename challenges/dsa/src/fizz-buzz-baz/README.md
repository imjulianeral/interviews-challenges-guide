# FizzBuzzBaz

Given a non-negative integer `n`, return the sequence for the numbers `1` to `n` where each number is replaced as follows:

- Multiples of 3 become `"Fizz"`.
- Multiples of 5 become `"Buzz"`.
- Multiples of 7 become `"Baz"`.
- Multiples of more than one of them combine the words in that order, e.g. `"FizzBuzz"`, `"FizzBaz"`, `"BuzzBaz"`, `"FizzBuzzBaz"`.
- Every other number is kept as a decimal string.

## Examples

| Number | Output          |
| ------ | --------------- |
| `1`    | `"1"`           |
| `3`    | `"Fizz"`        |
| `5`    | `"Buzz"`        |
| `7`    | `"Baz"`         |
| `15`   | `"FizzBuzz"`    |
| `21`   | `"FizzBaz"`     |
| `35`   | `"BuzzBaz"`     |
| `105`  | `"FizzBuzzBaz"` |

`fizzBuzzBaz(7)` returns `["1", "2", "Fizz", "4", "Buzz", "Fizz", "Baz"]`.

## Signature

```ts
function fizzBuzzBaz(n: number): string[];
```

Throws a `RangeError` when `n` is negative or not an integer.

## Approach

Classic FizzBuzz is often written as an `if`/`else` chain that checks the combined case first. A third word turns that into eight branches, which is the point of the variant: the chain does not scale.

Instead, keep a plain object that maps each divisor to its word. For each number, append the word of every divisor that divides it; if nothing was appended, emit the number itself. Adding a fourth word is then a one-line change.

Object keys that look like integers are iterated in ascending numeric order, so the words always combine as Fizz, Buzz, Baz. The keys come back as strings, hence the `Number(divisor)` conversion.

- Time: `O(n)` (the number of divisors is constant)
- Space: `O(n)` for the output

## Follow-ups

- Make the object a parameter so callers can supply their own divisors and words.
- Return a lazy generator instead of an array for very large `n`.
- Solve it without the modulo operator. (Keep one countdown counter per divisor.)
