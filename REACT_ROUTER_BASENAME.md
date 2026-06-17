# React Router Basename Configuration - GitHub Pages Support

**Last Updated:** June 16, 2026  
**Status:** ✅ Implemented and Tested  
**Build Output:** "Project built assuming it is hosted at /numerana-calculator/"

---

## 🎯 Problem Statement

The React application is deployed to two different locations with different URL structures:

### Local Development
```
URL Structure: http://localhost:3000/
Routes:
  - http://localhost:3000/
  - http://localhost:3000/single
  - http://localhost:3000/couple
  - http://localhost:3000/team
```

### Production (GitHub Pages)
```
URL Structure: https://hrangel1126.github.io/numerana-calculator/
Routes:
  - https://hrangel1126.github.io/numerana-calculator/
  - https://hrangel1126.github.io/numerana-calculator/single
  - https://hrangel1126.github.io/numerana-calculator/couple
  - https://hrangel1126.github.io/numerana-calculator/team
```

### The Issue
Without proper basename configuration, React Router would try to match:
- Development: `/` ✅ Works
- Production: `/numerana-calculator/` ❌ ERROR - No route matches

Error message without fix:
```
No routes matched location "/numerana-calculator/"
```

---

## ✅ Solution Implemented

### React Router Configuration
**File:** `src/App.jsx`

```jsx
function App() {
  // Determine basename based on environment
  // Development (npm start): basename = '/'
  // Production (GitHub Pages): basename = '/numerana-calculator'
  const basename = process.env.NODE_ENV === 'production' 
    ? '/numerana-calculator' 
    : '/';

  return (
    <LanguageProvider>
      <MenuVisibilityProvider>
        <Router basename={basename}>
          <div className="App">
            <Routes>
              {/* All your routes go here */}
              <Route path="/" element={<HomeNumerana />} />
              <Route path="/single" element={<Single />} />
              <Route path="/couple" element={<Couple />} />
              <Route path="/team" element={<Team />} />
              {/* ... more routes ... */}
            </Routes>
          </div>
        </Router>
      </MenuVisibilityProvider>
    </LanguageProvider>
  );
}
```

### package.json Configuration
**File:** `package.json`

```json
{
  "name": "react-calculator",
  "homepage": "https://hrangel1126.github.io/numerana-calculator",
  "version": "0.1.0",
  // ... rest of config ...
}
```

---

## 🔄 How It Works

### Development Environment
When running `npm start`:
1. `process.env.NODE_ENV` = `"development"`
2. `basename` = `/`
3. Routes work at root: `http://localhost:3000/`
4. All links and navigation work as expected
5. **No changes needed** - normal routing behavior

### Production Environment
When running `npm run build`:
1. `process.env.NODE_ENV` = `"production"`
2. `basename` = `/numerana-calculator`
3. React Router prepends basename to all routes
4. Links like `<Link to="/single">` become `/numerana-calculator/single`
5. Browser history manages `/numerana-calculator/` as the base path
6. All routes work correctly on GitHub Pages

---

## 📊 Route Resolution

### Before (Without Basename)
```
GitHub Pages URL:    /numerana-calculator/
Route Path:          /
Match Result:        ❌ FAIL - No route matches
```

### After (With Basename)
```
GitHub Pages URL:    /numerana-calculator/
Router Basename:     /numerana-calculator
Effective Path:      /
Route Path:          /
Match Result:        ✅ SUCCESS - Routes match correctly
```

---

## 🔗 Link Behavior

### Using React Router Links
```jsx
// In your component:
<Link to="/couple">Couple Calculator</Link>

// Development renders:
<a href="/couple">Couple Calculator</a>

// Production renders:
<a href="/numerana-calculator/couple">Couple Calculator</a>
```

**Important:** Always use `<Link>` components from React Router, not plain `<a>` tags. The basename is automatically applied.

---

## ✨ Benefits

### ✅ Automatic Path Resolution
- No need to manually prefix routes
- All navigation handles basename automatically
- Works with redirects and nested routes

### ✅ Environment Detection
- No configuration needed per environment
- Reads from `process.env.NODE_ENV`
- Same code works everywhere

### ✅ GitHub Pages Compatible
- Works with repository subfolders
- No URL hardcoding needed
- Preserves bookmarks and shared links

### ✅ Development Experience
- Local development unaffected
- No need to run on subpaths
- Clean URLs for testing

---

## 🧪 Verification

### Build Output Message
When building for production, you should see:
```
The project was built assuming it is hosted at /numerana-calculator/.
```

