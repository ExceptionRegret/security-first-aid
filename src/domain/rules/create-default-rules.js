import { createDebugEnabledRule } from "../../rules/config/create-debug-enabled-rule.js";
import { createCorsWildcardRule } from "../../rules/config/create-cors-wildcard-rule.js";
import { createCorsWildcardCredentialsRule } from "../../rules/config/create-cors-wildcard-credentials-rule.js";
import { createInsecureSessionCookieRule } from "../../rules/config/create-insecure-session-cookie-rule.js";
import { createSessionHttpOnlyDisabledRule } from "../../rules/config/create-session-http-only-disabled-rule.js";
import { createDockerAddInstructionRule } from "../../rules/docker/create-docker-add-instruction-rule.js";
import { createDockerMissingUserRule } from "../../rules/docker/create-docker-missing-user-rule.js";
import { createDockerFloatingTagRule } from "../../rules/docker/create-docker-floating-tag-rule.js";
import { createCommittedEnvFileRule } from "../../rules/env/create-committed-env-file-rule.js";
import { createWorkflowPullRequestTargetRule } from "../../rules/workflows/create-workflow-pull-request-target-rule.js";
import { createWorkflowPipeToShellRule } from "../../rules/workflows/create-workflow-pipe-to-shell-rule.js";
import { createWorkflowMissingPermissionsRule } from "../../rules/workflows/create-workflow-missing-permissions-rule.js";
import { createWorkflowUnpinnedActionRule } from "../../rules/workflows/create-workflow-unpinned-action-rule.js";
import { createWorkflowWriteAllRule } from "../../rules/workflows/create-workflow-write-all-rule.js";
import { createSecretInEnvRule } from "../../rules/secrets/create-secret-in-env-rule.js";

export const createDefaultRules = () => [
  createSecretInEnvRule(),
  createCommittedEnvFileRule(),
  createWorkflowWriteAllRule(),
  createWorkflowUnpinnedActionRule(),
  createWorkflowPullRequestTargetRule(),
  createWorkflowPipeToShellRule(),
  createWorkflowMissingPermissionsRule(),
  createDockerMissingUserRule(),
  createDockerFloatingTagRule(),
  createDockerAddInstructionRule(),
  createDebugEnabledRule(),
  createCorsWildcardRule(),
  createCorsWildcardCredentialsRule(),
  createInsecureSessionCookieRule(),
  createSessionHttpOnlyDisabledRule()
];
