import { createFinding } from "../../domain/findings/create-finding.js";

const fromPattern = /^\s*FROM\s+([^\s]+)\s*$/im;

export const createDockerFloatingTagRule = () => ({
  id: "SFA_DOCKER_002",
  title: "Dockerfile uses a floating image tag",
  defaultSeverity: "medium",
  category: "container",
  appliesTo: ["dockerfile"],
  evaluate: (artifact) => {
    const match = artifact.contents.match(fromPattern);

    if (!match) {
      return [];
    }

    const imageReference = match[1].trim();

    if (!imageReference.endsWith(":latest")) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_DOCKER_002",
        title: "Dockerfile uses a floating latest tag",
        severity: "medium",
        category: "container",
        filePath: artifact.filePath,
        summary: `Base image ${imageReference} uses the floating latest tag.`,
        rationale: "Floating tags make builds non-reproducible and can introduce unreviewed changes into the supply chain.",
        evidence: `Found \`FROM ${imageReference}\` in the Dockerfile.`,
        evidenceKey: imageReference,
        remediation: "Pin the base image to a specific version or digest so builds remain reproducible and auditable."
      })
    ];
  }
});
