#!/bin/bash
# Verify SSH key conversion and setup

echo "======================================"
echo "SSH Key Verification"
echo "======================================"
echo ""

# Check if private key exists
if [ -f ~/.ssh/id_rsa ]; then
    echo "✓ Private key found: ~/.ssh/id_rsa"

    # Check permissions
    PERMS=$(stat -c %a ~/.ssh/id_rsa 2>/dev/null || stat -f %A ~/.ssh/id_rsa 2>/dev/null)
    if [ "$PERMS" = "600" ]; then
        echo "  ✓ Permissions correct (600)"
    else
        echo "  ⚠ Permissions: $PERMS (should be 600)"
        echo "    Fixing..."
        chmod 600 ~/.ssh/id_rsa
        echo "  ✓ Fixed!"
    fi
else
    echo "✗ Private key NOT found: ~/.ssh/id_rsa"
    echo ""
    echo "Please follow CONVERT_KEY_GUIDE.md to convert your PuTTY key."
    exit 1
fi

echo ""

# Check if public key exists
if [ -f ~/.ssh/id_rsa.pub ]; then
    echo "✓ Public key found: ~/.ssh/id_rsa.pub"
else
    echo "⚠ Public key NOT found: ~/.ssh/id_rsa.pub"
    echo "  (Optional but recommended)"
fi

echo ""

# Check .ssh directory permissions
chmod 700 ~/.ssh
echo "✓ .ssh directory permissions set"

echo ""
echo "======================================"
echo "Testing SSH Connection"
echo "======================================"
echo ""

# Test connection
echo "Attempting SSH connection to unclesvf@unclesvf.com..."
echo "(This should NOT ask for a password)"
echo ""

ssh -o BatchMode=yes -o ConnectTimeout=10 unclesvf@unclesvf.com "echo '✓ SUCCESS! SSH key authentication works!'; hostname" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "🎉 READY TO DEPLOY!"
    echo "======================================"
    echo ""
    echo "Your SSH key is configured correctly."
    echo "You can now deploy without entering a password:"
    echo ""
    echo "  bash deploy-scp.sh"
    echo ""
else
    echo ""
    echo "======================================"
    echo "⚠ SSH Key Not Working"
    echo "======================================"
    echo ""
    echo "The key is converted, but not uploaded to the server yet."
    echo ""
    echo "To upload your public key to the server, run:"
    echo ""
    echo "  cat ~/.ssh/id_rsa.pub | ssh unclesvf@unclesvf.com 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'"
    echo ""
    echo "This will ask for your password ONE TIME to upload the key."
    echo "After that, you won't need passwords anymore."
    echo ""
fi
