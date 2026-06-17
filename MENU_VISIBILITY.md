# Menu Visibility Control - Documentation

**Last Updated:** June 16, 2026  
**Status:** ✅ Implemented - URL Query Parameters Only

---

## 📋 Overview

The Numerana Calculator now controls menu visibility exclusively through **URL query parameters**. The menu state is **not persisted** to localStorage, ensuring clean session-based control.

---

## 🎯 Implementation

### File Location
```
src/utils/i18n/MenuVisibilityContext.jsx
```

### Context Provider
- **Name:** `MenuVisibilityProvider`
- **Hook:** `useMenuVisibility()`
- **State Variable:** `showMenu` (boolean)

---

## 🔗 URL Query Parameters

### Show Menu (Default)
```
http://localhost:3000/couple
?menu=true                    # Explicitly show
(no parameter)               # Default - show menu
```

### Hide Menu
```
http://localhost:3000/couple?menu=false
```

---

## 🧠 Logic Flow

### Initialization (On Page Load)

```javascript
const [showMenu, setShowMenuState] = useState(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const menuParam = searchParams.get('menu');
  
  // If URL parameter is 'false', hide menu; otherwise show menu
  if (menuParam !== null) {
    return menuParam.toLowerCase() !== 'false';
  }
  
  // Default: show menu if no URL parameter provided
  return true;
});
```

**Decision Tree:**
```
URL Parameter Provided?
├─ Yes: menu=false
│  └─ Return: false (HIDE menu)
├─ Yes: menu=true
│  └─ Return: true (SHOW menu)
├─ Yes: menu=(other value)
│  └─ Return: true (SHOW menu - only 'false' hides)
└─ No (not provided)
   └─ Return: true (SHOW menu - DEFAULT)
```

### State Persistence

**OLD BEHAVIOR (REMOVED):**
- Saved `showMenu` state to localStorage
- Persisted across browser sessions
- Could conflict with URL parameters

**NEW BEHAVIOR (CURRENT):**
- No localStorage saving
- State is ephemeral (per session)
- Controlled entirely by URL parameters
- Clean slate on every new session

---

## 📱 Usage Examples

### Example 1: Show Menu (Default)
```html
<!-- No parameter -->
<a href="/numerana-calculator/couple">Couple Calculator</a>

<!-- Explicit true -->
<a href="/numerana-calculator/couple?menu=true">Couple Calculator</a>
```
**Result:** Menu is displayed ✅

### Example 2: Hide Menu
```html
<!-- Query parameter false -->
<a href="/numerana-calculator/couple?menu=false">Embedded Mode</a>
```
**Result:** Menu is hidden ❌

### Example 3: In an iframe
```html
<!-- Embedded without menu -->
<iframe 
  src="https://hrangel1126.github.io/numerana-calculator/couple?menu=false"
  width="100%"
  height="600"
></iframe>
```
**Result:** Calculator loads without header menu

---

## 🔄 How It Works in Components

### In Pages (e.g., Couple.jsx)
```javascript
import { useMenuVisibility } from '../../utils/i18n/MenuVisibilityContext';

const Couple = () => {
  const { showMenu } = useMenuVisibility();
  
  // showMenu is true/false based on URL parameter
  // Calling setShowMenu() updates state but doesn't persist
  
  return (
    <>
      {showMenu && <HeaderMenu isHomePage={false} />}
      <CoupleComponent />
    </>
  );
};
```

### In HeaderMenu Component
```javascript
const HeaderMenu = ({ isHomePage }) => {
  const { showMenu } = useMenuVisibility();
  
  // Component renders only if showMenu === true
  // Menu visibility is controlled by URL, not user interaction
};
```

---

## ⚙️ Code Changes Made

### MenuVisibilityContext.jsx (v2)

**Removed:**
```javascript
// REMOVED: localStorage saving logic
useEffect(() => {
  localStorage.setItem('showMenu', JSON.stringify(showMenu));
}, [showMenu]);

// REMOVED: localStorage fallback
const savedShowMenu = localStorage.getItem('showMenu');
if (savedShowMenu !== null) {
  return JSON.parse(savedShowMenu);
}
```

**Added:**
```javascript
// NEW: URL-only parameter handling
// Only 'menu=false' hides the menu
return menuParam.toLowerCase() !== 'false';

// NEW: Placeholder useEffect (no localStorage)
useEffect(() => {
  // Currently, we do NOT persist to localStorage
}, []);
```

---

