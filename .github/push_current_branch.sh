#!/bin/bash

# Check if in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "Error: Not in a git repository"
  exit 1
fi

# Add all changes
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
  echo "No changes to commit"
  exit 0
fi

# Get current branch name
current_branch=$(git branch --show-current)

# Extract feature name from branch (assuming branch naming like feature/add-login)
feature_name=$(echo "$current_branch" | sed 's/.*\///' | tr '-' ' ')

# Create a more descriptive commit message based on branch name
commit_message="$current_branch: Update $feature_name functionality"

# Commit with the generated message
git commit -m "$commit_message"

# Push to the current branch
git push origin $current_branch

echo "Changes committed and pushed successfully"
echo "Commit message: $commit_message"