# Setup SSH Key Authentication via WinSCP

## Your Public Key (ready to copy)

This is stored in: `C:\Users\scott\.ssh\id_rsa.pub`

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQD3/rgBMd3OJFLdlrIVRkgTJxsk23hZqZI20QTY8GjTPXxl3GgEk1aCwU9+ujOMB0reXI8dhSxF7uhfpIHt0ZnWCy4QSAdgIID6cJk4y1PTfxfeu8be2Wju3SAu0065yJBQfbVYOUC7MItAR5w4N6wE8J2dkj6zjoFzESm0FxaNNKdg/QHhIhWNUySx3M5up2ytYKtnCV9/bhvq6qzYG8MyQKNkjUq88e8hEH2xAcvSv/CQ1ZsBnDMdKdGxIT2SZZpP8hDaRr0UC8G0O9xfDJ+CziPd4gz2r2VUQ5gBF39KjdVMXFrc5wgZ1el0oCHJ3fKzC6mIfrn1FjY6H5gqoraLsb0hUcnS6CUbbaoaLpqjVaC55EZSxWiDlrJErU6mvbfq8dC697IL099smVjHurF+db8v0zQklBqLHEc3q4qgRmraG0rOpRyYp6N0JAsbb6VvqJPpj91uCm0BhnqKOOVhCnkucwRYwVOX7yM/YwwCS5z0HFILcVj13xGsjEsjkPposiasC79CHdh7F/7YP8HMrYSE28MxlB81DbOtmXae7tgEH35a150x2ps7yATGCWycX21TL6+8Zs20PiLHu1Kx/rshoOUeO1I3l+ge7khCKwOjI3/qEORYFQfdmYzoUeSbPfeQTCIJItxhguhMiaf473RRj4I/xcYYNyDW4xn76w==
```

## Step-by-Step Instructions

### Step 1: Open WinSCP
1. Press **Windows key**
2. Type **"WinSCP"**
3. Open WinSCP

### Step 2: Connect to Your Server
1. In WinSCP, create/select your connection:
   - **Host name:** `unclesvf.com`
   - **User name:** `unclesvf`
   - **Password:** (your cPanel password)
   - **Port:** 22
2. Click **Login**
3. If asked about host key, click **Yes** to trust it

### Step 3: Navigate to .ssh Directory
1. In the right panel (server side), you should see your home directory
2. Look for a folder named `.ssh`
3. **If .ssh folder exists:**
   - Double-click to open it
4. **If .ssh folder does NOT exist:**
   - Right-click in the right panel
   - Select **New → Directory**
   - Name it `.ssh` (with the dot!)
   - Click **OK**
   - Double-click to open the new `.ssh` folder

### Step 4: Edit authorized_keys File
1. Inside the `.ssh` folder, look for a file named `authorized_keys`

2. **If authorized_keys exists:**
   - Right-click on `authorized_keys`
   - Select **Edit**
   - Go to the END of the file
   - Press **Enter** to create a new line
   - **Paste the entire public key** from above (the whole ssh-rsa line)
   - Save the file (Ctrl+S)
   - Close the editor

3. **If authorized_keys does NOT exist:**
   - Right-click in the right panel
   - Select **New → File**
   - Name it `authorized_keys` (no file extension!)
   - Click **OK**
   - Right-click the new file and select **Edit**
   - **Paste the entire public key** from above
   - Save the file (Ctrl+S)
   - Close the editor

### Step 5: Set Permissions (IMPORTANT!)
1. Right-click on `authorized_keys`
2. Select **Properties**
3. Click the **Permissions** section
4. Set the **Octal** value to: `600`
   - Or check: Owner: Read + Write, Group: none, Other: none
5. Click **OK**

### Step 6: Test SSH Key Authentication
1. Close WinSCP
2. Go back to Git Bash
3. Run this command to test:
   ```bash
   bash verify-ssh.sh
   ```
4. It should say: **"SUCCESS! SSH key authentication works!"**

### Step 7: Deploy!
Once verify-ssh.sh succeeds, deploy your site:
```bash
bash deploy-scp.sh
```

It will deploy **WITHOUT asking for a password!**

---

## Troubleshooting

### "Cannot create file authorized_keys"
- The .ssh directory might not have correct permissions
- In WinSCP, right-click the `.ssh` folder → Properties
- Set permissions to `700` (Owner: Read+Write+Execute)

### "Still asking for password after setup"
- Make sure the public key is on ONE line (no line breaks)
- Make sure authorized_keys has permissions 600
- Make sure .ssh folder has permissions 700

### "Permission denied" when testing
- Double-check the public key was pasted correctly
- Make sure there are no extra spaces at the beginning or end
- The key should start with `ssh-rsa` and be all on one line
