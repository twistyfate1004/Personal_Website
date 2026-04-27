---
name: deploy-skill
description: Run Node.js script to deploy the user project in current folder. Only use when invoked by deploy command.
allowed-tools: Bash, Read, Grep
---

# Deploy Skill

Follow the steps below to complete the deployment task.

### Step 1: Determine the project type

Check if `package.json` exists in the current directory to determine if this is a Node.js project.

**If NOT a Node.js project:**
- Check if `index.html` exists in the **current folder** (not subdirectories)
- If not found: fail with error and exit
- If found: proceed to **Step 5** with empty input

**If IS a Node.js project:**
- Proceed to **Step 2**

### Step 2: Determine the Node.js version

Fetch supported versions:

```bash
node /absolute/path/to/glm-plan-deploy/scripts/index.cjs node
```

Returns JSON array: `["14.10.8", "20.18.0", "22.17.1", "24.5.0"]`

**First, detect the project's Node.js version requirement (in order):**

1. `package.json` `engines.node` field (e.g., `18.17.0`, `>=18.0.0`, `^16.14.0`)
2. `.nvmrc` file (e.g., `18`, `lts/*`, `18.17.0`)
3. `.node-version` file (e.g., `18`, `18.17.0`)
4. Lockfile (`package-lock.json` or `yarn.lock`) - extract the Node.js version used during install
5. Framework dependencies (determine the minimum version requirement):
   - Angular 20 → 20.19.0+, 22.12.0+, or 24.0.0+
   - Angular 19 → 18.19.1+, 20.11.1+, or 22.0.0+
   - Angular 18 → 18.19.1+, 20.11.1+, or 22.0.0+
   - Angular 17 (legacy) → 18.13.0+ or 20.9.0+
   - Express 5 → 18.17.0+ (Node.js 18 EOL, recommend 20+ for active LTS)
   - Express 4 → 18.17.0+ (legacy versions support 0.10+, but recommend current non-EOL Node versions)
   - Gatsby 5 → 18.0.0+ (Node 18 EOL, recommend 20+ for active LTS)
   - Gatsby 4 (legacy) → 14.15.0+ or 16.x+ (unsupported)
   - Hexo 8 → 20.19.0+ (dropped Node.js 16 and 18 support)
   - Hexo 7 → 14.0.0+ (Node 14 EOL, recommend 18.17.0+ or 20+)
   - Hexo 6.2+ → 12.13.0+ (legacy, Node 12/14 EOL)
   - Hexo 6.0-6.1 → 12.13.0 to 18.5.0 (legacy)
   - Hexo 5 → 10.13.0 to 12.0.0 (EOL)
   - Koa 3 → 18.0+
   - Koa 2 → 12.17+ (originally 7.6+)
   - Koa 1 → 0.12+ (with --harmony flag, legacy)
   - Next.js 16+ → 20.9+
   - Next.js 15 → 18.18+, 19.8.0 or 20.0.0+
   - Next.js 13-14 → 18.17+
   - Next.js 12-13 → 16.x or 18.x
   - Qwik / Qwik City → 18.17+
   - Remix 3+ / React Router 7+ → 20+ (Active/Maintenance LTS)
   - Remix 2 → 18+
   - Solid / SolidStart → 18+ (Latest LTS recommended)
   - React (Create React App - deprecated) → 14.x+
   - Vite 7+ → 20.19+ or 22.12+
   - Vite 6 → 18+, 20+, or 22+
   - Vite 5 → 18+ or 20+
   - Vite 4 → 16.x+
   - Vue 3 + Vite → 20.19+ or 22.12+
   - Nuxt 4 → 20.x+ (active LTS recommended)
   - Nuxt 3 → 20.x+
   - Nuxt 2 → 14.x+ or 16.x+ (EOL as of June 30, 2024)
   - SvelteKit 2 → 18.13+
   - SvelteKit 1 → 16+ (legacy)
   - Svelte 5 → 18+ (Vite 5 based)
   - Astro 5.8+ → 20.3+ or 22+
   - Astro 5 → 18.20.8+, 20.3+, or 22+
   - Astro 4 → 18.x+
   - Docusaurus 3.9+ → 20.0+
   - Docusaurus 3 → 18.0+
   - Docusaurus 2 → 16.x+

