# ADR-002: Local-first privacy model

## Status

Accepted

## Context

The product scans source repositories and security-relevant configuration that may contain secrets, credentials, or internal architecture detail.

Users are unlikely to adopt the tool if they cannot trust where their code and findings go.

## Decision

The core scanner will be local-first and offline-capable by default.

This means:

- no outbound telemetry in the core scan path
- no mandatory SaaS dependency
- no external transmission of scanned content
- redacted finding output by default

## Consequences

Positive:

- stronger privacy posture
- easier adoption in sensitive environments
- simpler compliance story for early users

Negative:

- fewer opportunities for centralized analytics
- more responsibility on local packaging and performance

## Follow-up

Any future optional remote capability must be separated from the core package and pass explicit review.
