import { createFinding } from "../../domain/findings/create-finding.js";

const pullRequestTargetPattern = /^\s*pull_request_target:\s*$/im;

export const createWorkflowPullRequestTargetRule = () => ({
  id: "SFA_GHA_003",
  title: "Workflow uses pull_request_target",
  defaultSeverity: "high",
  category: "cicd",
  appliesTo: ["workflow-file"],
  evaluate: (artifact) => {
    if (!pullRequestTargetPattern.test(artifact.contents)) {
      return [];
    }

    return [
      createFinding({
        ruleId: "SFA_GHA_003",
        title: "Workflow uses pull_request_target",
        severity: "high",
        category: "cicd",
        filePath: artifact.filePath,
        summary: "Workflow is triggered by pull_request_target.",
        rationale: "pull_request_target runs in the context of the base repository and can expose secrets or elevated permissions when misused.",
        evidence: "Found `pull_request_target` in the workflow trigger definition.",
        evidenceKey: "pull_request_target",
        remediation: "Use pull_request unless elevated repository context is explicitly required and the workflow is hardened for untrusted contributions."
      })
    ];
  }
});
