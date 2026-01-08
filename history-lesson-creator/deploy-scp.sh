#!/bin/bash
# Simple SCP deployment script for History for Homeschoolers
# Uses scp instead of rsync (slower but works without rsync installation)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}History for Homeschoolers - Deployment${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

# Load configuration
if [ ! -f "deploy.config" ]; then
    echo -e "${RED}Error: deploy.config not found!${NC}"
    exit 1
fi

source deploy.config

# Validate
if [ -z "$SSH_USER" ] || [ -z "$SSH_HOST" ] || [ -z "$REMOTE_PATH" ]; then
    echo -e "${RED}Error: Missing configuration in deploy.config${NC}"
    exit 1
fi

# Check out directory
if [ ! -d "out" ]; then
    echo -e "${RED}Error: out/ directory not found!${NC}"
    echo -e "${YELLOW}Run 'npm run build' first.${NC}"
    exit 1
fi

echo -e "${BLUE}Configuration:${NC}"
echo -e "  Server: ${GREEN}$SSH_USER@$SSH_HOST${NC}"
echo -e "  Remote Path: ${GREEN}$REMOTE_PATH${NC}"
echo -e "  Local Path: ${GREEN}./out/${NC}"
echo -e "  Method: ${GREEN}SCP (simple file copy)${NC}"
echo ""

# Confirm
read -p "Deploy to production? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}Step 1: Creating remote directory...${NC}"
ssh -p ${SSH_PORT:-22} "$SSH_USER@$SSH_HOST" "mkdir -p $REMOTE_PATH"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to create remote directory. Check SSH credentials.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Remote directory ready${NC}"
echo ""

echo -e "${BLUE}Step 2: Uploading files (this may take 30-60 seconds)...${NC}"
echo -e "${YELLOW}Note: First upload copies all files. Future updates will be faster with rsync.${NC}"
echo ""

# Upload using scp with recursive flag
scp -r -P ${SSH_PORT:-22} out/* "$SSH_USER@$SSH_HOST:$REMOTE_PATH/"

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
    echo -e "${YELLOW}Tip: Install rsync for faster future deployments:${NC}"
    echo -e "${YELLOW}  pacman -S rsync (in Git Bash)${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}✗ Deployment failed!${NC}"
    echo -e "${YELLOW}Check your SSH credentials and network connection.${NC}"
    exit 1
fi
