# Balanced Strings

Given a string containing the brackets `()`, `[]` and `{}`, decide whether it is **balanced**.

A string is balanced when:

1. Every opening bracket is closed by a bracket of the same type.
2. Brackets are closed in the correct order.
3. Every closing bracket has a matching opening bracket before it.

Characters that are not brackets are ignored.

## Examples

| Input      | Output  |
| ---------- | ------- |
| `"()"`     | `true`  |
| `"()[]{}"` | `true`  |
| `"{[()]}"` | `true`  |
| `"(]"`     | `false` |
| `"([)]"`   | `false` |
| `"(()"`    | `false` |
| `""`       | `true`  |

## Signature

```ts
function isBalanced(input: string): boolean;
```

## Approach

Walk the string once, keeping a stack of the opening brackets seen so far. On a closing bracket, the top of the stack must be its matching opener; otherwise the string is unbalanced. At the end the stack must be empty.

- Time: `O(n)`
- Space: `O(n)` for the stack in the worst case (all openers)

## Follow-ups

- What changes if there is only one bracket type? (A counter replaces the stack, `O(1)` space.)
- Return the index of the first offending character instead of a boolean.
- Return the minimum number of insertions needed to make the string balanced.
