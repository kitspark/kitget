# kitget

kitget is a **one-time source materialization tool** for Kitspark variants.

It takes a global upstream (`kitspark/core`) and produces a **variant-specific,
user-owned local copy**.

kitget is not a dependency manager.

---

## What kitget does

- Clones `kitspark/core` at a specific version
- Copies only the paths declared in a manifest
- Writes the result into a variant-local workspace
- Removes all upstream git history
- Exits

Once run, kitget is no longer involved.

---

## What kitget is NOT

- Not a package manager
- Not a sync tool
- Not a runtime dependency
- Not an updater

There is no automatic update path by design.

---

## Why this exists

Kitspark requires:
- Shared logic across variants
- Full source ownership by users
- No hidden coupling or surprise updates

kitget satisfies all three by **vendoring code intentionally**.

---

## Usage

Variants provide a `kit.manifest.json` file describing:
- which core version to use
- which paths to include

kitget reads the manifest and materializes `packages/core`.

---

## Design philosophy

Explicit over clever.
Ownership over convenience.
Source over abstraction.

If you want auto-updates, this tool is not for you.
