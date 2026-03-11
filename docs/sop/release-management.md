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

### 4a. Automated release path

For standard package releases, the repository now uses a tag-driven GitHub Actions workflow:

- update `package.json` version
- add the matching version entry to `CHANGELOG.md`
- ensure `[Unreleased]` remains at the top of the changelog
- push a tag in the form `vX.Y.Z`

The `Release` workflow then:

- validates that the tag version matches `package.json`
- validates that `CHANGELOG.md` contains a release entry for that version
- runs the release verification suite
- builds a tarball and SHA-256 checksum
- publishes the package to npm
- creates a GitHub release using the matching changelog section as release notes

Required repository secret:

- `NPM_TOKEN` with permission to publish `security-first-aid`
- if npm account policy requires 2FA for publish, use a token that can satisfy that policy, such as a granular token with publish capability and bypass enabled where appropriate

### 5. Post-release verification

- run smoke checks
- validate install path if package distribution exists
- record release in project memory

## Rollback triggers

- broken scan output schema
- critical false positives on common repositories
- missing or corrupted release artifacts
- privacy or security regression

## Manual fallback

If the automated workflow is unavailable:

1. run `npm run release:check`
2. run `npm pack`
3. publish with `npm publish --access public`
4. create a GitHub release using the matching `CHANGELOG.md` section
5. verify `npx security-first-aid@latest rules list --format json`
