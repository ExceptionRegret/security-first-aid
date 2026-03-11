import { createFinding } from "../../domain/findings/create-finding.js";

const pipeToShellPattern = /^\s*-\s*run:\s*(curl|wget)\b.*\|\s*(bash|sh)\b/im;

export const createWorkflowPipeToShellRule = () => ({
  id: "SFA_GHA_004",
  title: "Workflow pipes remote script content to a shell",
  defaultSeverity: "high",
  category: "cicd",
  appliesTo: ["workflow-file"],
  evaluate: (artifact) => {
    const match = artifact.contents.match(pipeToShellPattern);

    if (!match) {
      return [];
    }

    const [, downloader, shell] = match;

    return [
      createFinding({
        ruleId: "SFA_GHA_004",
        title: "Workflow pipes downloaded content directly to a shell",
        severity: "high",
        category: "cicd",
        filePath: artifact.filePath,
        summary: `Workflow uses ${downloader} piped to ${shell}.`,
        rationale: "Piping remote content directly to a shell weakens reviewability and increases supply-chain risk.",
        evidence: `Found a workflow step that executes \`${downloader} ... | ${shell}\`.`,
        evidenceKey: `${downloader}-pipe-${shell}`,
        remediation: "Download scripts explicitly, verify integrity or source, and execute only reviewed, pinned content."
      })
    ];
  }
});
