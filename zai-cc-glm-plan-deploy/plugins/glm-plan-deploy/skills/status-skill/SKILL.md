---
name: status-skill
description: Run nodejs script to get status of the last deployment. Only use when invoked by status command.
allowed-tools: Bash, Read, Grep
---

# Status Skill

Run once:
```bash
node /absolute/path/to/glm-plan-deploy/scripts/index.cjs status
```

## Result

**Success:** Run
```bash
open deploymentURL
```

**Error:** Display the error message to the user. If a log URL is provided, open it with the default browser. Download and analyze the deploy log and/or audit result to provide actionable feedback.