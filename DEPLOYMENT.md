# 🚀 Deployment Guide for GoodAV Website

## Quick Start Deployment

### Option A: Netlify (Easiest - Recommended)

1. **Go to Netlify**: https://app.netlify.com/
2. **Sign up/Login** with your GitHub account
3. **Click "Add new site"** → **"Import an existing project"**
4. **Connect to Git**: Choose your `goodav.net-youssouf-ready-to-host` repository
5. **Deploy Settings**:
   - **Branch**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. **Click "Deploy site"**
7. **Add Custom Domain**:
   - Go to Site settings → Domain management
   - Add `goodav.net` as custom domain
   - Follow DNS configuration instructions

### Option B: Vercel (Also Very Easy)

1. **Go to Vercel**: https://vercel.com/
2. **Sign up/Login** with your GitHub account
3. **Click "Add New..."** → **"Project"**
4. **Import Git Repository**: Select `goodav.net-youssouf-ready-to-host`
5. **Configure Project**:
   - Framework Preset: `Vite`
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Click "Deploy"**
7. **Add Custom Domain**:
   - Go to Project Settings → Domains
   - Add `goodav.net`
   - Follow DNS configuration instructions

### Option C: GitHub Pages (Free, but requires more setup)

1. **Go to your repository** on GitHub
2. **Settings** → **Pages**
3. **Source**: Select "GitHub Actions"
4. **Custom Domain**: Add `goodav.net`
5. **DNS Configuration**: Follow GitHub's instructions
6. **Note**: May need additional configuration for SPA routing

## 🔧 Required Secrets (for GitHub Actions)

If you want automatic deployments via GitHub Actions, add these secrets to your repository:

### For Netlify:
- `NETLIFY_AUTH_TOKEN`: Get from Netlify Account → User Settings → Applications
- `NETLIFY_SITE_ID`: Get from your Netlify site settings

### For Vercel:
- `VERCEL_TOKEN`: Get from Vercel Account → Settings → Tokens
- `VERCEL_ORG_ID`: Get from Vercel dashboard
- `VERCEL_PROJECT_ID`: Get from your Vercel project settings

## 📋 Post-Deployment Checklist

- [ ] Site loads correctly at your domain
- [ ] All pages work (Home, About, Services, Contact, etc.)
- [ ] Booking modal functions properly
- [ ] Forms submit correctly
- [ ] Images and assets load
- [ ] Mobile responsiveness works
- [ ] Contact forms are connected (if applicable)

## 🆘 Troubleshooting

### Build Fails:
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18 or higher
- Verify build command: `npm run build`

### Domain Issues:
- Check DNS settings match the provider's instructions
- Allow 24-48 hours for DNS propagation
- Verify domain ownership if required

### SPA Routing Issues:
- Ensure `_redirects` file is in `public/` folder (Netlify)
- Check `vercel.json` configuration (Vercel)
- For GitHub Pages, may need `.nojekyll` file

## 📞 Support

If you encounter issues:
1. Check the deployment platform's build logs
2. Verify all configuration files are correct
3. Test locally with `npm run build && npm run preview`
4. Check GitHub Actions logs if using automated deployment

---

**🎉 Your GoodAV website is ready for deployment!**
