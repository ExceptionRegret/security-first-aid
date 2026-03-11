# SOP: Issue Triage

## Objective

Classify incoming bugs, false positives, false negatives, feature requests, and security concerns consistently.

## Categories

- bug
- false positive
- false negative
- documentation gap
- feature request
- security concern

## Triage procedure

### 1. Confirm report quality

Check that the report includes:

- affected version or branch
- reproduction steps
- sample file or config shape when safe
- expected result
- actual result

### 2. Assess severity

Use these questions:

- does the issue hide a real security risk?
- does it create an unsafe recommendation?
- does it expose sensitive data?
- does it block normal usage?

### 3. Assign ownership

- Rule Engineer for rule logic and false positives
- Platform Engineer for CLI, reporter, and policy issues
- Documentation Steward for clarity and onboarding gaps
- Security Reviewer for security concerns or severity disputes

### 4. Record decision

Capture:

- category
- priority
- owner
- next action

### 5. Update memory if material

Add an entry to [.memory/project-memory.md](/C:/Users/saiga/OneDrive/Desktop/OSS/.memory/project-memory.md) when the issue changes core direction, product assumptions, or release risk.
