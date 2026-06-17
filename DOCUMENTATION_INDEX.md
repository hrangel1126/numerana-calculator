# Numerana Calculator - Complete Documentation Index

**Last Updated:** June 16, 2026  
**Total Documents:** 18 files  
**Status:** ✅ All Current

---

## 📑 Documentation Structure

### Session & Progress Documentation
1. **SESSION_SUMMARY.md** ⭐ START HERE
   - Latest session overview (June 16, 2026)
   - All tasks completed
   - Build status and final verification
   - **Read Time:** 10 minutes

2. **DEPLOYMENT.md** - CI/CD & GitHub Pages
   - GitHub Actions workflow setup
   - Deployment process and URLs
   - Troubleshooting guide
   - **Read Time:** 8 minutes

3. **MENU_VISIBILITY.md** - URL Query Parameters
   - Menu control via URL (no localStorage)
   - Implementation details
   - Usage examples and security
   - **Read Time:** 7 minutes

### Architecture & Design
4. **ARCHITECTURE_AND_FLOWS.md**
   - System architecture overview
   - Component relationships
   - Data flow diagrams
   - Page routing structure
   - **Read Time:** 15 minutes

5. **COMPONENTS_REFERENCE.md**
   - All component documentation
   - Props, state, and methods
   - Component hierarchy
   - Integration points
   - **Read Time:** 20 minutes

6. **CODEBASE_OVERVIEW.md**
   - Directory structure
   - File organization
   - Key modules explained
   - Import paths
   - **Read Time:** 12 minutes

### Technical Deep Dives
7. **CALCULATION_ENGINE.md**
   - Numerology calculation logic
   - Pinaculo computation
   - Year calculations
   - Master numbers
   - **Read Time:** 18 minutes

8. **ANNUAL_CALCULATION_ANALYSIS.md**
   - Annual/yearly calculations
   - Year data structure
   - Sweep year analysis
   - Data properties reference
   - **Read Time:** 12 minutes

9. **YEAR_DATA_CODE_SNIPPETS.md**
   - Code examples for year data
   - Function calls and returns
   - Data structure samples
   - Integration patterns
   - **Read Time:** 8 minutes

### Quick References
10. **DEVELOPER_QUICK_REFERENCE.md**
    - Common tasks checklists
    - Code snippets library
    - Keyboard shortcuts
    - Command reference
    - **Read Time:** 10 minutes

11. **QUICK_REFERENCE_CARD.md**
    - One-page visual reference
    - File locations
    - Key functions
    - Common patterns
    - **Read Time:** 5 minutes

12. **INDEX.md** (Old)
    - Previous documentation index
    - Kept for historical reference
    - **Status:** Superseded by this file

### Session-Specific Documentation
13. **AI_PROGRESS.md**
    - Progress tracking (Session 1)
    - Initial setup and improvements
    - **Status:** Historical

14. **AI_QUICK_REFERENCE.md**
    - Quick reference (Session 1)
    - Initial discoveries
    - **Status:** Historical

15. **AI_COUPLE_CALCULATOR_UPDATE.md**
    - Couple component first pass
    - Form layout and structure
    - **Status:** Partial - see SESSION_SUMMARY.md for latest

16. **AI_COUPLE_IMPROVEMENTS_V2.md**
    - Couple component improvements v2
    - Results header updates
    - **Status:** Partial - see SESSION_SUMMARY.md for latest

17. **AI_TEAM_IMPROVEMENTS_V1.md**
    - Team component improvements
    - Layout and styling
    - **Status:** Historical

18. **ANALYSIS_SUMMARY.md**
    - Quick analysis summary
    - Annual calculation focus
    - **Status:** Partial

---

## 🚀 Where to Start

### For New Developers
1. Read: **SESSION_SUMMARY.md** (10 min)
2. Read: **CODEBASE_OVERVIEW.md** (12 min)
3. Read: **ARCHITECTURE_AND_FLOWS.md** (15 min)
4. Reference: **COMPONENTS_REFERENCE.md** (as needed)

