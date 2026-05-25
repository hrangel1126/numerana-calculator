# Numerana Calculator - Developer Quick Reference

## Quick Navigation

- **Project Overview:** See `CODEBASE_OVERVIEW.md`
- **Architecture & Flows:** See `ARCHITECTURE_AND_FLOWS.md`
- **Component Details:** See `COMPONENTS_REFERENCE.md`
- **Calculation Engine:** See `CALCULATION_ENGINE.md`

---

## File Locations Quick Guide

### Key Entry Points
```
src/
├── App.jsx                  ← React root, routing setup
├── index.js                 ← React DOM mount point
└── pages/
    ├── home/Home.jsx        ← Landing page
    ├── single/Single.jsx    ← Full calculator
    ├── singlebasic/SingleBasic.jsx  ← Basic calculator
    ├── couple/Couple.jsx    ← Couple calculator
    └── team/Team.jsx        ← Team calculator
```

### Core Logic Components
```
src/components/
├── SingleComponent.jsx      (324 lines) ← Main single logic
├── CoupleComponent.jsx      (1,171 lines) ← Main couple logic
├── SingleBasicComponent.jsx (413 lines) ← Simplified logic
└── TeamComponent/
    └── TeamComponent.jsx    (591 lines) ← Team logic
```

### Calculation Engine
```
src/utils/
├── calculosUtils.js         (1,297 lines) ← ALL calculations here
└── i18n/
    └── LanguageContext.jsx  ← Language state
```

### UI Components
```
src/components/
├── common/
│   ├── NumerologyInputFormComponent.jsx    ← Input form
│   ├── ResultsHeaderComponent.jsx          ← Results header
│   ├── PinaculoChartComponent.jsx          ← Pinaculo wrapper
│   ├── YearChartComponent.jsx              ← Year chart wrapper
│   ├── LoadingComponent.jsx                ← Spinner
│   ├── DesktopMonthGridComponent.jsx       ← Desktop months
│   ├── DesktopDayGridComponent.jsx         ← Desktop days
│   ├── MobileYearSliderComponent.jsx       ← Mobile year selector
│   └── MobileMonthDayViewComponent.jsx     ← Mobile month/day
├── PinaculoSvg.jsx          ← Pinaculo diagram
├── YearSvg.jsx              ← Year chart
├── MonthVisualizer.jsx       ← Month display
├── DayTable.jsx             ← Day table
├── HeaderMenu/HeaderMenu.jsx ← Top navigation
└── couple/                   ← Couple-specific components
```

---

## Common Coding Tasks

### Task 1: Add a New Form Field

**Step 1:** Add state in component
```javascript
const [newField, setNewField] = useState("");
```

**Step 2:** Add input in NumerologyInputFormComponent
```jsx
<input 
  type="text"
  value={newField}
  onChange={(e) => setNewField(e.target.value)}
  placeholder="Enter value"
/>
```

**Step 3:** Add validation in handleSubmit
```javascript
if (!newField) {
  alert(t('error.fieldRequired'));
  return;
}
```

---

### Task 2: Fix a Calculation

**Location:** `src/utils/calculosUtils.js`

**Steps:**
1. Find the relevant function (GetFirstLine, GetYear, GetMonth, or GetDays)
2. Trace through the calculation logic
3. **CRITICAL:** Check date format being used (DD/MM vs MM/DD)
4. Test with example from CALCULATION_ENGINE.md
5. Update test cases if present

**Example Bug Fix:**
```javascript
// Before (WRONG):
P3 = sum(P1, P2);  // Forgot to handle master numbers

// After (CORRECT):
P3 = sum(P1, P2);  // sum() handles masters automatically
// Or if custom logic needed:
P3 = checkmaster(sum(P1, P2));
```

---

### Task 3: Modify SVG Diagram

**Files:**
- `src/components/PinaculoSvg.jsx` - Single version
- `src/components/couple/PinaculoSvg.jsx` - Couple version (80% scaled)

**Key Props:**
```javascript
rpinaculo: {
  A, B, C, D, P1, P2, P3, P4, P5, N1, N2, N3, N4, top, bottom
}
```

**Common Changes:**
```javascript
// Change node size
<circle r="20" />  // Adjust from default

// Change text color
<text fill="#5b356c">  // Change from default color

// Add new node
<g id="new-node">
  <circle cx={x} cy={y} r="20" />
  <text>{value}</text>
</g>

// Adjust positioning
const cx = 300 + (index * 50);  // Modify calculation
```

---

### Task 4: Add Translation

**Files:**
- `src/assets/i18n/en.json` - English
- `src/assets/i18n/es.json` - Spanish

**Steps:**
1. Add key to both JSON files with dot notation
2. Use in component with t() function

**Example:**
```javascript
// In en.json:
{ "home": { "title": "Welcome" } }

// In es.json:
{ "home": { "titulo": "Bienvenido" } }

// In component:
const { t } = useContext(LanguageContext);
return <h1>{t('home.title')}</h1>;
```

---

