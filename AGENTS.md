# AGENTS.md

This file defines how AI coding agents and human contributors should operate in this repository.

## Mission

Build and maintain a production-grade deterministic security scanner that is:

- local-first
- auditable
- privacy-safe
- testable
- contributor-friendly

## Sources of truth

Use these files in this order when planning or implementing work:

1. [PRD.md](/C:/Users/saiga/OneDrive/Desktop/OSS/PRD.md)
2. [ARCHITECTURE.md](/C:/Users/saiga/OneDrive/Desktop/OSS/ARCHITECTURE.md)
3. [ROADMAP.md](/C:/Users/saiga/OneDrive/Desktop/OSS/ROADMAP.md)
4. [SECURITY.md](/C:/Users/saiga/OneDrive/Desktop/OSS/SECURITY.md)
5. [CONTRIBUTING.md](/C:/Users/saiga/OneDrive/Desktop/OSS/CONTRIBUTING.md)
6. [docs/sop/development-workflow.md](/C:/Users/saiga/OneDrive/Desktop/OSS/docs/sop/development-workflow.md)
7. [.memory/project-memory.md](/C:/Users/saiga/OneDrive/Desktop/OSS/.memory/project-memory.md)

If these files conflict, open an ADR or update the memory file before implementation continues.

## Operating principles

- Prefer deterministic checks over probabilistic behavior.
- Never transmit repository contents to external services by default.
- Keep security logic explainable and testable.
- Optimize for signal quality, not rule count.
- Fail safely: degraded functionality must not hide severe findings.
- Treat false negatives and false positives as product defects.

## Agent roles

Reference the detailed model in [docs/agents/operating-model.md](/C:/Users/saiga/OneDrive/Desktop/OSS/docs/agents/operating-model.md).

Default working roles:

- Planner: aligns work with PRD, roadmap, and architecture.
- Rule Engineer: implements or updates deterministic security checks.
- Platform Engineer: owns CLI, packaging, CI, and release automation.
- Security Reviewer: validates rule correctness and threat coverage.
- Documentation Steward: updates docs and project memory with every material change.

One person may perform multiple roles, but the responsibilities must still be checked explicitly.

## Mandatory workflow for any material change

1. Read the relevant source-of-truth docs.
2. Check [ROADMAP.md](/C:/Users/saiga/OneDrive/Desktop/OSS/ROADMAP.md) for milestone alignment.
3. Update plan and assumptions before major changes.
4. Implement with tests and fixtures.
5. Update documentation if behavior, interfaces, or policy changed.
6. Update [.memory/project-memory.md](/C:/Users/saiga/OneDrive/Desktop/OSS/.memory/project-memory.md) with the decision and current status.

## Quality gates

Do not mark work complete unless all applicable gates pass:

- unit tests pass
- fixtures cover the new rule or feature
- docs reflect the current behavior
- security implications are documented
- reporter output remains stable or intentionally versioned

## Rule design rules

- Each rule must have a stable ID.
- Each rule must define scope, severity, rationale, evidence shape, and remediation guidance.
- Rules must be narrow enough to test precisely.
- Rules must not rely on network access unless explicitly placed in an optional module.

## Documentation rules

- Update docs when product behavior changes, not later.
- Keep examples realistic and minimal.
- Prefer plain language over security jargon.
- Record major tradeoffs in an ADR.

## Memory rules

Every significant change must update [.memory/project-memory.md](/C:/Users/saiga/OneDrive/Desktop/OSS/.memory/project-memory.md) with:

- what changed
- why it changed
- resulting decisions
- known risks
- next actions

## Out of scope without explicit approval

- offensive security features
- exploit automation
- live target scanning
- remote code collection or telemetry by default
- AI-based remote analysis of private repository contents
