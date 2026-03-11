# Roadmap

## Delivery philosophy

Build the smallest trustworthy product first, then expand breadth only after signal quality is proven.

## Phase 0 - Foundation

Status: complete

Deliverables:

- documentation baseline
- product scope and architecture
- ADRs and operating model
- contributor workflow and SOPs

Exit criteria:

- source-of-truth docs are internally consistent
- initial milestones are sequenced
- project memory is initialized

## Phase 1 - Core scanner

Status: in progress

Deliverables:

- CLI skeleton
- scan orchestrator
- file discovery engine
- parser contracts
- finding schema
- terminal and JSON reporters

Exit criteria:

- scan command works on fixture repositories
- output schema is versioned
- tests cover error paths and baseline behavior

Current progress:

- local CLI implemented
- orchestrator implemented
- file discovery implemented
- JSON, Markdown, terminal, and SARIF reporters implemented
- baseline suppression implemented
- baseline generation command implemented
- repository policy config implemented
- rules catalog command implemented
- scan output file writing implemented
- dangerous workflow trigger detection implemented
- dangerous workflow pipe-to-shell detection implemented
- workflow missing-permissions detection implemented
- wildcard CORS detection implemented
- wildcard CORS with credentials detection implemented
- insecure session cookie detection implemented
- Docker floating-tag detection implemented
- Docker ADD-instruction detection implemented
- committed `.env` file detection implemented
- 15 deterministic production-grade rules implemented
- fixture-backed tests implemented

## Phase 2 - High-signal rule pack

Deliverables:

- 15 deterministic rules
- fixture repositories for each rule family
- baseline support
- Markdown reporter

Exit criteria:

- rule false positive review completed
- all rules have stable IDs and documentation
- contributor can add a new rule via documented SOP

## Phase 3 - CI and platform hardening

Deliverables:

- GitHub Action wrapper
- SARIF reporter
- severity threshold and policy config
- release automation

Exit criteria:

- CI mode is deterministic
- release procedure is rehearsed
- rollback procedure documented

## Phase 4 - Production-grade maturity

Deliverables:

- performance tuning
- monorepo support hardening
- compatibility matrix
- contributor templates
- security disclosure workflow validation

Exit criteria:

- performance targets met
- issue triage and support SOP active
- governance docs stable

## Phase 5 - Ecosystem growth

Deliverables:

- optional additional rule packs
- optional remote enrichment modules outside core
- documentation site
- community contribution workflow

Exit criteria:

- extension interfaces stable
- maintenance cost remains controlled

## Milestone priorities

P0:

- deterministic core
- high-signal rules
- local-first behavior
- docs and governance

P1:

- GitHub Action
- SARIF
- richer policy model

P2:

- optional plugin system
- additional ecosystems and framework packs

## Deferred items

- live runtime scanning
- cloud dashboard
- AI summarization
- auto-remediation for high-severity findings
