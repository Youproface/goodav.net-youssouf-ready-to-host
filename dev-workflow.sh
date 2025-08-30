#!/bin/bash

# GoodAV Development Workflow Script
# Helps manage development and production deployments

set -e

REPO_DIR="/Users/youssoufhakizimana/Desktop/Goodav. net/goodav.net-youssouf-ready-to-host"

echo "🚀 GoodAV Development Workflow"
echo "=============================="

cd "$REPO_DIR"

case "$1" in
    "dev")
        echo "🔄 Switching to develop branch..."
        git checkout develop
        git pull origin develop
        echo "✅ Ready to work on dev environment"
        echo "🌐 Changes will deploy to: dev.goodav.net"
        ;;

    "prod")
        echo "🔄 Switching to main branch..."
        git checkout main
        git pull origin main
        echo "✅ Ready to work on production"
        echo "🌐 Changes will deploy to: goodav.net"
        ;;

    "merge")
        echo "🔄 Merging develop → main..."
        git checkout main
        git pull origin main
        git merge develop
        echo "📝 Enter commit message for production deployment:"
        read -r commit_msg
        git commit -m "$commit_msg"
        git push origin main
        echo "✅ Merged and deployed to production!"
        ;;

    "status")
        echo "📊 Current Status:"
        echo "Branch: $(git branch --show-current)"
        echo "Last commit: $(git log --oneline -1)"
        echo "Remote: $(git remote get-url origin)"
        ;;

    "test-dev")
        echo "🧪 Testing dev deployment..."
        git checkout develop
        echo "Test deployment - $(date)" > dev-test-$(date +%s).txt
        git add .
        git commit -m "Test deployment to dev.goodav.net"
        git push origin develop
        echo "✅ Test changes pushed to develop branch"
        echo "🌐 Check dev.goodav.net for changes"
        ;;

    *)
        echo "Usage: $0 {dev|prod|merge|status|test-dev}"
        echo ""
        echo "Commands:"
        echo "  dev      - Switch to develop branch"
        echo "  prod     - Switch to main branch"
        echo "  merge    - Merge develop to main (production deploy)"
        echo "  status   - Show current git status"
        echo "  test-dev - Push test changes to dev environment"
        ;;
esac
