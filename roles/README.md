# Roles

Roles provide contextual guidance over the shared skill library.

A role may define:

- principles and priorities,
- common workflows,
- recommended skills for recurring situations,
- terminology,
- decision heuristics,
- and role-specific cautions.

Roles **do not own skills**.

A skill should normally remain under `skills/` so it can be reused by multiple roles. Role files should reference skills rather than duplicate them.

Example future structure:

```text
roles/
  product-manager/
    ROLE.md
  product-coach/
    ROLE.md
  engineering-manager/
    ROLE.md
```
