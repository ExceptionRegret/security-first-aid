const renderFindingLine = (finding) => `[${finding.severity.toUpperCase()}] ${finding.ruleId} ${finding.filePath} - ${finding.summary}`;

export const renderTerminalReport = (result) => {
  const lines = [
    "Security First Aid",
    `Target: ${result.targetPath}`,
    `Findings: ${result.summary.totalFindings}`,
    `High: ${result.summary.bySeverity.high}  Medium: ${result.summary.bySeverity.medium}  Low: ${result.summary.bySeverity.low}`
  ];

  if (result.findings.length === 0) {
    lines.push("No findings detected.");
    return lines.join("\n");
  }

  lines.push("");
  lines.push(...result.findings.map(renderFindingLine));
  return lines.join("\n");
};
