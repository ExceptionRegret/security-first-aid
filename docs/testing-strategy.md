# Testing Strategy

## Objective

Ensure the scanner is trustworthy by testing rule behavior, parser correctness, output stability, and failure handling.

## Test layers

### 1. Unit tests

Focus:

- utility-free domain logic
- parser behavior on normal and malformed inputs
- rule trigger and no-trigger behavior
- finding fingerprint stability

### 2. Fixture tests

Focus:

- realistic repository samples
- expected findings for known insecure patterns
- regression protection against false positives

### 3. Reporter tests

Focus:

- terminal rendering stability
- JSON contract stability
- Markdown and SARIF schema validation
- redaction behavior

### 4. Integration tests

Focus:

- end-to-end scan orchestration
- policy loading
- baseline suppression
- exit code behavior

## Required coverage for each new rule

- positive fixture
- negative fixture
- severity assertion
- remediation assertion
- fingerprint assertion if applicable

## Failure-handling tests

The suite must cover:

- malformed YAML
- malformed JSON
- unreadable files
- unsupported file types
- rule execution failures
- partial scan completion reporting

## Performance checks

At least one recurring benchmark should measure:

- file discovery time
- parser throughput
- scan duration on representative fixture repos

## Release blocking criteria

- broken JSON schema output
- unstable rule IDs
- missing redaction in default output
- unexplained fixture regressions
