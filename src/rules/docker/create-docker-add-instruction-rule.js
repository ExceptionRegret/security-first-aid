import { createFinding } from "../../domain/findings/create-finding.js";

const addDirectivePattern = /^\s*ADD\s+/im;

export const createDockerAddInstructionRule = () => ({
  id: "SFA_DOCKER_003",
  title: "Dockerfile uses ADD instead of COPY",
  defaultSeverity: "low",
  category: "container",
  appliesTo: ["dockerfile"],
  evaluate: (artifact) => {
    if (!addDirectivePattern.test(artifact.contents)) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_DOCKER_003",
        title: "Dockerfile uses ADD instead of COPY",
        severity: "low",
        category: "container",
        filePath: artifact.filePath,
        summary: "Dockerfile uses the ADD directive.",
        rationale: "ADD has broader behavior than COPY and can make Dockerfile intent less predictable.",
        evidence: "Found an `ADD` directive in the Dockerfile.",
        evidenceKey: "docker-add",
        remediation: "Prefer COPY for predictable file copies and reserve ADD for cases where its extra behavior is explicitly required."
      })
    ];
  }
});
