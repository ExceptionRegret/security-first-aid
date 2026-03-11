import { createFinding } from "../../domain/findings/create-finding.js";

const permissionsPattern = /^\s*permissions:\s*/im;

export const createWorkflowMissingPermissionsRule = () => ({
  id: "SFA_GHA_005",
  title: "Workflow omits an explicit permissions block",
  defaultSeverity: "medium",
  category: "cicd",
  appliesTo: ["workflow-file"],
  evaluate: (artifact) => {
    if (permissionsPattern.test(artifact.contents)) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_GHA_005",
        title: "Workflow omits an explicit permissions block",
        severity: "medium",
        category: "cicd",
        filePath: artifact.filePath,
        summary: "Workflow does not define explicit GitHub token permissions.",
        rationale: "Explicit permissions reduce privilege drift and make workflow intent auditable.",
        evidence: "No `permissions:` block was found in the workflow file.",
        evidenceKey: "missing-permissions",
        remediation: "Define an explicit least-privilege `permissions` block at workflow or job scope."
      })
    ];
  }
});
