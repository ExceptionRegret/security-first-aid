# Security Policy

## Security posture

Security First Aid is a security product. That means the project must hold itself to stricter standards than ordinary developer tooling.

## Core product security commitments

- local-first behavior by default
- no outbound telemetry in the core scanner path
- no execution of scanned repository code
- deterministic rule evaluation
- redacted output for sensitive evidence by default

## Supported threat assumptions

The scanner is designed to inspect repositories that may contain malformed or adversarial content. It is not designed to safely execute arbitrary project build scripts as part of scanning.

## Secure development requirements

- all security-relevant changes require tests
- parser and reporter failures must be explicitly handled
- dependencies should be kept minimal in core packages
- all new parsers must document trust boundaries and failure behavior

## Vulnerability disclosure

Until a dedicated disclosure channel is set up, do not publish exploit details in public issues for critical product flaws.

Temporary disclosure process:

1. Open a private communication channel if available.
2. If no private channel exists yet, create a minimal public issue without exploit details and request a secure contact path.
3. Record the issue in the project memory once triaged.

## Security review checklist

Before merging any security-relevant change, verify:

- no repository code is executed
- no sensitive values are logged in cleartext by default
- rule output is deterministic
- failure modes are explicit
- docs were updated if policy or exposure changed

## Sensitive data handling

- findings should prefer locations and patterns over raw secret values
- exported reports should redact values unless a user explicitly requests unsafe debug output
- fixtures must use fake or invalid secrets only

## Planned future additions

- dedicated disclosure email or form
- supported versions matrix
- signed releases
- provenance and checksum publication
