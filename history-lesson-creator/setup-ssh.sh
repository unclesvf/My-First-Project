#!/bin/bash
# Setup SSH keys with correct permissions

echo "Setting up SSH key permissions..."

# Set restrictive permissions on private key
if [ -f ~/.ssh/id_rsa ]; then
    chmod 600 ~/.ssh/id_rsa
    echo "✓ Set permissions on id_rsa (private key)"
else
    echo "✗ id_rsa not found in ~/.ssh/"
    echo "  Please convert your PuTTY key first"
    exit 1
fi

# Set permissions on public key
if [ -f ~/.ssh/id_rsa.pub ]; then
    chmod 644 ~/.ssh/id_rsa.pub
    echo "✓ Set permissions on id_rsa.pub (public key)"
else
    echo "⚠ id_rsa.pub not found - this is optional but recommended"
fi

# Set permissions on .ssh directory
chmod 700 ~/.ssh
echo "✓ Set permissions on ~/.ssh directory"

echo ""
echo "Testing SSH connection..."
ssh -o BatchMode=yes -o ConnectTimeout=5 unclesvf@unclesvf.com "echo '✓ SSH key authentication works!'" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Success! SSH key authentication is working!"
    echo "You can now deploy without entering a password."
else
    echo ""
    echo "⚠ SSH key test failed. Possible reasons:"
    echo "  1. Key not uploaded to server yet"
    echo "  2. Wrong key format"
    echo "  3. Server doesn't have your public key"
    echo ""
    echo "To upload your public key to the server:"
    echo "  cat ~/.ssh/id_rsa.pub | ssh unclesvf@unclesvf.com 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'"
fi
