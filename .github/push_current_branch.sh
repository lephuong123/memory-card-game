#!/bin/bash

# Add all changes to staging
git add .

# Get current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Count modified files
MODIFIED_COUNT=$(git status --porcelain | wc -l | tr -d ' ')

# Get main file type changed
FILE_TYPE=$(git status --porcelain | awk '{print $2}' | grep -o '\.[^\.]*$' | sort | uniq -c | sort -nr | head -1 | awk '{print $2}' | cut -c 2-)
if [ -z "$FILE_TYPE" ]; then
  FILE_TYPE="files"
fi

# Determine type of change based on branch name
if [[ $BRANCH == *"feature"* ]]; then
  CHANGE_TYPE="Feature development"
elif [[ $BRANCH == *"fix"* || $BRANCH == *"bug"* ]]; then
  CHANGE_TYPE="Bug fix"
elif [[ $BRANCH == *"refactor"* ]]; then
  CHANGE_TYPE="Code refactoring"
elif [[ $BRANCH == *"docs"* ]]; then
  CHANGE_TYPE="Documentation"
else
  CHANGE_TYPE="Update"
fi

# Create commit message
COMMIT_MESSAGE="[$BRANCH]: $CHANGE_TYPE - $MODIFIED_COUNT $FILE_TYPE files"

# Commit with the generated message
git commit -m "$COMMIT_MESSAGE"

# Push to remote repository
git push origin $BRANCH

echo "✅ Successfully committed and pushed to $BRANCH"
echo "📝 Commit message: $COMMIT_MESSAGE"