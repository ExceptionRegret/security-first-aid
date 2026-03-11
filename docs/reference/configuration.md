# Configuration Reference

Security First Aid looks for a repository policy file named `.sfa.json` in the scan target root unless `--config` is provided.

## Supported fields

```json
{
  "enabledRules": ["SFA_SECRET_001", "SFA_GHA_003"],
  "disabledRules": ["SFA_SECRET_001"],
  "severityThreshold": "high",
  "baselinePath": "./.sfa-baseline.json"
}
```

## Field details

### `enabledRules`

Type: `string[]`

If provided, only the listed rules are allowed to run before `disabledRules` are applied.

### `disabledRules`

Type: `string[]`

Disables specific rule IDs during scan execution.

### `severityThreshold`

Type: `low | medium | high | critical`

Defines the default CLI exit threshold when `--severity-threshold` is not supplied explicitly.

### `baselinePath`

Type: `string`

Points to the baseline file to apply during scanning. Relative paths are resolved from the directory containing `.sfa.json`.

## Precedence

1. CLI flags
2. `.sfa.json`
3. built-in defaults

## Example policy

```json
{
  "enabledRules": ["SFA_SECRET_001", "SFA_GHA_003", "SFA_DOCKER_001"],
  "disabledRules": ["SFA_CONFIG_001"],
  "severityThreshold": "critical",
  "baselinePath": "./.sfa-baseline.json"
}
```