### Task 5: Make Component Responsive

**Key Breakpoint:** 600px width

**Pattern:**
```javascript
const [getScreenWidth, setGetScreenWidth] = useState(window.innerWidth > 600);

useEffect(() => {
  const handleResize = () => {
    setGetScreenWidth(window.innerWidth > 600);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// In render:
{getScreenWidth && <DesktopComponent />}
{!getScreenWidth && <MobileComponent />}
```

---

### Task 6: Export to PDF

**Pattern Used:**
```javascript
import html2pdf from 'html2pdf.js';

const handleExport = () => {
  const element = document.getElementById('results-container');
  const options = {
    margin: 10,
    filename: `Numerology_${nombre}_${birthdate}.pdf`,
    image: { type: 'png', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  html2pdf().set(options).from(element).save();
};
```

---

## Date Format Cheat Sheet

| Function | Format | Example | Month First? |
|----------|--------|---------|--------------|
| GetFirstLine | DD/MM/YYYY | 25/05/1990 | ❌ No |
| Centraline | DD/MM/YYYY | 25/05/1990 | ❌ No |
| GetDays | DD/MM/YYYY | 25/05/1990 | ❌ No |
| GetYear | MM/DD/YYYY | 05/25/1990 | ✅ Yes |
| GetMonth | MM/DD/YYYY | 05/25/1990 | ✅ Yes |

**⚠️ CRITICAL:** Double-check date format when calling calculations!

---

## Common Code Patterns

### Pattern 1: Form Submission
```javascript
const handleSubmit = async () => {
  // Validation
  if (!nombre) {
    alert(t('error.nameRequired'));
    return;
  }
  
  // Loading state
  setLoading(true);
  
  try {
    // Calculate
    const pinaculo = calculosUtils.GetFirstLine(birthdate);
    
    // Update state
    setRpinaculo(pinaculo[0]);
    
    // Show results
    setResultados(true);
  } catch (error) {
    console.error("Calculation error:", error);
    alert(t('error.calculationFailed'));
  } finally {
    setLoading(false);
  }
};
```

### Pattern 2: Using Context
```javascript
import { useContext } from 'react';
import LanguageContext from '../utils/i18n/LanguageContext';

function MyComponent() {
  const { t, language, setLanguage } = useContext(LanguageContext);
  
  return (
    <div>
      <h1>{t('page.title')}</h1>
      <p>{t('page.description')}</p>
      <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}>
        Toggle Language
      </button>
    </div>
  );
}
```

### Pattern 3: Conditional Rendering
```javascript
// Show form or results
{isVisible && <FormComponent />}
{resultados && <ResultsComponent />}

// Loading spinner
{loading && <LoadingComponent visible={loading} />}

// Responsive layout
{getScreenWidth && <DesktopLayout />}
{!getScreenWidth && <MobileLayout />}
```

### Pattern 4: useMemo for Performance
```javascript
const processedData = useMemo(() => {
  return expensiveCalculation(inputData);
}, [inputData]);  // Only recalculate if inputData changes
```

---

## Master Number Quick Reference

| Master | Reduction | Format |
|--------|-----------|--------|
| 11 | 2 | "11/2" |
| 22 | 4 | "22/4" |
| 33 | 6 | "33/6" |
| 44 | 8 | "44/8" |
| 55 | 1 | "55/1" |
| 66 | 3 | "66/3" |
| 77 | 5 | "77/5" |
| 88 | 7 | "88/7" |
| 99 | 9 | "99/9" |

**How to detect:**
```javascript
if (typeof value === 'string' && value.includes('/')) {
  // It's a master number: "11/2"
}
```

---

## Debugging Tips

### Debug Calculation Issues
```javascript
// Add logging
console.log("Input date:", dateString);
console.log("Parsed date:", { day, month, year });
console.log("Pinaculo result:", result);

// Trace through GetFirstLine
// 1. Check date format (DD/MM/YYYY?)
// 2. Check reduction logic
// 3. Check master number handling
// 4. Compare with CALCULATION_ENGINE.md examples
```

### Debug Responsive Issues
```javascript
// Log screen width
useEffect(() => {
  console.log("Window width:", window.innerWidth);
  console.log("Is desktop:", window.innerWidth > 600);
}, [getScreenWidth]);

// Check CSS media queries
@media (max-width: 600px) {
  /* Mobile styles */
}
```

### Debug Language Issues
```javascript
// Verify context usage
const { t } = useContext(LanguageContext);
console.log("Current language:", language);
console.log("Translation result:", t('nav.home'));

// Check JSON file syntax
// {
//   "nav": { "home": "Home" }  // Valid
// }
```

---

## Common Pitfalls & Solutions

### Pitfall 1: Wrong Date Format
```javascript
// ❌ WRONG
const pin = calculosUtils.GetFirstLine("05/25/1990");

// ✅ CORRECT
const pin = calculosUtils.GetFirstLine("25/05/1990");
```

**Prevention:** Create wrapper functions with validated formats

