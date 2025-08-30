# 🚀 Custom Domain Setup: goodav.net & dev.goodav.net

## ✅ Using YOUR Domains Only (No Netlify Subdomains)

**Important**: This setup uses ONLY your custom domains - `goodav.net` and `dev.goodav.net`. We do NOT use Netlify's default `.netlify.app` subdomains.

### Your Custom Domains:
- **Production**: `goodav.net` (your main domain)
- **Development**: `dev.goodav.net` (your subdomain)
- **No Netlify URLs**: No `yoursite.netlify.app` addresses used

## Step-by-Step Custom Domain Setup

### Phase 1: GoDaddy Subdomain Setup

1. **Login to GoDaddy**:
   - Go to [godaddy.com](https://godaddy.com)
   - Sign in to your account

2. **Access Domain Settings**:
   - Click on your domain `goodav.net`
   - Go to **"DNS"** or **"Domain Settings"**

3. **Add CNAME Record for Dev Subdomain**:
   - Click **"Add"** or **"Add Record"**
   - Select **"CNAME"** as the record type
   - Fill in the details:
     ```
     Name: dev
     Value: [YOUR-NETLIFY-SITE-NAME].netlify.app
     TTL: 1 Hour (or default)
     ```
   - Click **"Save"**

4. **Wait for DNS Propagation**:
   - DNS changes can take 5-30 minutes to propagate
   - You can check propagation at [dnschecker.org](https://dnschecker.org)

### Phase 2: Netlify Dev Site Setup

1. **Create Development Site in Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**
   - Connect your GitHub repository: `goodav.net-youssouf-ready-to-host`

2. **Configure Development Site**:
   - **Branch**: `develop` (not main)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Site name**: Choose something like `goodav-dev` or let Netlify generate one

3. **Add Custom Domain to Dev Site**:
   - In your dev site dashboard, go to **"Domain management"**
   - Click **"Add custom domain"**
   - Enter: `dev.goodav.net`
   - Follow the DNS instructions (you already did this in GoDaddy)

### Phase 3: GitHub Secrets Setup

Add these secrets to your GitHub repository for automated deployments:

1. **Go to Repository Settings**:
   - GitHub → Your Repository → **Settings** → **Secrets and variables** → **Actions**

2. **Add Required Secrets**:
   ```
   NETLIFY_AUTH_TOKEN = [Your Netlify Auth Token]
   NETLIFY_SITE_ID = [Production Site ID - for main branch]
   NETLIFY_DEV_SITE_ID = [Development Site ID - for develop branch]
   ```

3. **How to Get Netlify Tokens**:
   - **Auth Token**: Account → User Settings → Applications → "New access token"
   - **Site IDs**: Site Settings → General → "Site ID"

### Phase 4: Testing Workflow

1. **Switch to Develop Branch**:
   ```bash
   git checkout develop
   ```

2. **Make Test Changes**:
   ```bash
   # Make some changes to test
   echo "Dev Environment Test" > test-dev.txt
   ```

3. **Commit and Push to Develop**:
   ```bash
   git add .
   git commit -m "Test dev deployment"
   git push origin develop
   ```

4. **Monitor Deployment**:
   - Check GitHub Actions tab for deployment status
   - Visit `dev.goodav.net` to see your changes

### Phase 5: Production Deployment

When ready for production:

1. **Merge Develop to Main**:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

2. **Set Up Production Domain**:
   - In your production Netlify site
   - Add custom domain: `goodav.net`
   - Update GoDaddy DNS with production site URL

## 📋 Checklist

### GoDaddy Setup:
- [ ] Logged into GoDaddy account
- [ ] Added CNAME record: `dev` → `[netlify-site].netlify.app`
- [ ] DNS propagated (check with dnschecker.org)

### Netlify Setup:
- [ ] Created production site (main branch)
- [ ] Created development site (develop branch)
- [ ] Added `dev.goodav.net` to development site
- [ ] SSL certificate provisioned

### GitHub Setup:
- [ ] Added `NETLIFY_AUTH_TOKEN` secret
- [ ] Added `NETLIFY_SITE_ID` secret
- [ ] Added `NETLIFY_DEV_SITE_ID` secret
- [ ] Pushed develop branch to GitHub

### Testing:
- [ ] Can access `dev.goodav.net`
- [ ] Changes to develop branch auto-deploy
- [ ] Production site ready for `goodav.net`

## 🔧 Troubleshooting

### DNS Issues:
- Wait 30 minutes after DNS changes
- Check DNS propagation with online tools
- Verify CNAME record is correct

### Netlify Issues:
- Check build logs in Netlify dashboard
- Ensure branch names match (main/develop)
- Verify site IDs are correct in GitHub secrets

### GitHub Actions Issues:
- Check Actions tab for error messages
- Verify all secrets are set correctly
- Ensure workflow files are in `.github/workflows/`

## 🌟 Benefits of This Setup

- **Safe Testing**: Test changes on `dev.goodav.net` before production
- **Automated Deployments**: Push to develop → auto-deploy to dev site
- **Separate Environments**: Production and dev are completely isolated
- **Easy Rollback**: Can quickly revert changes if needed

---

**🎉 Your dev environment will be ready at `dev.goodav.net` once DNS propagates!**
