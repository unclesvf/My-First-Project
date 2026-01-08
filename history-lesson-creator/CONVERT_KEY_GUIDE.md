# Converting PuTTY Key to OpenSSH Format

## Your PuTTY Key Location
Found: `C:\Users\scott\OneDrive\Documents\unclesvf-putty.ppk`

## Step-by-Step Conversion

### Step 1: Open PuTTYgen
1. Press **Windows key**
2. Type **"PuTTYgen"**
3. Click **PuTTYgen** (should be installed with PuTTY)

### Step 2: Load Your Existing Key
1. Click **"Load"** button
2. Navigate to: `C:\Users\scott\OneDrive\Documents\`
3. Select `unclesvf-putty.ppk`
4. Click **"Open"**
5. If asked for passphrase, enter it

### Step 3: Export Private Key (OpenSSH Format)
1. Go to menu: **Conversions → Export OpenSSH key**
2. You'll see a warning: "Are you sure you want to save this key without a passphrase?"
   - Click **"Yes"** (we can add passphrase later if needed)
3. Save dialog will appear
4. Navigate to: `C:\Users\scott\.ssh\`
5. File name: **`id_rsa`** (exactly this, NO file extension)
6. Click **"Save"**

⚠️ **IMPORTANT:** The file must be named exactly `id_rsa` with NO `.txt` or other extension!

### Step 4: Save Public Key
1. In PuTTYgen, look for the box labeled:
   **"Public key for pasting into OpenSSH authorized_keys file"**
2. **Select ALL text** in that box (Ctrl+A)
3. **Copy it** (Ctrl+C)
4. Open **Notepad**
5. **Paste** the text (Ctrl+V)
6. Click **File → Save As**
7. Navigate to: `C:\Users\scott\.ssh\`
8. File name: **`id_rsa.pub`** (exactly this)
9. Save as type: **"All Files (*.*)"** (not .txt!)
10. Click **"Save"**

### Step 5: Verify Files Created
You should now have these files:
- `C:\Users\scott\.ssh\id_rsa` (private key, no extension)
- `C:\Users\scott\.ssh\id_rsa.pub` (public key)

### Step 6: Set Permissions and Test (in Git Bash)
After creating both files, run in Git Bash:
```bash
cd /c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator
bash setup-ssh.sh
```

This will:
- Set correct permissions on the keys
- Test SSH connection
- Tell you if it works!

### Step 7: Deploy!
If setup-ssh.sh says "✓ SSH key authentication works!", you can now deploy:
```bash
bash deploy-scp.sh
```

It will deploy **WITHOUT asking for a password!**

---

## Troubleshooting

### "Can't save to .ssh folder"
- Create the folder first:
  - Open File Explorer
  - Go to `C:\Users\scott\`
  - Right-click → New → Folder
  - Name it `.ssh.` (with trailing dot - Windows will auto-remove it)

### "File has .txt extension"
- In Save dialog, change "Save as type" to "All Files (*.*)"
- Make sure filename is exactly `id_rsa` or `id_rsa.pub`

### "PuTTYgen not found"
- Download PuTTY installer: https://www.putty.org/
- Reinstall to get PuTTYgen

---

## What This Fixes
After conversion, you'll have:
- ✅ Password-free deployments
- ✅ Faster uploads (no password prompt delays)
- ✅ More secure (key-based auth)
- ✅ Works with Git Bash/rsync/scp

Ready? Follow the steps above, then run `bash setup-ssh.sh`!