**Then, choose the closest matching version from the API response:**

- For a specific version (e.g., `18.17.0`): find the closest version in the supported list (prefer matching major version, then minor)
- For a minimum version (e.g., `>=18.0.0`): find the lowest version in the supported list that satisfies the requirement
- For a caret range (e.g., `^16.14.0`): find the lowest version in the supported list that is ≥ 16.14.0 but < 17.0.0, or the closest major version if none in that range
- For a tilde range (e.g., `~16.14.0`): find the lowest version in the supported list that is ≥ 16.14.0 but < 16.15.0
- For a major version (e.g., `18`): find the closest version in the supported list with major version 18

**If no version can be determined from the project, or if no version in the supported list matches the requirement, omit the entire JSON input in Step 5.**

### Step 3: Build locally

Use the right command to build the project.

If the build fails, help the user to fix the issues and retry.

### Step 4: Identify the build output directory (Node.js only)

Read config file first, fall back to default:

| Framework | Config File | Config Path | Default |
|-----------|-------------|-------------|---------|
| Angular | `angular.json` | `projects.{project}.architect.build.options.outputPath` | `dist/project-name/` |
| Astro | `astro.config.*` | `outDir` | `dist/` |
| Docusaurus | `docusaurus.config.*` | `outDir` | `build/` |
| Express | — | Server-side framework, no build output | — |
| Gatsby | `gatsby-config.*` | `pathPrefix` (CLI flags) | `public/` |
| Hexo | `_config.yml` | `public_dir` | `public/` |
| Koa | — | Server-side framework, no build output | — |
| Next.js | `next.config.*` | `distDir` | `.next/` |
| Next.js (static export) | - | When using next build && next export | `out/` |
| Nuxt | `nuxt.config.*` | `nitro.output.dir` / `buildDir` | `.output/public` |
| Qwik / Qwik City | `vite.config.*` | `build.outDir` | `dist/` |
| CRA (deprecated) | — | — | `build` |
| Remix | `vite.config.*` | `build.outDir` | `build/` |
| Solid / SolidStart | `app.config.ts` | Adapter-specific | `.output/public/` or `dist/` |
| SvelteKit | `svelte.config.js` | `kit.outDir` | `build` |
| Vite | `vite.config.*` | `build.outDir` | `dist` |
| Vue (Vite) | `vite.config.*` | `build.outDir` | `dist/` |
| webpack | `webpack.config.*` | `output.path` | `dist` |

**The `outdir` field should concatenate a subpath of `browser` for Angular framework, for example, the default value of `outdir` for Angular is `dist/project-name/browser`**

If config file or value not found, omit `outdir` from JSON input in Step 5.

### Step 5: Start the deployment

Construct JSON input:

**Node.js projects:**
```json
{"node": "<version>", "outdir": "<folder>"}
```

**Static HTML:**
```json
{}
```

**If no version can be determined from the project, or if no version in the supported list matches the requirement, omit the entire JSON input.**

Invoke deployment:

```bash
node /absolute/path/to/glm-plan-deploy/scripts/index.cjs deploy '<json>'
```

### Step 6: Handle the deployment result

**Success:** Run
```bash
open deploymentURL
```

**Error:** Display the error message to the user. If a log URL is provided, open it with the default browser. Download and analyze the deploy log and/or audit result to provide actionable feedback.

**Special error handling:**
- If error is "API Error: Project disable" or "API Error: Invalid projectId":
  - Inform user that project info has been reset
  - Retry the deploy skill from the beginning

---

## Constraints

- **DO NOT** guess output folder—if uncertain, omit `outdir`