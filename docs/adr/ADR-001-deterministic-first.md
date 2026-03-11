# ADR-001: Deterministic-first scanner design

## Status

Accepted

## Context

The project is intended to help users who struggle with common repository and configuration security issues. The product must be trustworthy, explainable, and usable in CI.

AI-assisted detection would add uncertainty, privacy concerns, and unstable output semantics in the earliest stages of the project.

## Decision

The core product will use deterministic rules only.

Deterministic means:

- stable matching logic
- stable rule IDs
- repeatable output for the same input
- no model-based detection in the core engine

## Consequences

Positive:

- higher trust and testability
- easier CI adoption
- easier contributor onboarding
- clearer false positive analysis

Negative:

- narrower initial coverage
- less flexibility for fuzzy or contextual findings

## Follow-up

If optional intelligence features are considered later, they must live outside the core scanner and remain opt-in.