### Pitfall 2: Master Number Not Handled
```javascript
// ❌ WRONG
const value = pin.P3;
return <div>{value}</div>;  // Shows "11/2" as-is

// ✅ CORRECT
const value = pin.P3;
return <div>
  {typeof value === 'string' ? value : value}
</div>;
```

### Pitfall 3: Not Cleaning Input
```javascript
// ❌ WRONG
const pin = calculosUtils.GetFirstLine(userInput);  // May have spaces

// ✅ CORRECT
const pin = calculosUtils.GetFirstLine(userInput.trim().replace(/\s/g, ''));
```

### Pitfall 4: Missing Responsive Listener
```javascript
// ❌ WRONG - Memory leak
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Missing removeEventListener!
}, []);

// ✅ CORRECT
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

## Component Creation Checklist

- [ ] Create component file (PascalCase.jsx)
- [ ] Create CSS file (kebab-case.css) if needed
- [ ] Export component as default
- [ ] Define PropTypes or prop documentation
- [ ] Add comments for complex logic
- [ ] Use responsive breakpoints if applicable
- [ ] Handle i18n if user-facing text
- [ ] Test with different screen sizes
- [ ] Test with both languages
- [ ] Export in parent/index file if needed

---

## Testing Checklist

Before pushing changes:
- [ ] Run `npm run build` successfully
- [ ] Test on desktop (width > 600px)
- [ ] Test on mobile (width ≤ 600px)
- [ ] Test in English and Spanish
- [ ] Test form validation
- [ ] Test calculation accuracy
- [ ] Test PDF export
- [ ] Check console for errors/warnings
- [ ] Test all navigation routes
- [ ] Verify responsive images and text

---

## Git Commit Message Template

```
[Type] Brief description

More detailed explanation if needed.

- Specific change 1
- Specific change 2

Fixes #issue_number (if applicable)
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code reorganization
- `docs:` Documentation
- `style:` Styling changes
- `perf:` Performance improvement

**Example:**
```
feat: Add multiple language support to header menu

- Implemented language context provider
- Added toggle button in HeaderMenu
- Updated component to use i18n

Fixes #42
```

---

## Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests (if configured)
npm test

# Format code (if prettier configured)
npm run format

# Check for linting errors
npm run lint
```

---

## Performance Optimization Checklist

- [ ] Use useMemo for expensive calculations
- [ ] Split large components into smaller ones
- [ ] Avoid inline function definitions in render
- [ ] Use React.memo for components that don't change often
- [ ] Lazy load routes if needed
- [ ] Optimize images
- [ ] Remove unused dependencies
- [ ] Check bundle size with `npm run build`

---

## Security Considerations

- [ ] Validate all user inputs
- [ ] Sanitize data before display
- [ ] Don't expose sensitive API keys in code
- [ ] Use HTTPS for all external requests
- [ ] Validate date inputs carefully
- [ ] Use Content Security Policy headers
- [ ] Keep dependencies updated (`npm audit fix`)
- [ ] Review third-party library permissions

---

## Accessibility Checklist

- [ ] Add alt text to images
- [ ] Use semantic HTML tags
- [ ] Ensure color contrast meets WCAG standards
- [ ] Make buttons keyboard accessible
- [ ] Add aria-labels to interactive elements
- [ ] Test with screen readers
- [ ] Ensure proper heading hierarchy
- [ ] Make forms accessible

---

## Deployment Checklist

- [ ] Build succeeds without warnings: `npm run build`
- [ ] Environment variables set in .env file (not in code)
- [ ] API endpoints point to production
- [ ] Caching headers configured
- [ ] Error handling in place
- [ ] Analytics/monitoring configured
- [ ] Backup of database before deployment
- [ ] Test in production-like environment first
- [ ] Have rollback plan ready
- [ ] Monitor error logs after deployment

---

## Help & Resources

### Getting Started
1. Read `CODEBASE_OVERVIEW.md` first
2. Review `ARCHITECTURE_AND_FLOWS.md` for flow understanding
3. Check `COMPONENTS_REFERENCE.md` for UI components
4. Study `CALCULATION_ENGINE.md` for numerology logic

### Quick Problem Solving
- **"Where is X functionality?"** → Check file locations above
- **"How do I add a feature?"** → See Common Coding Tasks
- **"My calculation is wrong"** → Check date format in Date Format Cheat Sheet
- **"Component not rendering"** → Check console for errors and Debugging Tips
- **"Language not changing"** → See Pattern 2: Using Context

### Additional Documentation Files
- `README.md` - Original project README
- `netlify.toml` - Deployment configuration
- `package.json` - Dependencies and scripts

---

## Support

For questions not covered here:
1. Check the specific documentation file mentioned above
2. Search code for similar implementations
3. Review git history for related changes
4. Check console errors for hints
5. Refer to React documentation for pattern questions

---

**Last Updated:** May 25, 2026  
**Purpose:** Quick reference for developers working on this project  
**Target Audience:** All developers (from junior to senior)  
**Maintenance:** Update as new patterns and practices are added
