# Project Memory

## Project

Security First Aid

## Purpose

Build an open-source deterministic security scanner that helps repository owners identify common, high-impact security mistakes in code and configuration without sending code to external services.

## Current state

- Repository now includes a working implementation and the supporting production documentation baseline.
- Core scanner code exists under `src/`.
- CI verification workflow and a reusable GitHub Action wrapper now exist under `.github/`.
- Repository policy config and baseline generation are implemented.
- README now documents install paths for source use, global linking, npm tarball installation, and post-publish npm/npx usage.
- Package metadata now includes homepage, repository, and bugs URLs for the intended GitHub repository `ExceptionRegret/security-first-aid`.
- npm manifest normalization now uses a valid `bin` path and passes `npm publish --dry-run`.
- The public GitHub repository now exists at `https://github.com/ExceptionRegret/security-first-aid`.
- The initial `main` branch commit has been pushed to GitHub.
- The package is now published to npm as `security-first-aid@0.1.2`.
- Public execution through `npx security-first-aid@latest ...` has been verified, including the no-argument quick-start guide.
- Global npm installs now print a post-install quick-start guide.
- README now includes a renamed example screenshot asset under `docs/assets/` plus an example output section for GitHub and npm users.
- Fixture `.env` files under `tests/fixtures/` are now intentionally unignored so CI and local scans exercise the same secret/env rules.
- Release hardening now includes a Keep a Changelog file, release validation scripts, and a tag-driven GitHub Actions release workflow.
- CLI no-argument and help-flag behavior now shows a real quick-start guide for npm and npx users.
- Additional implemented rules now cover `pull_request_target` workflows and wildcard CORS in JSON config.
- The CLI now supports `rules list` and `scan --output`.
- Additional implemented rules now cover pipe-to-shell workflow steps, floating Docker tags, and insecure session cookie flags.
- The initial v1 target of 15 deterministic rules is now satisfied.
- Additional implemented rules now cover committed `.env` files, missing workflow permissions, Docker `ADD`, and wildcard CORS with credentials.
- Product direction remains deterministic-first and local-first.

## Core decisions

1. The product will not use AI in the core scanning engine.
2. The scanner will operate locally by default and avoid outbound telemetry.
3. The first production milestone is a CLI plus rule engine, not a web dashboard.
4. Output must be actionable and beginner-friendly, but evidence-driven.
5. Documentation is part of the production baseline, not an afterthought.
6. The repository now uses the MIT license for open-source distribution.

## Target users

- open-source maintainers
- solo developers
- startup teams without dedicated security staff

## Initial scope

- repository scanning
- deterministic rules
- high-signal findings
- local CLI
- CI integration after the core engine

## Known risks

- rule noise could damage trust early
- naming and packaging decisions are still open
- the unscoped npm package name may already be taken, which would force a scoped publish path
- implementation may drift unless docs remain the source of truth

## Next milestones

1. Expand parser coverage while preserving deterministic behavior.
2. Add configuration file support for repository policy.
3. Add more high-signal rules and richer fixture coverage.
4. Implement a GitHub Action wrapper and release automation.
5. Add signed release and disclosure hardening.

## Files to consult first

- [README.md](/C:/Users/saiga/OneDrive/Desktop/OSS/README.md)
- [PRD.md](/C:/Users/saiga/OneDrive/Desktop/OSS/PRD.md)
- [ARCHITECTURE.md](/C:/Users/saiga/OneDrive/Desktop/OSS/ARCHITECTURE.md)
- [ROADMAP.md](/C:/Users/saiga/OneDrive/Desktop/OSS/ROADMAP.md)
- [AGENTS.md](/C:/Users/saiga/OneDrive/Desktop/OSS/AGENTS.md)

## Update rule

Whenever a material change lands, update this file with:

- what changed
- why it changed
- what remains risky or unresolved
