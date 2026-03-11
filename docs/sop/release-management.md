# SOP: Release Management

## Objective

Release the scanner safely with repeatable versioning, verification, and rollback readiness.

## Release types

- patch: fixes or low-risk improvements
- minor: new backward-compatible rules or features
- major: breaking changes to CLI behavior, output schema, or policy semantics

## Procedure

### 1. Prepare release candidate

- confirm roadmap milestone or scoped release goal
- verify changelog inputs
- confirm docs reflect current behavior

### 2. Validate release candidate

- run full test suite
- run fixture suite
- verify reporter outputs
- review dependency changes

### 3. Security verification

- confirm no new outbound behavior was introduced unintentionally
- confirm sensitive output remains redacted by default
- confirm failure modes are explicit

### 4. Publish

- tag version
- publish release artifacts
- publish checksums and release notes when available

### 5. Post-release verification

- run smoke checks
- validate install path if package distribution exists
- record release in project memory

## Rollback triggers

- broken scan output schema
- critical false positives on common repositories
- missing or corrupted release artifacts
- privacy or security regression
