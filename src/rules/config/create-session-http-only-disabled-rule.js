import { createFinding } from "../../domain/findings/create-finding.js";

export const createSessionHttpOnlyDisabledRule = () => ({
  id: "SFA_CONFIG_004",
  title: "Session cookie httpOnly protection disabled",
  defaultSeverity: "medium",
  category: "configuration",
  appliesTo: ["json-file"],
  evaluate: (artifact) => {
    const httpOnlyValue = artifact.jsonPayload?.session?.cookie?.httpOnly;

    if (httpOnlyValue !== false) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_CONFIG_004",
        title: "Session cookie httpOnly flag is disabled",
        severity: "medium",
        category: "configuration",
        filePath: artifact.filePath,
        summary: "Session cookie configuration disables the httpOnly flag.",
        rationale: "Cookies without httpOnly are more exposed to theft through client-side script execution.",
        evidence: "Found `session.cookie.httpOnly` set to `false` in JSON configuration.",
        evidenceKey: "session-cookie-httpOnly-false",
        remediation: "Set `session.cookie.httpOnly` to true unless there is a narrowly justified browser-side requirement."
      })
    ];
  }
});
