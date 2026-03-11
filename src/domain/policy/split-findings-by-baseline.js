export const splitFindingsByBaseline = ({ findings, baselineFingerprints }) => {
  const activeFindings = [];
  const suppressedFindings = [];

  for (const finding of findings) {
    if (baselineFingerprints.has(finding.fingerprint)) {
      suppressedFindings.push(finding);
      continue;
    }

    activeFindings.push(finding);
  }

  return {
    activeFindings,
    suppressedFindings
  };
};
