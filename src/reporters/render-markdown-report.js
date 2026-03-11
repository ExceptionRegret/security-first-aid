const renderFinding = (finding) => `### [${finding.severity.toUpperCase()}] ${finding.ruleId} - ${finding.title}

- File: \`${finding.filePath}\`
- Summary: ${finding.summary}
- Rationale: ${finding.rationale}
- Evidence: ${finding.evidence}
- Remediation: ${finding.remediation}
`;

export const renderMarkdownReport = (result) => {
  const summaryLines = [
    `- Total findings: ${result.summary.totalFindings}`,
    `- High: ${result.summary.bySeverity.high}`,
    `- Medium: ${result.summary.bySeverity.medium}`,
    `- Low: ${result.summary.bySeverity.low}`
  ];

  const findingSection = result.findings.length === 0
    ? "No findings detected."
    : result.findings.map(renderFinding).join("\n");

  return `# Security First Aid Report

Generated at: ${result.generatedAt}
Target path: \`${result.targetPath}\`

## Summary

${summaryLines.join("\n")}

## Findings

${findingSection}`.trim();
};
