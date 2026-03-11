# SOP: Development Workflow

## Objective

Ensure all implementation work is planned, tested, documented, and safe to ship.

## Applies to

- core engine changes
- parser changes
- rule additions or updates
- reporter changes
- release automation changes

## Procedure

### 1. Intake

- confirm the change maps to the PRD or roadmap
- identify affected modules
- identify security implications

### 2. Design

- check whether an ADR is required
- write or update acceptance criteria
- define fixtures and test expectations first

### 3. Implementation

- keep module boundaries intact
- avoid hidden side effects
- do not execute repository code

### 4. Validation

- run unit tests
- run fixture tests
- verify reporter output
- verify docs remain accurate

### 5. Documentation

- update README if user-facing behavior changed
- update architecture if interfaces changed
- update project memory with decisions and next actions

### 6. Review gate

Do not close the change until:

- behavior is tested
- security implications are reviewed
- docs are updated

## Required artifacts

- updated code or docs
- tests or fixtures
- review notes on severity or policy if relevant
