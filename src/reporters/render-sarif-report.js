const severityToLevel = {
  critical: "error",
  high: "error",
  medium: "warning",
  low: "note"
};

const createRuleDescriptor = (finding) => ({
  id: finding.ruleId,
  name: finding.title,
  shortDescription: {
    text: finding.summary
  },
  fullDescription: {
    text: finding.rationale
  },
  help: {
    text: finding.remediation
  },
  properties: {
    category: finding.category,
    severity: finding.severity
  }
});

const createResult = (finding) => ({
  ruleId: finding.ruleId,
  level: severityToLevel[finding.severity],
  message: {
    text: finding.summary
  },
  locations: [
    {
      physicalLocation: {
        artifactLocation: {
          uri: finding.filePath
        }
      }
    }
  ]
});

export const renderSarifReport = (result) => {
  const uniqueRules = result.ruleCatalog?.length
    ? result.ruleCatalog.map((rule) => ({
      id: rule.id,
      name: rule.title,
      shortDescription: {
        text: rule.title
      },
      fullDescription: {
        text: `Category: ${rule.category}`
      },
      help: {
        text: `Default severity: ${rule.defaultSeverity}`
      },
      properties: {
        category: rule.category,
        severity: rule.defaultSeverity
      }
    }))
    : Array.from(
      new Map(result.findings.map((finding) => [finding.ruleId, createRuleDescriptor(finding)])).values()
    );

  return JSON.stringify({
    version: "2.1.0",
    runs: [
      {
        tool: {
          driver: {
            name: "Security First Aid",
            informationUri: "https://example.invalid/security-first-aid",
            rules: uniqueRules
          }
        },
        results: result.findings.map(createResult)
      }
    ]
  }, null, 2);
};
