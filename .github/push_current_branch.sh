#!/bin/bash
# filepath: /Users/phuonglq/Desktop/_WorkSpace/Udemy/Practice/JS Game/MemoryGame/.github/push_current_branch.sh

# Get the current branch name
BRANCH_NAME=$(git symbolic-ref --short HEAD)

# Check if commit message was provided
if [ -z "$1" ]; then
  echo "Error: Please provide a commit message."
  echo "Usage: ./commit.sh \"your commit message\""
  exit 1
fi

# Add all changes
echo "Adding all changes..."
git add .

# Create commit with branch name and message
echo "Creating commit..."
git commit -m "[$BRANCH_NAME] $1"

# Push to current branch
echo "Pushing to $BRANCH_NAME branch..."
git push origin $BRANCH_NAME

echo "Done! Changes committed and pushed to $BRANCH_NAME."