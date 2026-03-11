import { createFinding } from "../../domain/findings/create-finding.js";

const permissionsWriteAllPattern = /^\s*permissions:\s*write-all\s*$/im;

export const createWorkflowWriteAllRule = () => ({
  id: "SFA_GHA_001",
  title: "Workflow uses write-all permissions",
  defaultSeverity: "high",
  category: "cicd",
  appliesTo: ["workflow-file"],
  evaluate: (artifact) => {
    if (!permissionsWriteAllPattern.test(artifact.contents)) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_GHA_001",
        title: "Workflow uses write-all permissions",
        severity: "high",
        category: "cicd",
        filePath: artifact.filePath,
        summary: "GitHub Actions workflow grants write-all permissions.",
        rationale: "Over-permissioned workflows increase blast radius if a workflow or action is compromised.",
        evidence: "Found `permissions: write-all` in the workflow definition.",
        evidenceKey: "permissions:write-all",
        remediation: "Replace write-all with the minimum explicit permissions required by each job."
      })
    ];
  }
});