### For Deployment/DevOps
1. Read: **DEPLOYMENT.md** (8 min)
2. Check: `.github/workflows/deploy.yml` file
3. Verify: GitHub Pages settings

### For Menu/Feature Work
1. Read: **MENU_VISIBILITY.md** (7 min)
2. Check: `src/utils/i18n/MenuVisibilityContext.jsx`
3. Update: Component imports using `useMenuVisibility`

### For Calculation Logic
1. Read: **CALCULATION_ENGINE.md** (18 min)
2. Read: **ANNUAL_CALCULATION_ANALYSIS.md** (12 min)
3. Reference: **YEAR_DATA_CODE_SNIPPETS.md** (as needed)

### For Quick Lookups
- Use: **QUICK_REFERENCE_CARD.md** (1 page)
- Use: **DEVELOPER_QUICK_REFERENCE.md** (10 min)

---

## 📊 Document Categories

### 📋 Task & Progress
| Document | Purpose | Status |
|----------|---------|--------|
| SESSION_SUMMARY.md | Latest session overview | ✅ Current |
| AI_PROGRESS.md | Historical progress | 📚 Archive |
| AI_COUPLE_CALCULATOR_UPDATE.md | Couple v1 updates | 📚 Archive |
| AI_COUPLE_IMPROVEMENTS_V2.md | Couple v2 updates | 📚 Archive |
| AI_TEAM_IMPROVEMENTS_V1.md | Team updates | 📚 Archive |

### 🏗️ Architecture & Design
| Document | Purpose | Status |
|----------|---------|--------|
| ARCHITECTURE_AND_FLOWS.md | System architecture | ✅ Current |
| COMPONENTS_REFERENCE.md | Component docs | ✅ Current |
| CODEBASE_OVERVIEW.md | Code structure | ✅ Current |
| CALCULATION_ENGINE.md | Numerology logic | ✅ Current |

### 📖 Reference & Quick Start
| Document | Purpose | Status |
|----------|---------|--------|
| DEVELOPER_QUICK_REFERENCE.md | Dev reference | ✅ Current |
| QUICK_REFERENCE_CARD.md | One-page summary | ✅ Current |
| INDEX.md | Old index | 📚 Archive |
| ANALYSIS_SUMMARY.md | Quick analysis | ✅ Current |

### 🔧 Technical & Features
| Document | Purpose | Status |
|----------|---------|--------|
| DEPLOYMENT.md | CI/CD & GitHub Pages | ✅ Current |
| MENU_VISIBILITY.md | Menu control system | ✅ Current |
| ANNUAL_CALCULATION_ANALYSIS.md | Year calculations | ✅ Current |
| YEAR_DATA_CODE_SNIPPETS.md | Code examples | ✅ Current |
| AI_QUICK_REFERENCE.md | Initial quick ref | 📚 Archive |

---

## 🔍 Finding Information

### By Topic
```
Couple Calculator       → COMPONENTS_REFERENCE.md, SESSION_SUMMARY.md
Deployment/DevOps      → DEPLOYMENT.md, .github/workflows/deploy.yml
Menu System            → MENU_VISIBILITY.md, MenuVisibilityContext.jsx
Calculations           → CALCULATION_ENGINE.md, ANNUAL_CALCULATION_ANALYSIS.md
Architecture           → ARCHITECTURE_AND_FLOWS.md, CODEBASE_OVERVIEW.md
Year/Annual Section    → ANNUAL_CALCULATION_ANALYSIS.md, YEAR_DATA_CODE_SNIPPETS.md
```

### By File Location
```
Config Files:     .github/workflows/deploy.yml, package.json
Components:       src/components/*.jsx, documentation → COMPONENTS_REFERENCE.md
Utils:            src/utils/*.js, documentation → CALCULATION_ENGINE.md
Pages:            src/pages/**/*.jsx, documentation → ARCHITECTURE_AND_FLOWS.md
Context:          src/utils/i18n/, documentation → MENU_VISIBILITY.md
```

