# Contributing

## Contribution goals

Contributions should improve one or more of the following:

- finding quality
- parser correctness
- reporter stability
- developer experience
- documentation clarity
- operational maturity

## Before you start

Read:

1. [AGENTS.md](/C:/Users/saiga/OneDrive/Desktop/OSS/AGENTS.md)
2. [PRD.md](/C:/Users/saiga/OneDrive/Desktop/OSS/PRD.md)
3. [ARCHITECTURE.md](/C:/Users/saiga/OneDrive/Desktop/OSS/ARCHITECTURE.md)
4. [docs/sop/development-workflow.md](/C:/Users/saiga/OneDrive/Desktop/OSS/docs/sop/development-workflow.md)
5. [docs/sop/rule-authoring.md](/C:/Users/saiga/OneDrive/Desktop/OSS/docs/sop/rule-authoring.md) if you are adding or changing rules

## Change categories

- documentation
- parser
- rule
- reporter
- CLI or platform
- policy and baseline

## Pull request expectations

Every non-trivial contribution should include:

- problem statement
- scope of change
- tests or fixtures
- docs updates if behavior changed
- explicit note of any security implications

## Definition of done

- code and docs align
- tests pass
- new behavior is covered by fixtures
- project memory updated for material changes

## Rule contribution minimum bar

- stable rule ID
- deterministic behavior
- rationale and remediation text
- positive and negative fixtures
- false positive analysis in the PR description

## Documentation contribution minimum bar

- update linked source-of-truth docs if behavior changes
- avoid aspirational claims that are not implemented
- prefer plain language and examples

## Commit and review guidance

- keep changes narrow and reviewable
- separate mechanical refactors from behavioral changes
- document any assumptions that affect severity or policy
