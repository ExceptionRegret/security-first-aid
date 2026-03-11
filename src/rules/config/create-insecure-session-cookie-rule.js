import { createFinding } from "../../domain/findings/create-finding.js";

export const createInsecureSessionCookieRule = () => ({
  id: "SFA_CONFIG_003",
  title: "Session cookie transport security disabled",
  defaultSeverity: "high",
  category: "configuration",
  appliesTo: ["json-file"],
  evaluate: (artifact) => {
    const secureValue = artifact.jsonPayload?.session?.cookie?.secure;

    if (secureValue !== false) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_CONFIG_003",
        title: "Session cookie secure flag is disabled",
        severity: "high",
        category: "configuration",
        filePath: artifact.filePath,
        summary: "Session cookie configuration disables the secure flag.",
        rationale: "Cookies without the secure flag can be exposed over non-TLS transport paths and weaken session protection.",
        evidence: "Found `session.cookie.secure` set to `false` in JSON configuration.",
        evidenceKey: "session-cookie-secure-false",
        remediation: "Set `session.cookie.secure` to true outside local development and terminate traffic over TLS."
      })
    ];
  }
});
