import { createFinding } from "../../domain/findings/create-finding.js";

const secretPattern = /^\s*([A-Z0-9_]*(SECRET|TOKEN|PASSWORD|API_KEY)[A-Z0-9_]*)=(.+)\s*$/im;
const placeholderPattern = /(example|changeme|placeholder|your-value)/i;

export const createSecretInEnvRule = () => ({
  id: "SFA_SECRET_001",
  title: "Hardcoded secret in environment file",
  defaultSeverity: "high",
  category: "secrets",
  appliesTo: ["env-file"],
  evaluate: (artifact) => {
    const match = artifact.contents.match(secretPattern);

    if (!match) {
      return [];
    }

    const [, key, , rawValue] = match;
    const value = rawValue.trim();

    if (!value || placeholderPattern.test(value)) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_SECRET_001",
        title: "Hardcoded secret in environment file",
        severity: "high",
        category: "secrets",
        filePath: artifact.filePath,
        summary: `Environment variable ${key} appears to contain a hardcoded secret.`,
        rationale: "Secrets checked into repositories are commonly leaked and reused.",
        evidence: `Detected a non-placeholder value assigned to ${key}.`,
        evidenceKey: key,
        remediation: "Move the secret to a secure secret store and keep only a non-sensitive example value in the repository."
      })
    ];
  }
});