## 🎨 Use Cases

### Use Case 1: Public Calculator
**URL:** `https://hrangel1126.github.io/numerana-calculator/couple`  
**Result:** Menu displayed, user can navigate freely  
**User:** Public visitors

### Use Case 2: Embedded in Blog/Website
**URL:** `https://hrangel1126.github.io/numerana-calculator/couple?menu=false`  
**Result:** Calculator only, no header menu  
**User:** Blog readers, embedded iframe users

### Use Case 3: White-Label Integration
**URL:** `https://example.com/partner-calculator?menu=false`  
**Result:** Calculator without branding navigation  
**User:** Partner websites, affiliate integrations

### Use Case 4: Mobile App WebView
**URL:** `file:///numerana-calculator/couple?menu=false`  
**Result:** Clean calculator interface for mobile apps  
**User:** Mobile app users

---

## 🔒 Security Implications

### No localStorage Attacks
- **Before:** XSS could modify stored menu state
- **After:** Only URL can control menu → URL is under site control

### Session-Based Control
- **Benefit:** Fresh state on every new tab/window
- **Benefit:** No cross-tab state pollution
- **Benefit:** Iframe isolation preserved

### URL-Only Authority
- **Benefit:** Only the hosting site controls menu display
- **Benefit:** Parent site can embed with confidence
- **Benefit:** No client-side state manipulation possible

---

## 📝 Implementation Details

### State Manager
- **Type:** React Context API
- **Provider:** `MenuVisibilityProvider`
- **Hook:** `useMenuVisibility()`
- **Scope:** Application-wide

### Default Behavior
- **Initial State:** `true` (menu shown)
- **On Parameter Change:** Requires page reload to re-evaluate
- **On Tab Open:** Always evaluates current URL

### Performance
- **Lookup Time:** O(1) - single URLSearchParams.get()
- **State Updates:** Only on parameter change
- **No Re-renders:** Unless showMenu actually changes

---

## 🧪 Testing

### Test Case 1: Default Behavior
```bash
# No parameter
curl https://hrangel1126.github.io/numerana-calculator/couple
# Expected: Menu displayed
```

### Test Case 2: Hide Menu
```bash
# With menu=false
curl https://hrangel1126.github.io/numerana-calculator/couple?menu=false
# Expected: Menu hidden
```

### Test Case 3: Explicit Show
```bash
# With menu=true
curl https://hrangel1126.github.io/numerana-calculator/couple?menu=true
# Expected: Menu displayed
```

### Test Case 4: Other Parameters
```bash
# Different parameter
curl https://hrangel1126.github.io/numerana-calculator/couple?menu=maybe
# Expected: Menu displayed (only 'false' hides)
```

### Test Case 5: Multiple Parameters
```bash
# With other query params
curl "https://hrangel1126.github.io/numerana-calculator/couple?menu=false&lang=es"
# Expected: Menu hidden, language Spanish
```

---

## 🔄 Migration from localStorage

### What Changed
| Aspect | Before | After |
|--------|--------|-------|
| Storage | localStorage | None |
| Persistence | Cross-session | Per-session |
| Control | Client-side state | URL parameter |
| Scope | Global | Current page/tab |
| Embeddability | Limited | Full control |

### Why This Change
1. **Cleaner Architecture:** URL is the source of truth
2. **Better Embeddability:** Parent site controls visibility
3. **Security:** No client-side state to compromise
4. **Portability:** Works in iframes, webviews, etc.
5. **Analytics:** Can track embedding patterns via URL

---

## 📚 Related Files

- **Context:** `src/utils/i18n/MenuVisibilityContext.jsx`
- **Pages Using:** 
  - `src/pages/couple/Couple.jsx`
  - `src/pages/single/Single.jsx`
  - `src/pages/singlebasic/SingleBasic.jsx`
  - `src/pages/team/Team.jsx`
- **Component:** `src/components/HeaderMenu/HeaderMenu.jsx`

---

## ✅ Verification Checklist

- ✅ No localStorage.setItem() calls
- ✅ No localStorage.getItem() calls
- ✅ URL parameters parsed correctly
- ✅ Default behavior (show menu) working
- ✅ menu=false hides menu properly
- ✅ Session-based state working
- ✅ Iframe embedding compatible
- ✅ All pages updated

---

**Status:** ✅ Implemented & Tested  
**Last Verified:** June 16, 2026  
**Breaking Changes:** Yes - localStorage no longer used, ensure URLs are updated if needed
