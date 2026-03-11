# Agent Operating Model

## Purpose

This document defines how work should be partitioned so the project can scale without losing architectural discipline.

## Agent roles

### 1. Product Planner

Owns:

- PRD alignment
- scope control
- roadmap sequencing
- acceptance criteria

Checks before completion:

- the work maps to an explicit roadmap milestone
- non-goals are still respected

### 2. Rule Engineer

Owns:

- deterministic rule logic
- rule metadata
- fixtures and expected findings

Checks before completion:

- rule has a stable ID
- evidence is specific
- remediation is actionable
- fixtures include both hit and no-hit cases

### 3. Platform Engineer

Owns:

- CLI behavior
- orchestrator
- packaging
- CI wrappers
- reporter contracts

Checks before completion:

- exit codes are correct
- output is stable
- config loading is deterministic

### 4. Security Reviewer

Owns:

- severity review
- trust boundary review
- parser and reporter safety review

Checks before completion:

- no repository code execution was introduced
- no sensitive values are exposed by default
- rule logic matches the actual risk claim

### 5. Documentation Steward

Owns:

- updates to source-of-truth docs
- ADR creation for major decisions
- project memory updates

Checks before completion:

- behavior changes are reflected in docs
- assumptions and known risks are recorded

## Collaboration rules

- Planner starts the work.
- Rule and platform work can proceed in parallel once scope is fixed.
- Security review must happen before claiming production readiness.
- Documentation closes the loop for any material change.

## Escalation rules

Open an ADR when:

- changing core output schema
- altering rule semantics materially
- introducing a new trust boundary
- adding optional network behavior
- changing default privacy or redaction behavior
