# Product Requirements Document

## Product name

Security First Aid

## Product summary

Security First Aid is an open-source deterministic scanner for repositories and delivery configuration. It helps maintainers identify high-signal security problems quickly and remediate them with clear, actionable guidance.

## Problem statement

Small engineering teams, solo developers, and open-source maintainers consistently struggle with the same security problems:

- secrets end up in repositories
- CI/CD workflows are over-permissioned
- Docker and deployment configuration ship insecure defaults
- application security headers, CORS, and session settings are misconfigured
- existing security tools produce too much noise, too little remediation guidance, or require expertise the user does not have

The result is a predictable gap between "we know security matters" and "we know exactly what to fix next."

## Target users

Primary users:

- open-source maintainers
- indie hackers and solo developers
- startup engineering teams with limited security support
- platform teams that want a simple repo-level security gate

Secondary users:

- security-conscious reviewers
- developer tooling contributors
- educators teaching secure defaults

## User jobs to be done

- "Scan my repo and show me the most dangerous mistakes."
- "Explain why this is risky in plain English."
- "Give me a specific fix I can apply."
- "Run this in CI and fail only when it matters."
- "Suppress known issues without hiding new ones."

## Product goals

- Deliver a trusted local scanner with clear evidence and remediation.
- Minimize false positives on the initial rule set.
- Make the first run useful in under five minutes.
- Support automation in CI without making local usage harder.
- Build an extensible architecture so new rule packs can be added safely.

## Non-goals

- Endpoint detection and response
- Runtime exploitation
- Network penetration testing
- AI-generated findings or explanations
- Full compliance certification

## Success metrics

Initial product success metrics:

- Median scan time under 15 seconds for small and medium repositories
- At least 80 percent of beta users report the top three findings were actionable
- False positive rate below 10 percent for the initial rule pack
- Contributor can add a new rule with tests in under one day
- CI mode produces deterministic output across environments

## Core functional requirements

### Repository scanning

- Scan a target path recursively with configurable include and exclude rules
- Detect high-value security-relevant files automatically
- Support monorepo layouts

### Parsing and normalization

- Parse JSON, YAML, dotenv, text manifests, lockfiles, and Dockerfiles
- Normalize findings into a stable internal format

### Rule engine

- Run independent deterministic rules on matched artifacts
- Assign severity and confidence
- Emit machine-readable evidence

### Findings and reporting

- Show findings in terminal output with concise remediation steps
- Export JSON, Markdown, and SARIF
- Produce a summary with counts by severity and category

### Baselines and policy

- Allow accepted findings to be baselined by stable fingerprint
- Support severity thresholds for CI failure
- Support repository-level policy configuration

### Extensibility

- Make rule packs modular
- Keep public interfaces stable and documented
- Allow future optional network-backed modules without changing the deterministic core

## Non-functional requirements

### Security and privacy

- Local-first scanning by default
- No outbound telemetry in core scanning path
- No storage of scanned repository content unless user explicitly exports a report
- Sensitive evidence must be redacted in default output

### Reliability

- Scanner must continue across parse failures and report partial completion safely
- Rules must fail closed with explicit error states, not silent skips

### Performance

- Efficient file selection and parser dispatch
- Avoid scanning irrelevant directories by default
- Cache expensive normalization steps where safe

### Maintainability

- Clear module boundaries
- Stable contracts for findings and reporters
- High test coverage for rules and parsing edge cases

## Initial rule families

- Secrets and credential exposure
- GitHub Actions permissions and trigger misuse
- Docker privilege and image hygiene basics
- Insecure server and API defaults
- Development mode leakage into production
- Session, cookies, CORS, and basic header issues

## Release criteria for v1

- CLI scan command implemented
- Deterministic rule engine in place
- Minimum 15 production-grade rules
- JSON and Markdown reporters available
- Baseline file supported
- GitHub Action integration documented
- Security disclosure policy documented
- Test fixtures and contributor rule authoring guide published

Current implementation note:

- The repository now satisfies the 15-rule minimum for the current deterministic core.

## Risks

- False positives eroding trust
- Under-scoping parser coverage for real repositories
- Rule semantics drifting over time without strict versioning
- Contributors adding noisy or overlapping checks

## Open decisions

- Final package naming
- Exact minimum support matrix for Node.js and operating systems
