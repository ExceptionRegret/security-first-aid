import { createFinding } from "../../domain/findings/create-finding.js";

export const createCorsWildcardCredentialsRule = () => ({
  id: "SFA_CONFIG_005",
  title: "Wildcard CORS is combined with credentials",
  defaultSeverity: "high",
  category: "configuration",
  appliesTo: ["json-file"],
  evaluate: (artifact) => {
    const corsConfig = artifact.jsonPayload?.cors;

    if (!corsConfig || corsConfig.origin !== "*" || corsConfig.credentials !== true) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_CONFIG_005",
        title: "Wildcard CORS is combined with credentials",
        severity: "high",
        category: "configuration",
        filePath: artifact.filePath,
        summary: "Configuration combines wildcard CORS origins with credentialed requests.",
        rationale: "Credentialed browser requests paired with overly broad origin policy weaken cross-origin protection assumptions.",
        evidence: "Found `cors.origin` set to `*` and `cors.credentials` set to `true` in JSON configuration.",
        evidenceKey: "cors-wildcard-credentials",
        remediation: "Restrict CORS origins to trusted domains and only enable credentials when strictly required."
      })
    ];
  }
});
