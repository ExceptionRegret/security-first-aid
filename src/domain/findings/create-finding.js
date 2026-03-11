import crypto from "node:crypto";

const buildFingerprint = ({ ruleId, filePath, evidenceKey }) => {
  const hash = crypto.createHash("sha1");
  hash.update(`${ruleId}:${filePath}:${evidenceKey}`);
  return hash.digest("hex");
};

export const createFinding = ({
  ruleId,
  title,
  severity,
  category,
  filePath,
  summary,
  rationale,
  evidence,
  evidenceKey,
  remediation
}) => ({
  fingerprint: buildFingerprint({
    ruleId,
    filePath,
    evidenceKey
  }),
  ruleId,
  title,
  severity,
  category,
  filePath,
  summary,
  rationale,
  evidence,
  remediation
});
