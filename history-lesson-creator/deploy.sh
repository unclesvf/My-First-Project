#!/bin/bash
# Deployment script for History for Homeschoolers to unclesvf.com (A2Hosting)
# Usage: ./deploy.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}History for Homeschoolers - Deployment${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

# Load configuration
if [ ! -f "deploy.config" ]; then
    echo -e "${RED}Error: deploy.config not found!${NC}"
    echo -e "${YELLOW}Please create deploy.config with your server details.${NC}"
    echo -e "${YELLOW}See deploy.config.example for template.${NC}"
    exit 1
fi

source deploy.config

# Validate configuration
if [ -z "$SSH_USER" ] || [ -z "$SSH_HOST" ] || [ -z "$REMOTE_PATH" ]; then
    echo -e "${RED}Error: Missing configuration in deploy.config${NC}"
    echo -e "${YELLOW}Required: SSH_USER, SSH_HOST, REMOTE_PATH${NC}"
    exit 1
fi

# Check if out directory exists
if [ ! -d "out" ]; then
    echo -e "${RED}Error: out/ directory not found!${NC}"
    echo -e "${YELLOW}Run 'npm run build' first to generate the static site.${NC}"
    exit 1
fi

echo -e "${BLUE}Configuration:${NC}"
echo -e "  Server: ${GREEN}$SSH_USER@$SSH_HOST${NC}"
echo -e "  Remote Path: ${GREEN}$REMOTE_PATH${NC}"
echo -e "  Local Path: ${GREEN}./out/${NC}"
echo ""

# Confirm deployment
read -p "Deploy to production? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}Starting deployment...${NC}"
echo ""

# Run rsync
rsync -avz --delete \
    --exclude='.DS_Store' \
    --exclude='Thumbs.db' \
    --exclude='.git' \
    -e "ssh -p ${SSH_PORT:-22}" \
    out/ "$SSH_USER@$SSH_HOST:$REMOTE_PATH"

# Check if rsync succeeded
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Deployment successful!${NC}"
    echo ""
    echo -e "${BLUE}Your site should now be live at:${NC}"
    echo -e "${GREEN}https://$SITE_URL${NC}"
    echo ""
    echo -e "${BLUE}Test these URLs:${NC}"
    echo -e "  Home: ${GREEN}https://$SITE_URL${NC}"
    echo -e "  Lesson 1: ${GREEN}https://$SITE_URL/lesson/lesson-1/${NC}"
    echo -e "  Lesson 50: ${GREEN}https://$SITE_URL/lesson/lesson-50/${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}✗ Deployment failed!${NC}"
    echo -e "${YELLOW}Check your SSH credentials and network connection.${NC}"
    exit 1
fi
