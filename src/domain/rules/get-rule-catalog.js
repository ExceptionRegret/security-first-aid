import { createDefaultRules } from "./create-default-rules.js";

export const getRuleCatalog = () => createDefaultRules().map((rule) => ({
  id: rule.id,
  title: rule.title,
  defaultSeverity: rule.defaultSeverity,
  category: rule.category,
  appliesTo: rule.appliesTo
}));
