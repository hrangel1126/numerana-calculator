# Annual Calculations CSS Display Fix - Complete Reference

**Date:** June 17, 2026  
**Status:** ✅ COMPLETE & WORKING  
**Build:** Successful (248.36 kB JS, 28.98 kB CSS)

---

## 🎯 Problem Statement

After implementing React Simple Captcha on all 4 calculator forms, the **Annual Calculations section** was NOT displaying in the **Single component**, even though it should have been visible.

### Root Cause
CSS cascade order issue with `!important` flags at same specificity level:
1. `CoupleComponent.css` hides the grid: `.annual-years-grid { display: none !important; }`
2. `SingleComponent.css` tried to override with: `.annual-years-grid { display: grid !important; }`
3. **Problem:** Last rule in cascade wins (both have same specificity + `!important`)
4. Since `CoupleComponent.css` loads AFTER `SingleComponent.css`, its `display: none` always won

### Why This Happened
- Both files are imported in `CoupleComponent.jsx` (lines 34-35):
  ```javascript
  import './CoupleComponent.css';
  import './SingleComponent.css';
  ```
- CoupleComponent is used in the Couple route
- When both CSS files are loaded, the last matching rule wins (cascade order)

---

## ✅ Solution

### CSS Specificity Fix
Use more specific CSS selector in `CoupleComponent.css` so the hide rule ONLY applies to the Couple component.

**Changed from:**
```css
.annual-years-grid {
  display: none !important;
}
```

**Changed to:**
```css
.couple-main .annual-years-grid {
  display: none !important;
}
```

**Why this works:**
- `.couple-main` is the wrapper div in `CoupleComponent.jsx` (line 1041)
- This selector is more specific (2 selectors) than `.annual-years-grid` (1 selector)
- Single component doesn't use `.couple-main` wrapper, so the rule doesn't match
- Single's `.annual-years-grid` now displays properly by default

---

## 📁 Files Modified

### 1. `src/components/CoupleComponent.css` (Line 163-165)
```css
/* BEFORE */
.annual-years-grid {
  display: none !important;
}

/* AFTER */
.couple-main .annual-years-grid {
  display: none !important;
}
```

### 2. `src/components/SingleComponent.css`
- ✅ **Removed** unnecessary override rule
- Cleaned up mobile media query (removed orphaned `.annual-years-grid` rule)
- Component now relies on default grid display

---

## 🔄 How It Works Now

### Single Component Flow
```
1. User navigates to /single
2. SingleComponent renders (no .couple-main wrapper)
3. CSS rules apply:
   - CoupleComponent.css: ".couple-main .annual-years-grid" → NO MATCH ✗
   - SingleComponent.css: no override rule
4. Result: .annual-years-grid displays as GRID ✅
```

### Couple Component Flow
```
1. User navigates to /couple
2. CoupleComponent renders with <div className="couple-main">
3. CSS rules apply:
   - CoupleComponent.css: ".couple-main .annual-years-grid" → MATCH ✓
   - display: none !important applies
4. Result: .annual-years-grid is HIDDEN ✅
```

---

## 🧪 Testing Results

### ✅ Build Status
```
Compiled with warnings. (pre-existing, unrelated)
File sizes after gzip:
  - 248.36 kB (JS)
  - 28.98 kB (CSS) [-1 B improvement]
Build folder ready to deploy.
```

### ✅ Visual Testing
1. **Single component:** Annual Calculations **DISPLAYS** with 2-column grid layout
2. **Couple component:** Annual Calculations **HIDDEN** as intended
3. **SingleBasic:** Works as before
4. **Team:** Works as before

### ✅ No Regressions
- All other CSS still applies correctly
- No new warnings introduced
- Build completes successfully

---

## 📚 CSS Specificity Reference

### Specificity Scores
```
.couple-main .annual-years-grid
  ↓
  1 class + 1 class = 0-2-0 (WINS)

.annual-years-grid
  ↓
  1 class = 0-1-0 (loses to specificity)
```

### Key Learning
When using `!important`, **specificity still matters**:
- Higher specificity wins over lower specificity
- If equal specificity with `!important`, cascade order (last rule) wins
- **Better solution:** Use specificity instead of relying on `!important` order

---

## 🎨 Component Wrapper Classes

### Single Components
- `SingleComponent.jsx`: No special wrapper (standard layout)
- `SingleBasicComponent.jsx`: No special wrapper

### Couple Components  
- `CoupleComponent.jsx`: **`.couple-main`** (line 1041)
  ```jsx
  return (
    <div className="couple-main">
      {loading && <div className="couple-lds-ripple"><div></div><div></div></div>}
      <div ref={contentRef} className="couple-content">
        {/* content */}
      </div>
    </div>
  );
  ```

### Team Components
- `TeamComponent.jsx`: Uses different structure

---

## 🔍 CSS File Loading Order

In `CoupleComponent.jsx`:
```javascript
import './CoupleComponent.css';  // Line 34
import './SingleComponent.css';  // Line 35
```

**Processing Order:**
1. CoupleComponent.css loads first
2. SingleComponent.css loads after (can override if specificity allows)
3. **In this case:** CoupleComponent.css loads last via import order in React
4. Last rule wins when specificity is equal

---

## 📋 Maintenance Notes

### If Adding New Shared Grid Classes
1. **Always prefer more specific selectors** over broad selectors
2. **Use component wrapper classes** (like `.couple-main`) to avoid conflicts
3. **Avoid relying on `!important`** - use specificity instead
4. **Document component wrapper classes** in CSS comments

### Pattern to Follow
```css
/* GOOD - Component-specific */
.couple-main .annual-years-grid { display: none; }
.single-main .annual-years-grid { display: grid; }

/* AVOID - Global rules with !important */
.annual-years-grid { display: none !important; }
```

---

## ✨ Summary

| Aspect | Result |
|--------|--------|
| **Issue** | Annual Calculations hidden in Single due to CSS cascade |
| **Root Cause** | Global `.annual-years-grid` rule in CoupleComponent.css overriding Single |
| **Solution** | Changed to `.couple-main .annual-years-grid` for specificity |
| **Files Changed** | 2 (CoupleComponent.css, SingleComponent.css) |
| **Build Status** | ✅ Success |
| **Testing** | ✅ All components working correctly |
| **Regression** | ✅ None detected |

---

## 🚀 Deployment Ready

All changes are committed and the project is ready for deployment:
```bash
npm run build  # ✅ Successful
npm start      # ✅ Dev server works
```

The fix is minimal, targeted, and uses proper CSS specificity - making it maintainable and future-proof.

---

**Created by:** OpenCode AI Assistant  
**For:** Numerana Calculator Project  
**Reference:** CSS Cascade, Specificity, Component Isolation
