import { createFinding } from "../../domain/findings/create-finding.js";

const unpinnedActionPattern = /^\s*-\s*uses:\s*([^\s@]+)@(main|master|HEAD)\s*$/im;

export const createWorkflowUnpinnedActionRule = () => ({
  id: "SFA_GHA_002",
  title: "Workflow action is pinned to a moving ref",
  defaultSeverity: "medium",
  category: "cicd",
  appliesTo: ["workflow-file"],
  evaluate: (artifact) => {
    const match = artifact.contents.match(unpinnedActionPattern);

    if (!match) {
      return [];
    }

    const [, actionName, refName] = match;

    return [
      createFinding({
        ruleId: "SFA_GHA_002",
        title: "Workflow action is pinned to a moving ref",
        severity: "medium",
        category: "cicd",
        filePath: artifact.filePath,
        summary: `Action ${actionName} is pinned to ${refName} instead of an immutable release.`,
        rationale: "Mutable refs can change unexpectedly and weaken supply-chain trust.",
        evidence: `Found \`uses: ${actionName}@${refName}\`.`,
        evidenceKey: `${actionName}@${refName}`,
        remediation: "Pin the action to a stable release tag or commit SHA after validating the source."
      })
    ];
  }
});
