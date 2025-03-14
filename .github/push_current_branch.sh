#!/bin/bash
# filepath: /Users/phuonglq/Desktop/_WorkSpace/Udemy/Practice/JS Game/MemoryGame/.github/push_current_branch.sh

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

# Get list of changed files
changed_files=$(git diff --name-only --staged | xargs -n1 basename | sort | uniq)

# Format the changed files list for the commit message
if [ $(echo "$changed_files" | wc -l) -gt 3 ]; then
  # If more than 3 files changed, show count instead of listing all
  file_count=$(echo "$changed_files" | wc -l)
  files_for_message="$file_count files"
else
  # Join files with "and" for better readability
  files_for_message=$(echo "$changed_files" | paste -sd ", " - | sed 's/, \([^,]*\)$/ and \1/')
fi

# Create commit message
commit_message="$current_branch: Update $files_for_message"

# Commit with the generated message
git commit -m "$commit_message"

# Push to the current branch
git push origin $current_branch

echo "Changes committed and pushed successfully"
echo "Commit message: $commit_message"