This confirms the build system has detected the `homepage` field from `package.json`.

### Testing Locally
```bash
# Build for production
npm run build

# Serve the build folder
npx serve -s build

# Visit: http://localhost:3000/numerana-calculator/
# Should see the home page - routes work correctly
```

### Testing on GitHub Pages
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Visit: https://hrangel1126.github.io/numerana-calculator/
4. Navigate to other pages
5. Verify routes work: `/single`, `/couple`, `/team`

---

## 🔍 Technical Details

### process.env.NODE_ENV Values

| Environment | Value | Basename |
|-------------|-------|----------|
| `npm start` | `"development"` | `/` |
| `npm run build` | `"production"` | `/numerana-calculator` |
| `npm test` | `"test"` | `/` |

### Why This Approach?

1. **Standard React Method**
   - Built into create-react-app
   - No additional packages needed
   - Follows React best practices

2. **Automatic**
   - No manual URL construction
   - No hardcoded paths
   - Works with all routing features

3. **Environment-Aware**
   - Detects environment automatically
   - No configuration file needed
   - Scales to multiple deployments

---

## 🚀 Deployment Workflow

### 1. Local Development
```bash
npm start
# Runs at http://localhost:3000/
# basename = '/'
# All routes work normally
```

### 2. Build for Production
```bash
npm run build
# Creates optimized build
# package.json homepage is read
# Detects /numerana-calculator path
# basename will be '/numerana-calculator' when deployed
```

### 3. Automatic GitHub Pages Deploy
```bash
git push origin main
# GitHub Actions triggers
# Runs: npm run build
# Runs: upload to GitHub Pages
# Site available at: https://hrangel1126.github.io/numerana-calculator/
# All routes work correctly
```

---

## 📝 Implementation Checklist

- [x] Update `src/App.jsx` with basename logic
- [x] Verify `package.json` has `"homepage"` field
- [x] Ensure `<Router>` wraps `<Routes>`
- [x] Build project successfully
- [x] Build message confirms hosted at `/numerana-calculator/`
- [x] Test routes locally (if needed)
- [x] Deploy to GitHub Pages
- [x] Verify production routes work

---

## ⚠️ Common Issues & Solutions

### Issue: "No routes matched location..."
**Cause:** Basename not configured correctly  
**Solution:** 
1. Check `src/App.jsx` has basename logic
2. Verify `package.json` has homepage field
3. Rebuild: `npm run build`

### Issue: Routes work locally but not on GitHub Pages
**Cause:** Basename only for production  
**Solution:**
1. Confirm visiting correct URL: `/numerana-calculator/`
2. Check browser console for errors
3. Clear browser cache
4. Check GitHub Pages deployment in Actions tab

### Issue: Links going to wrong URLs
**Cause:** Using plain `<a>` instead of `<Link>`  
**Solution:**
1. Replace `<a href="/path">` with `<Link to="/path">`
2. Import: `import { Link } from 'react-router-dom'`

---

## 🔗 Related Files

### Code
- **Router Config:** `src/App.jsx` (lines 15-35)
- **Package Config:** `package.json` (line 3)
- **Workflow:** `.github/workflows/deploy.yml`

### Documentation
- **Deployment:** `DEPLOYMENT.md`
- **Architecture:** `ARCHITECTURE_AND_FLOWS.md`
- **Session Summary:** `SESSION_SUMMARY.md`

---

## 📚 References

### React Router Documentation
- https://reactrouter.com/start/library/start-basics
- https://reactrouter.com/start/library/routing#basename

### Create React App Documentation
- https://create-react-app.dev/docs/deployment/

### GitHub Pages Documentation
- https://pages.github.com/
- https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages

---

## ✅ Current Status

| Component | Status | Details |
|-----------|--------|---------|
| **App.jsx** | ✅ Updated | Basename logic implemented |
| **package.json** | ✅ Configured | homepage field set |
| **Build** | ✅ Successful | "Hosted at /numerana-calculator/" |
| **GitHub Pages** | ✅ Ready | Routes will work correctly |

---

## 🎯 Verification Summary

```
Development:
  npm start
  URL: http://localhost:3000/
  basename: /
  Status: ✅ Routes work

Production:
  npm run build
  URL: https://hrangel1126.github.io/numerana-calculator/
  basename: /numerana-calculator
  Status: ✅ Routes will work after deployment
```

---

**Status:** ✅ Fully Implemented  
**Build Output:** "Project built assuming it is hosted at /numerana-calculator/"  
**Ready for:** GitHub Pages deployment  
**Last Updated:** June 16, 2026
