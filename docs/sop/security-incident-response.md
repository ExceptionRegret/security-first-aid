# SOP: Security Incident Response

## Objective

Handle product security incidents quickly, safely, and with a clear record of what happened.

## Incident classes

- P0: product flaw that can expose sensitive data or execute untrusted input
- P1: severe false negative or false positive with wide impact
- P2: medium-severity security or integrity issue with limited blast radius

## Immediate response steps

1. Triage severity.
2. Preserve evidence and reproduction steps.
3. Limit public detail if exploitability is high.
4. Identify affected versions and components.
5. Record the incident in project memory and issue tracker.

## Containment checklist

- disable or revert affected release if necessary
- block further publication of the flawed artifact
- prepare a fix branch
- document temporary mitigation guidance

## Recovery checklist

- validate the fix with targeted tests
- confirm disclosure messaging
- publish patched release if needed
- update docs and memory file

## Post-incident review

Capture:

- root cause
- detection gap
- user impact
- remediation actions
- prevention actions
