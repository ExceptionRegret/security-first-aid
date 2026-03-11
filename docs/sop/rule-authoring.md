# SOP: Rule Authoring

## Objective

Provide a consistent process for adding deterministic, high-signal security rules.

## Rule standard

Every rule must define:

- rule ID
- title
- category
- default severity
- scope
- rationale
- remediation guidance
- references if appropriate

## Procedure

### 1. Define the problem precisely

- describe the insecure pattern
- identify the artifact types the rule applies to
- state what the rule will not cover

### 2. Model the evidence

- determine the minimum evidence required to trigger
- ensure evidence can be collected without exposing secrets

### 3. Define severity

Choose severity based on:

- exploitability
- blast radius
- prevalence
- remediation urgency

### 4. Build fixtures before or with the rule

Required fixture types:

- positive fixture that should trigger
- negative fixture that should not trigger
- edge case fixture if ambiguity is likely

### 5. Write remediation text

Remediation must answer:

- what to change
- why the new state is safer
- any cautions about breaking behavior

### 6. Review false positive risk

Ask:

- can the same pattern be benign?
- do we need narrower matching logic?
- do we need a lower default severity or confidence?

## Rejection criteria

Do not merge a rule that:

- is too broad to test cleanly
- duplicates another rule without clear value
- cannot explain why the finding matters
- produces unredacted sensitive values by default
