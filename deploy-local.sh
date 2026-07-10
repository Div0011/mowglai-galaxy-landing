#!/bin/bash

# Exit immediately if any command fails
set -e

echo "=== Mowglai Local Deployment ==="

# Check for SSH key path argument
if [ -z "$1" ]; then
    echo "Usage: ./deploy-local.sh <path_to_ssh_private_key>"
    echo "Example: ./deploy-local.sh ~/.ssh/id_rsa"
    exit 1
fi

SSH_KEY_PATH=$1

# Ensure key file exists
if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "Error: SSH private key not found at $SSH_KEY_PATH"
    exit 1
fi

echo "1. Checking TypeScript types..."
npx tsc --noEmit

echo "2. Running ESLint check..."
bun run lint

echo "3. Compiling production static export..."
bun run build

echo "4. Deploying files to Hostinger via rsync..."
rsync -avzr --delete \
  -e "ssh -p 65002 -i $SSH_KEY_PATH -o StrictHostKeyChecking=no" \
  ./out/ \
  u707591712@82.25.120.199:public_html/

echo "=== Deployment Completed Successfully ==="
