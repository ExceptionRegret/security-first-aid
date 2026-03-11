const createEmptySummary = () => ({
  totalFindings: 0,
  bySeverity: {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  }
});

export const calculateSummary = (findings) => {
  const summary = createEmptySummary();

  for (const finding of findings) {
    summary.totalFindings += 1;
    summary.bySeverity[finding.severity] += 1;
  }

  return summary;
};
