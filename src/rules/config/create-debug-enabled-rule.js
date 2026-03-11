import { createFinding } from "../../domain/findings/create-finding.js";

export const createDebugEnabledRule = () => ({
  id: "SFA_CONFIG_001",
  title: "Debug mode enabled in JSON configuration",
  defaultSeverity: "low",
  category: "configuration",
  appliesTo: ["json-file"],
  evaluate: (artifact) => {
    if (!artifact.jsonPayload || artifact.jsonPayload.debug !== true) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_CONFIG_001",
        title: "Debug mode enabled in JSON configuration",
        severity: "low",
        category: "configuration",
        filePath: artifact.filePath,
        summary: "Configuration enables debug mode.",
        rationale: "Debug mode can expose extra diagnostics or unsafe behavior when left enabled outside development.",
        evidence: "Found `debug: true` in the JSON configuration.",
        evidenceKey: "debug-true",
        remediation: "Disable debug mode outside local development and separate development defaults from production configuration."
      })
    ];
  }
});
