# Query Parameters Guide - Numerana Calculator

**Last Updated:** June 16, 2026  
**Status:** ✅ Fully Documented

---

## 📋 Overview

The Numerana Calculator supports URL query parameters to control application behavior without changing the code.

---

## 🎯 Available Query Parameters

### Menu Control (`menu`)

Controls visibility of the header navigation menu.

**Parameter:** `menu`  
**Values:** `true`, `false`  
**Default:** `true` (menu shown)  
**Applies to:** All pages

#### Usage Examples

**Show menu (default):**
```
https://hrangel1126.github.io/numerana-calculator/singlebasic
https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=true
```

**Hide menu:**
```
https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=false
```

---

## 🔗 Complete URL Examples

### SingleBasic Calculator

```
# Default (menu shown)
https://hrangel1126.github.io/numerana-calculator/singlebasic

# Without menu
https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=false

# Explicit show menu
https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=true
```

### Single Calculator

```
# Default
https://hrangel1126.github.io/numerana-calculator/single

# Without menu
https://hrangel1126.github.io/numerana-calculator/single?menu=false
```

### Couple Calculator

```
# Default
https://hrangel1126.github.io/numerana-calculator/couple

# Without menu
https://hrangel1126.github.io/numerana-calculator/couple?menu=false
```

### Team Calculator

```
# Default
https://hrangel1126.github.io/numerana-calculator/team

# Without menu
https://hrangel1126.github.io/numerana-calculator/team?menu=false
```

---

## 🌐 Use Cases

### 1. Embedding in Website

Hide the menu when embedding in an iframe:

```html
<iframe 
  src="https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=false"
  width="100%"
  height="800px"
  frameborder="0"
></iframe>
```

### 2. Partner Integration

Create branded links without navigation:

```
https://hrangel1126.github.io/numerana-calculator/couple?menu=false
```

### 3. Mobile App WebView

Load calculator in mobile app without browser chrome:

```
https://hrangel1126.github.io/numerana-calculator/team?menu=false
```

### 4. Marketing Links

Share direct links to specific calculators:

```
https://hrangel1126.github.io/numerana-calculator/single
https://hrangel1126.github.io/numerana-calculator/couple
```

---

## 🔒 Security & Privacy

### URL-Based Control

- **No localStorage used** - Menu state is ephemeral per session
- **No cookies** - No persistent tracking
- **Parent controls child** - Iframe parent determines visibility
- **Clean URLs** - No sensitive data in parameters

### Data Flow

```
User visits URL
  ↓
URL parsed by MenuVisibilityContext
  ↓
Menu shown/hidden based on parameter
  ↓
Session-based (no persistence)
```

---

## 🛠️ Technical Implementation

### How It Works

1. **URL is read:** `MenuVisibilityContext` extracts `?menu=` parameter
2. **Value is parsed:** String `"true"/"false"` converted to boolean
3. **State is set:** `showMenu` state reflects parameter
4. **Menu renders:** Based on `showMenu` value
5. **No localStorage:** State only exists for this session

### Code Location

- **Context:** `src/utils/i18n/MenuVisibilityContext.jsx`
- **Hook:** `useMenuVisibility()` - Returns `{showMenu, setShowMenu}`
- **Usage:** Any component can import and use the hook

### Example Component Usage

```jsx
import { useMenuVisibility } from './utils/i18n/MenuVisibilityContext';

function Header() {
  const { showMenu } = useMenuVisibility();
  
  return showMenu ? (
    <nav>Navigation Menu</nav>
  ) : null;
}
```

---

## 📊 Parameter Summary Table

| Parameter | Values | Default | Scope | Example |
|-----------|--------|---------|-------|---------|
| `menu` | `true`, `false` | `true` | All pages | `?menu=false` |

---

## 🔄 Multiple Parameters

Currently only `menu` parameter is documented, but the URL structure supports adding more parameters in the future:

```
https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=false&param2=value
```

---

## 💡 Best Practices

### ✅ Do

- Use lowercase values: `?menu=false` ✅
- Encode special characters: `?menu=false&lang=es` ✅
- Share clean URLs for public links ✅
- Use parameters for embedding ✅

### ❌ Don't

- Use uppercase: `?menu=False` ❌
- Hardcode `?p=` parameter (internal only) ❌
- Rely on localStorage for persistence ❌
- Share URLs with `?p=` parameter ❌

---

## 🧪 Testing Parameters

### Local Development

```bash
npm start
# Visit: http://localhost:3000/singlebasic?menu=false
```

### Production Testing

```
https://hrangel1126.github.io/numerana-calculator/singlebasic?menu=false
```

### Expected Behavior

| URL | Expected | Actual |
|-----|----------|--------|
| `/singlebasic` | Menu shown | ✅ Menu shows |
| `/singlebasic?menu=true` | Menu shown | ✅ Menu shows |
| `/singlebasic?menu=false` | Menu hidden | ✅ Menu hidden |

---

## 📚 Related Documentation

- **Menu System:** [MENU_VISIBILITY.md](./MENU_VISIBILITY.md)
- **Routing Details:** [GITHUB_PAGES_404_ROUTING.md](./GITHUB_PAGES_404_ROUTING.md)
- **Deployment:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Session Summary:** [SESSION_SUMMARY.md](./SESSION_SUMMARY.md)

---

## 🔗 Internal Query Parameters

### `?p=` (Internal Redirect - Not for Users)

Used internally by `public/404.html` for GitHub Pages routing.

- **Scope:** GitHub Pages only
- **Cleaned automatically:** Removed before React Router handles navigation
- **User visible:** NO - automatically cleaned up
- **Do NOT use manually:** Parameter is internal only

**Example (how it works behind scenes):**
```
User visits: /singlebasic
GitHub 404: Serves 404.html
404.html: Redirects to /?p=/singlebasic
index.html: Extracts path and navigates
Final URL: /singlebasic (p= parameter removed)
```

---

## ✅ Verification Checklist

- [x] Menu parameter works locally
- [x] Menu parameter works on production
- [x] No localStorage persistence
- [x] URL-based control only
- [x] Works in iframes
- [x] Documentation complete
- [x] Examples provided
- [x] Security verified

---

**Status:** ✅ **COMPLETE**

All query parameters are documented and tested.

---

**Last Updated:** June 16, 2026
