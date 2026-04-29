# Upload this project to GitHub and Vercel

This ZIP is flattened for Vercel. After extracting it, the top-level folder contains:

- package.json
- package-lock.json
- next.config.ts
- src/
- public/

## GitHub upload

Upload the CONTENTS of this folder to your GitHub repo, not the ZIP file itself.

Your GitHub repo top level should show `package.json` immediately, not inside another folder.

## Vercel settings

When importing the repo into Vercel:

- Framework Preset: Next.js
- Root Directory: leave blank/default
- Install Command: npm install
- Build Command: npm run build
- Output Directory: leave blank

If Vercel asks about build cache on redeploy, disable build cache for the first clean deploy.
