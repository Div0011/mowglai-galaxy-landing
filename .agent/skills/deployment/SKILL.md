---
name: Deployment
description: Deploy the Mowglai application to Hostinger via GitHub Actions
---

# Deployment Skill

This skill handles the deployment of the Mowglai application.

## Prerequisites
- User must have push access to the `main` branch.
- GitHub Secrets must be configured:
  - `SSH_HOST`
  - `SSH_USERNAME`
  - `SSH_PORT`
  - `SSH_PRIVATE_KEY`
  - `REMOTE_PATH`

## Usage

### 1. Manual Deployment (via GitHub Actions)
You can manually trigger the deployment workflow from the GitHub Actions tab.
1. Go to the "Actions" tab in the repository.
2. Select "CI/CD" workflow.
3. Click "Run workflow" and select `main`.

### 2. Automatic Deployment
Pushing to the `main` branch will automatically trigger:
1. Linting
2. Build
3. rsync deployment to Hostinger (if build succeeds)

## Verification
After deployment, verify the site is live:
1. Visit `https://mowglai.com` (or staging URL if applicable).
2. Check the "Actions" tab for a green checkmark on the latest run.
