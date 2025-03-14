#!/bin/bash
# filepath: /Users/phuonglq/Desktop/_WorkSpace/Udemy/Practice/JS Game/MemoryGame/.github/push_current_branch.sh

# Get current branch name
current_branch=$(git branch --show-current)

# Add all changes to staging
git add .

# Get count of changed files
changed_files=$(git diff --cached --numstat | wc -l | tr -d '[:space:]')

# Determine change type based on branch name prefix
if [[ $current_branch == feature/* ]]; then
    change_type="Feature"
elif [[ $current_branch == fix/* || $current_branch == bugfix/* ]]; then
    change_type="Fix"
elif [[ $current_branch == refactor/* ]]; then
    change_type="Refactor"
elif [[ $current_branch == docs/* ]]; then
    change_type="Documentation"
elif [[ $current_branch == style/* ]]; then
    change_type="Style"
elif [[ $current_branch == test/* ]]; then
    change_type="Test"
elif [[ $current_branch == chore/* ]]; then
    change_type="Chore"
else
    change_type="Update"
fi

# Create commit message
branch_name=$(echo $current_branch | sed 's/^[^\/]*\///')
commit_message="${change_type}: ${branch_name} (${changed_files} files)"

# Commit with the generated message
echo "Committing with message: $commit_message"
git commit -m "$commit_message"

# Push to the current branch
echo "Pushing to origin/$current_branch"
git push origin $current_branch

echo "Changes committed and pushed successfully!"