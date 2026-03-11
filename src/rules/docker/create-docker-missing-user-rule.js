import { createFinding } from "../../domain/findings/create-finding.js";

const userDirectivePattern = /^\s*USER\s+(.+)\s*$/im;

export const createDockerMissingUserRule = () => ({
  id: "SFA_DOCKER_001",
  title: "Dockerfile does not set a non-root user",
  defaultSeverity: "medium",
  category: "container",
  appliesTo: ["dockerfile"],
  evaluate: (artifact) => {
    const match = artifact.contents.match(userDirectivePattern);

    if (!match) {
      return [
        createFinding({
          ruleId: "SFA_DOCKER_001",
          title: "Dockerfile does not set a non-root user",
          severity: "medium",
          category: "container",
          filePath: artifact.filePath,
          summary: "Container image does not declare a non-root runtime user.",
          rationale: "Running as root increases impact if the container is compromised.",
          evidence: "No USER directive was found in the Dockerfile.",
          evidenceKey: "missing-user",
          remediation: "Create a dedicated runtime user and switch to it with a USER directive."
        })
      ];
    }

    if (match[1].trim().toLowerCase() !== "root") {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_DOCKER_001",
        title: "Dockerfile runs as root",
        severity: "medium",
        category: "container",
        filePath: artifact.filePath,
        summary: "Container image explicitly runs as root.",
        rationale: "Running containers as root increases the blast radius of application compromise.",
        evidence: "Found `USER root` in the Dockerfile.",
        evidenceKey: "user-root",
        remediation: "Create a dedicated non-root runtime user and switch to it before the final CMD or ENTRYPOINT."
      })
    ];
  }
});
