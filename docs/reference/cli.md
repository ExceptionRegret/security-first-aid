# CLI Reference

# Installation

From the repository root:

```bash
npm.cmd link --cache .\.npm-cache
```

After linking, the global command is:

```bash
sfa
```

PowerShell note:

- If PowerShell prefers a blocked `sfa.ps1` shim, run `sfa.cmd ...` or `cmd /c sfa ...`.
- In this workspace, the blocked shim was removed so plain `sfa` resolves to `sfa.cmd`.

## Scan command

```bash
sfa scan <target-path> [options]
```

Options:

- `--format json|markdown|sarif|terminal`
- `--baseline <path>`
- `--config <path>`
- `--severity-threshold low|medium|high|critical`
- `--output <path>`

Behavior:

- exits `0` when no findings meet the effective severity threshold
- exits `1` when at least one finding meets or exceeds the threshold
- uses the repository policy file when present
- writes the rendered report to the requested file when `--output` is supplied

Examples:

```bash
sfa scan . --format terminal
sfa scan . --format json --severity-threshold medium
sfa scan . --format sarif --baseline ./.sfa-baseline.json
sfa scan . --format markdown --output ./reports/report.md
```

## Baseline create command

```bash
sfa baseline create <target-path> [options]
```

Options:

- `--output <path>`
- `--config <path>`

Behavior:

- scans the target repository
- ignores any existing baseline suppression
- writes a baseline JSON file containing finding fingerprints

Examples:

```bash
sfa baseline create .
sfa baseline create . --output ./.sfa-baseline.json
```

## Rules list command

```bash
sfa rules list [--format json|markdown|terminal]
```

Examples:

```bash
sfa rules list
sfa rules list --format json
```
