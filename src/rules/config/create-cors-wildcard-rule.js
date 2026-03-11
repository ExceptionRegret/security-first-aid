import { createFinding } from "../../domain/findings/create-finding.js";

export const createCorsWildcardRule = () => ({
  id: "SFA_CONFIG_002",
  title: "Configuration allows wildcard CORS",
  defaultSeverity: "medium",
  category: "configuration",
  appliesTo: ["json-file"],
  evaluate: (artifact) => {
    const corsConfig = artifact.jsonPayload?.cors;

    if (!corsConfig || corsConfig.origin !== "*") {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_CONFIG_002",
        title: "Configuration allows wildcard CORS",
        severity: "medium",
        category: "configuration",
        filePath: artifact.filePath,
        summary: "Configuration allows requests from any origin with a wildcard CORS setting.",
        rationale: "Wildcard origins broaden browser access and can expose APIs or sessions when combined with other weak controls.",
        evidence: "Found `cors.origin` set to `*` in JSON configuration.",
        evidenceKey: "cors-origin-*",
        remediation: "Restrict CORS origins to the exact trusted domains that need browser access."
      })
    ];
  }
});
