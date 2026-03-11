import { createFinding } from "../../domain/findings/create-finding.js";

export const createCommittedEnvFileRule = () => ({
  id: "SFA_ENV_001",
  title: "Repository contains a live environment file",
  defaultSeverity: "medium",
  category: "secrets",
  appliesTo: ["env-file"],
  evaluate: (artifact) => {
    if (artifact.filePath !== ".env") {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_ENV_001",
        title: "Repository contains a live environment file",
        severity: "medium",
        category: "secrets",
        filePath: artifact.filePath,
        summary: "Repository contains a `.env` file rather than only a template or example.",
        rationale: "Live environment files are frequently committed by mistake and often accumulate secrets over time.",
        evidence: "Found a `.env` file in the scanned repository.",
        evidenceKey: ".env-present",
        remediation: "Keep only `.env.example` in version control and load live environment values from local or managed secret storage."
      })
    ];
  }
});
