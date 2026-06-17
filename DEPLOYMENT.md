# Numerana Calculator - Deployment & CI/CD Guide

**Last Updated:** June 16, 2026  
**Status:** ✅ GitHub Actions Workflow Active

---

## 📋 Overview

The Numerana Calculator uses **GitHub Actions** for automated deployment to GitHub Pages. The workflow automatically builds and deploys the React application whenever code is pushed to the `main` branch.

---

## 🚀 GitHub Actions Workflow

### File Location
```
.github/workflows/deploy.yml
```

### Workflow Name
**"Deploy to GitHub Pages"**

### Trigger Event
Automatically triggers on push to `main` branch:
```yaml
on:
  push:
    branches:
      - main
```

---

## 🔄 Workflow Pipeline

### Stage 1: Build Job
**Runs on:** Ubuntu Latest  
**Duration:** ~18-30 seconds

#### Steps:
1. **Checkout** (`actions/checkout@v4`)
   - Clones the repository
   
2. **Setup Node** (`actions/setup-node@v4`)
   - Installs Node.js v20
   
3. **Install Dependencies**
   - Command: `npm install`
   - Installs all project dependencies
   
4. **Build React App**
   - Command: `npm run build`
   - Creates optimized production build in `./build` folder
   
5. **Upload Artifact** (`actions/upload-pages-artifact@v3`)
   - Uploads `./build` folder to GitHub Pages artifact storage

### Stage 2: Deploy Job
**Runs on:** Ubuntu Latest  
**Duration:** ~5-11 seconds  
**Dependency:** Waits for build job to complete

#### Steps:
1. **Deploy to GitHub Pages** (`actions/deploy-pages@v5`)
   - Deploys the artifact from build job
   - Publishes to GitHub Pages
   - Returns deployment URL

---

## 🌐 Deployment URL

```
https://hrangel1126.github.io/numerana-calculator/
```

This URL is automatically set in the `environment.url` after successful deployment.

---

## 🔐 Permissions

The workflow requires specific GitHub token permissions:

```yaml
permissions:
  contents: read          # Read repository contents
  pages: write            # Write to GitHub Pages
  id-token: write         # Write OIDC token (for deployments)
```

These are automatically granted by GitHub Actions when the workflow runs.

---

## ✅ Build Output

### Build Configuration
- **Entry Point:** `src/App.jsx`
- **Output Folder:** `build/`
- **Build Tool:** React Scripts (via `npm run build`)
- **Optimizations:**
  - Code splitting
  - CSS minification
  - JS minification
  - Asset hashing

### Output File Sizes (from latest build)
- JavaScript: 195.72 kB (gzipped)
- CSS: 28.62 kB (gzipped)
- Total: ~224 kB

---

## 🐛 Troubleshooting

### Workflow Fails
1. **Check Node.js version compatibility**
   - Current: Node 20
   - Ensure `package.json` dependencies support Node 20

2. **Build fails**
   - Run `npm run build` locally to reproduce
   - Check for TypeScript/ESLint errors
   - Review build output in GitHub Actions logs

3. **Deployment fails**
   - Verify GitHub Pages is enabled in repository settings
   - Check branch protection rules don't block deployments
   - Verify `main` branch is the default branch

### Check Workflow Logs
1. Go to Repository → Actions
2. Find the workflow run
3. Click on job name to see detailed logs
4. Search for error messages

---

## 🔄 How to Trigger a Deployment

### Method 1: Push to Main Branch (Automatic)
```bash
git add .
git commit -m "Your changes"
git push origin main
```
This automatically triggers the workflow.

### Method 2: Manual Trigger (if enabled)
If manual trigger is added to workflow:
1. Go to Repository → Actions
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"
4. Select branch (main)
5. Click "Run workflow"

---

## 📊 Workflow Status

### Check Deployment Status
1. **In GitHub:**
   - Repository → Actions → "Deploy to GitHub Pages"
   - Yellow = Running
   - Green = Success ✅
   - Red = Failed ❌

2. **Check Live Site:**
   - Visit `https://hrangel1126.github.io/numerana-calculator/`
   - Browser console for any errors

3. **Check Page URL:**
   - In deployment job output, look for deployment URL
   - Usually appears in step "Deploy to GitHub Pages"

---

## 🧪 Testing Deployments Locally

### Build and Test Locally
```bash
npm run build
npx serve -s build
```

This serves the production build on `http://localhost:3000` for local testing.

### Verify Built Files
```bash
ls -la build/
# Check for:
# - index.html
# - static/ folder
# - favicon.ico
# - manifest.json
```

---

## 📝 Environment Setup

### Repository Settings Required
1. **GitHub Pages**
   - Source: Deploy from a branch
   - Branch: `gh-pages` (automatically created by workflow)
   - Folder: `/ (root)`

2. **Branch Protection (Optional)**
   - Ensure `main` branch allows deployments
   - Set required status checks if needed

3. **Action Permissions**
   - Allow read/write access to GitHub Pages
   - Allow OIDC token generation

---

## 🔄 Previous Successful Deployment

**Date:** 2 weeks ago (June 2, 2026)  
**Status:** ✅ Succeeded in 18 seconds  
**Build Step:** Completed successfully  
**Deploy Step:** Completed successfully  
**Artifact Size:** 3.26 MB (including all assets)  
**Deployment URL:** https://hrangel1126.github.io/numerana-calculator/

---

## 📦 Version Information

| Component | Version |
|-----------|---------|
| Node.js | 20 |
| actions/checkout | v4 |
| actions/setup-node | v4 |
| actions/upload-pages-artifact | v3 |
| actions/deploy-pages | v5 |
| React | Latest (from package.json) |
| React Scripts | Latest (from package.json) |

---

## 🎯 Next Steps

1. **Verify Workflow is Active**
   - Go to `.github/workflows/deploy.yml`
   - Ensure file exists and is properly formatted

2. **Push a Test Commit**
   - Make a minor change
   - Push to `main`
   - Monitor Actions tab

3. **Check Live Deployment**
   - Visit `https://hrangel1126.github.io/numerana-calculator/`
   - Verify changes are live

4. **Monitor Future Deployments**
   - Subscribe to GitHub Actions emails
   - Check Actions tab after each push

---

## 📚 Related Documentation

- **Session Summary:** `SESSION_SUMMARY.md`
- **Architecture:** `ARCHITECTURE_AND_FLOWS.md`
- **Components:** `COMPONENTS_REFERENCE.md`
- **Menu Visibility:** See `MenuVisibilityContext.jsx` (URL query params only)

---

**Status:** ✅ Ready for Deployment  
**Last Verified:** June 16, 2026
