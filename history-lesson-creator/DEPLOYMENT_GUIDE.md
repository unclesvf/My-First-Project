# Deployment Guide for A2Hosting via SSH

## Prerequisites

You have:
- ✅ A2Hosting account
- ✅ PuTTY configured for SSH access
- ✅ Server: unclesvf.com

## Setup (One-Time)

### Step 1: Choose Your Deployment Method

**Option A: Git Bash (Recommended - Fast & Automated)**
- If you have Git for Windows installed, you already have Git Bash
- Includes rsync for efficient uploads
- Best for repeated deployments

**Option B: WinSCP (GUI - User Friendly)**
- Download from https://winscp.net/
- Visual interface for file transfer
- Good for manual deployments

**Option C: PuTTY's pscp (Command Line)**
- Comes with PuTTY
- Command-line only
- Works but slower than rsync

### Step 2: Configure Deployment Settings

1. Copy `deploy.config.example` to `deploy.config`:
   ```bash
   cp deploy.config.example deploy.config
   ```

2. Edit `deploy.config` with your details:
   ```bash
   SSH_USER="your_a2hosting_username"   # Your A2Hosting username
   SSH_HOST="unclesvf.com"              # Your domain
   SSH_PORT="22"                        # Default SSH port
   REMOTE_PATH="public_html/history"   # Where files go on server
   SITE_URL="unclesvf.com/history"     # Your site URL
   ```

3. **IMPORTANT:** Add `deploy.config` to `.gitignore` (contains credentials):
   ```bash
   echo "deploy.config" >> .gitignore
   ```

### Step 3: Test SSH Connection

Test your SSH connection works:
```bash
ssh your_username@unclesvf.com
```

If prompted, accept the server fingerprint.

## Deploying

### Method A: Git Bash (Automated - Recommended)

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   ```bash
   bash deploy.sh
   ```

3. **Confirm when prompted** (type `y` and press Enter)

4. **Wait for upload** (first time ~4.7 MB, updates only changed files)

5. **Done!** Visit `https://unclesvf.com/history/`

**For future deployments:** Just run `bash deploy.sh` - it only uploads changes!

### Method B: WinSCP (GUI)

1. **Install WinSCP** from https://winscp.net/

2. **Create new session:**
   - File protocol: SFTP
   - Host name: unclesvf.com
   - Port: 22
   - User name: [your A2Hosting username]
   - Password: [your password]

3. **Connect and navigate:**
   - Local: `C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\out\`
   - Remote: `/home/[username]/public_html/history/`

4. **Upload:**
   - Select all files in `out/` folder
   - Drag to remote `public_html/history/` folder
   - Choose "Synchronize" or "Upload"

5. **Done!** Visit `https://unclesvf.com/history/`

### Method C: Command Line (pscp)

1. **Build the site:**
   ```cmd
   npm run build
   ```

2. **Upload using pscp:**
   ```cmd
   pscp -r out/* your_username@unclesvf.com:/home/your_username/public_html/history/
   ```

3. **Done!** Visit `https://unclesvf.com/history/`

## Quick Deployment Workflow

**Every time you make changes:**

1. Make your code changes
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Deploy: `bash deploy.sh` (or use WinSCP)
5. Test on live site: `https://unclesvf.com/history/`

## Setting Up .htaccess (One-Time)

After first deployment, create `.htaccess` file on the server:

**Using SSH:**
```bash
ssh your_username@unclesvf.com
cd public_html/history
nano .htaccess
```

**Paste this content:**
```apache
# Enable rewrite engine
RewriteEngine On

# Handle trailing slashes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !/$
RewriteRule ^(.*)$ /$1/ [L,R=301]

# Serve index.html for directories
DirectoryIndex index.html

# Custom 404 page
ErrorDocument 404 /history/404.html

# Cache static assets (1 year)
<FilesMatch "\.(js|css|woff|woff2|ttf|svg|jpg|jpeg|png|gif|ico)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Cache HTML (1 hour for updates)
<FilesMatch "\.(html)$">
  Header set Cache-Control "max-age=3600, public, must-revalidate"
</FilesMatch>
```

**Save:** Ctrl+X, then Y, then Enter

## Troubleshooting

### "Permission denied" error
- Check SSH username and password
- Verify you have write access to `public_html/history/`

### "Connection refused"
- Check if SSH port 22 is open
- Try pinging unclesvf.com
- Contact A2Hosting support

### Files upload but site doesn't work
- Check `.htaccess` file is present
- Verify all files uploaded (especially `_next/` folder)
- Check browser console for errors (F12)

### "out/ directory not found"
- Run `npm run build` first

## Future Projects

This deployment setup works for any Next.js static export:

1. Navigate to project folder
2. Copy `deploy.sh` and `deploy.config.example`
3. Update `deploy.config` with new REMOTE_PATH
4. Run `bash deploy.sh`

**Example for Math Trainer:**
```bash
REMOTE_PATH="public_html/math"
SITE_URL="unclesvf.com/math"
```

## Performance Tips

### First Deployment
- Takes ~30 seconds to upload 4.7 MB
- Uploads everything

### Subsequent Deployments (rsync)
- Only uploads changed files
- Typically <5 seconds for small changes
- Deletes removed files automatically

### Manual Deployments (WinSCP)
- Use "Synchronize" feature for efficiency
- Compares files and only uploads changes

## Security Notes

1. **Never commit `deploy.config`** (contains credentials)
2. **Use SSH keys** instead of passwords (more secure)
3. **Keep backups** before deploying major changes

## Getting Help

If deployment issues:
1. Check DEPLOYMENT_READY.md for testing checklist
2. Verify build completed: `npm run build`
3. Test SSH connection: `ssh your_username@unclesvf.com`
4. Contact A2Hosting support: https://www.a2hosting.com/support

---

**Ready to deploy?** Run `bash deploy.sh` and your site will be live at https://unclesvf.com/history/ in seconds!