### By Audience
```
Product Managers   → SESSION_SUMMARY.md, ARCHITECTURE_AND_FLOWS.md
Developers         → DEVELOPER_QUICK_REFERENCE.md, COMPONENTS_REFERENCE.md
DevOps/Deployment  → DEPLOYMENT.md
Frontend Devs      → COMPONENTS_REFERENCE.md, CODEBASE_OVERVIEW.md
Backend/API Devs   → CALCULATION_ENGINE.md
QA/Testers         → SESSION_SUMMARY.md, QUICK_REFERENCE_CARD.md
```

---

## 🔄 Latest Session Summary (June 16, 2026)

### Completed Tasks
- ✅ Fixed JSX syntax error in CoupleComponent
- ✅ Date formatting with moment.js
- ✅ Loading spinner positioning & visibility
- ✅ Pinaculo titles repositioned and styled
- ✅ Annual section year labels repositioned
- ✅ Fixed missing Person 2 year labels
- ✅ Hidden old annual-years-grid (code preserved)
- ✅ Removed localStorage for showMenu
- ✅ Created GitHub Actions workflow
- ✅ Updated all documentation

### Build Status
- ✅ Compilation successful
- 📦 JS: 195.72 kB (gzipped)
- 📦 CSS: 28.62 kB (gzipped)
- ⚠️ 76 ESLint warnings (non-critical)

### Files Modified
- `src/components/CoupleComponent.jsx`
- `src/components/CoupleComponent.css`
- `src/utils/i18n/MenuVisibilityContext.jsx`
- `.github/workflows/deploy.yml` (NEW)

---

## 📝 Document Maintenance

### How to Update
1. Find document in this index
2. Check status (✅ Current vs 📚 Archive)
3. Update relevant file
4. Update SESSION_SUMMARY.md with changes
5. Regenerate this index (if new docs added)

### When to Create New Documents
- Major feature added
- Architecture changes
- New deployment method
- Complex calculations added
- Integration added

### Archive Strategy
- Keep session docs for 2 releases
- Move to `docs/archive/` after
- Maintain link in index
- Update "Status" field to 📚 Archive

---

## 🎯 Current Focus

### Pending Items
- ⏳ "Sweeping" concept clarification for year filtering
- ⏳ Visual testing of UI layouts
- ⏳ Mobile responsive testing
- ⏳ Third pinaculo population verification

### In Progress
- Working on year calculation sweep year concept

### Ready for Testing
- Couple form layout (2-col)
- Results header (text + pinaculo)
- Relationship structure (3 pinaculos)
- Annual section (year labels on top)

---

## 📞 Quick Links

### Core Documentation
- **Build & Deploy:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Menu Control:** [MENU_VISIBILITY.md](./MENU_VISIBILITY.md)
- **Architecture:** [ARCHITECTURE_AND_FLOWS.md](./ARCHITECTURE_AND_FLOWS.md)
- **Components:** [COMPONENTS_REFERENCE.md](./COMPONENTS_REFERENCE.md)

### Code Files
- **GitHub Actions:** [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)
- **Menu Context:** [src/utils/i18n/MenuVisibilityContext.jsx](./src/utils/i18n/MenuVisibilityContext.jsx)
- **Couple Component:** [src/components/CoupleComponent.jsx](./src/components/CoupleComponent.jsx)

### Latest Updates
- **Session:** [SESSION_SUMMARY.md](./SESSION_SUMMARY.md)
- **Calculations:** [CALCULATION_ENGINE.md](./CALCULATION_ENGINE.md)

---

**Total Documentation:** 18 comprehensive guides  
**Last Updated:** June 16, 2026  
**Version:** 2.0 (Complete Index)  
**Status:** ✅ All Current & Ready to Use
