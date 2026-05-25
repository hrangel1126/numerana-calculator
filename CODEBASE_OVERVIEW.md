# Numerana Calculator - Codebase Overview

## Project Summary

**Application:** React Numerology Calculator  
**Purpose:** Web-based numerological calculations and readings  
**Status:** Production (Deployed on Netlify)  
**Version:** 0.1.0  

This is a sophisticated React application that performs complex numerological calculations. It calculates numerological values based on birthdates and displays results through visual pyramid diagrams (Pinaculo), year charts, and daily/monthly calendars.

The application supports:
- **Single person** calculations (with full year/month/day breakdowns)
- **Couple compatibility** calculations (synastry analysis)
- **Team synastry** calculations (3-6+ person group analysis)
- **Multi-language support** (English/Spanish)

---

## Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.2.0 |
| **Routing** | React Router DOM 7.5.1 |
| **Date Handling** | Moment.js 2.29.4 |
| **Carousels** | Swiper 11.0.5 |
| **Alerts** | SweetAlert2 11.19.1 |
| **Icons** | Bootstrap Icons 1.11.3 |
| **Styling** | CSS3 (Vanilla, no framework) |
| **Build Tool** | React Scripts 5.0.1 (CRA) |
| **Deployment** | Netlify |
| **Testing Libraries** | React Testing Library, Jest |

---

## Project Structure

```
src/
├── pages/                          # Route handler components
│   ├── home/
│   │   ├── Home.jsx               # Landing page
│   │   └── Home.css
│   ├── single/
│   │   └── Single.jsx             # Full single calculator
│   ├── singlebasic/
│   │   └── SingleBasic.jsx        # Simplified single calculator
│   ├── couple/
│   │   ├── Couple.jsx
│   │   └── Couple.css
│   └── team/
│       ├── Team.jsx
│       └── Team.css
│
├── components/                     # Reusable UI components
│   ├── SingleComponent.jsx
│   ├── CoupleComponent.jsx
│   ├── SingleBasicComponent.jsx
│   ├── MonthVisualizer.jsx
│   ├── DayTable.jsx
│   ├── Menu.jsx
│   ├── PinaculoSvg.jsx
│   ├── YearSvg.jsx
│   │
│   ├── HeaderMenu/
│   │   ├── HeaderMenu.jsx         # Top navigation bar
│   │   └── HeaderMenu.css
│   │
│   ├── TeamComponent/
│   │   ├── TeamComponent.jsx
│   │   └── TeamComponent.css
│   │
│   ├── couple/                    # Couple-specific components
│   │   ├── PinaculoChartComponent.jsx
│   │   └── PinaculoSvg.jsx
│   │
│   └── common/                    # Shared components
│       ├── NumerologyInputFormComponent.jsx
│       ├── ResultsHeaderComponent.jsx
│       ├── PinaculoChartComponent.jsx
│       ├── YearChartComponent.jsx
│       ├── LoadingComponent.jsx
│       ├── DesktopMonthGridComponent.jsx
│       ├── DesktopDayGridComponent.jsx
│       ├── MobileYearSliderComponent.jsx
│       └── MobileMonthDayViewComponent.jsx
│
├── utils/
│   ├── calculosUtils.js           # Core calculation engine (1,297 lines)
│   │
│   └── i18n/
│       └── LanguageContext.jsx    # Multi-language support
│
├── assets/
│   ├── i18n/
│   │   ├── en.json               # English translations
│   │   └── es.json               # Spanish translations
│   └── style/
│       └── prints.css            # Print/PDF styles
│
├── App.jsx                        # Root component with routing
├── App.css                        # Global styles
├── index.js                       # React entry point
└── index.css                      # Global index styles

public/
└── index.html                     # HTML template

Configuration:
├── package.json
├── netlify.toml                   # Netlify deployment config
└── .gitignore
```

---

## Key Features

### 1. **Numerological Calculation Engine**
- Core heart of the application in `calculosUtils.js`
- Implements numerological algorithms (converted from Angular service)
- Master number support (11, 22, 33, 44, 55, 66, 77, 88, 99)
- Main calculation functions:
  - `GetFirstLine(date)` → Pinaculo pyramid
  - `GetYear(date)` → Annual numerology
  - `GetMonth(date)` → Monthly data (12 months)
  - `GetDays(date)` → Daily data (365 days)
  - `combine3(pin1, pin2)` → Synastry for couples/teams

### 2. **Responsive Design**
- Desktop layout (>600px): Full grid with all months/days visible
- Mobile layout (<600px): Swiper carousels for month/day navigation
- Automatic responsive switching on window resize

### 3. **Multi-Language Support**
- React Context API for language state management
- localStorage persistence of user preference
- 122+ translation keys (English/Spanish)
- Language toggle in HeaderMenu

### 4. **SVG Visualizations**
- **PinaculoSvg**: 15-node pyramid diagram showing numerological relationships
- **YearSvg**: Diamond-shaped chart for annual/next-year data
- Dynamic text rendering with master number notation

### 5. **PDF Export**
- html2pdf integration for generating downloadable results
- Custom print styling via `prints.css`
- Content captured from component refs

---

## Routing Structure

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Redirect | Goes to /home |
| `/home` | Home.jsx | Landing page with 4 navigation options |
| `/single` | Single.jsx | Full single person calculator |
| `/singlebasic` | SingleBasic.jsx | Simplified single person calculator |
| `/couple` | Couple.jsx | Couple compatibility calculator |
| `/team` | Team.jsx | Team synastry calculator |
| `/reload` | Single.jsx | Alias for /single |
| `/reloadc` | Couple.jsx | Alias for /couple |
| `/reloadt` | Team.jsx | Alias for /team |

---

## State Management Pattern

This application uses **React Hooks** for state management with no external state library:

- **useState**: Local component state for forms, results, UI visibility
- **useContext**: Global language preference via LanguageContext
- **useMemo**: Performance optimization for expensive calculations
- **Props**: Parent-child communication

### Global Context
```javascript
// LanguageContext provides:
- language: 'en' or 'es'
- t(key): Translation function
- setLanguage(): Toggle language
- Persisted in localStorage
```

---

## Calculation Engine Overview

### Core Functions

**`GetFirstLine(date: DD/MM/YYYY) → [{ A, B, C, D, P1-P5, N1-N4, top, bottom }]`**
- Calculates the pinaculo pyramid structure
- Input format: DD/MM/YYYY
- Returns array with single object containing 15 numerological values

**`GetYear(date: MM/DD/YYYY) → { UniYear, PerY, Cage, P1-P3, Pb, Pc, Next*, Nx* }`**
- Calculates annual numerology
- Input format: MM/DD/YYYY (different from GetFirstLine!)
- Returns current and next year data

**`GetMonth(date: MM/DD/YYYY) → [currentYearMonths[], nextYearMonths[]]`**
- Calculates all 12 months of numerology
- Returns array of month objects: `{ Mon, Yea, MU, MP, PT, PL, PR }`

**`GetDays(date: DD/MM/YYYY) → [currentYearDays[], nextYearDays[]]`**
- Calculates daily numerology for entire year
- Returns: `{ year, month, days: [{ day, universal, personal, vibra22 }] }`

### Master Number Handling

Master numbers (11, 22, 33, etc.) are NEVER reduced further:
- Display format: `"11/2"` (master/single digit reduction)
- `checkmaster(value)` converts any number to its numerological value
- `MasterNo(num)` detects and handles master numbers in calculations
- Special rules for sumation and subtraction with master numbers

### Date Format ⚠️ CRITICAL

**⚠️ INCONSISTENT FORMATS IN USE:**
- `GetFirstLine()` expects: **DD/MM/YYYY**
- `Centraline()` expects: **DD/MM/YYYY**
- `GetDays()` expects: **DD/MM/YYYY**
- `GetYear()` expects: **MM/DD/YYYY** ← Different!
- `GetMonth()` expects: **MM/DD/YYYY** ← Different!

Always verify date format when calling calculation functions!

---

## Component Hierarchy

### SingleComponent Flow
```
Single.jsx (Page)
└── SingleComponent.jsx (Logic)
    ├── HeaderMenu.jsx
    ├── NumerologyInputFormComponent.jsx
    ├── LoadingComponent.jsx
    ├── ResultsHeaderComponent.jsx
    ├── PinaculoChartComponent.jsx
    │   └── PinaculoSvg.jsx
    ├── YearChartComponent.jsx
    │   └── YearSvg.jsx
    └── If Desktop (>600px):
        ├── DesktopMonthGridComponent.jsx
        │   └── MonthVisualizer.jsx (×12)
        └── DesktopDayGridComponent.jsx
            └── DayTable.jsx
    └── If Mobile (<600px):
        ├── MobileYearSliderComponent.jsx
        └── MobileMonthDayViewComponent.jsx
```

### CoupleComponent Flow
```
Couple.jsx (Page)
└── CoupleComponent.jsx (Logic)
    ├── HeaderMenu.jsx
    ├── NumerologyInputFormComponent.jsx (×2)
    ├── Swiper Carousel:
    │   ├── Pinaculo 1 (Person A)
    │   ├── Pinaculo 2 (Person B)
    │   └── Pinaculo 3 (Combined Synastry)
    ├── YearChartComponent.jsx (×2)
    └── MonthVisualizer.jsx (Couple data)
```

### TeamComponent Flow
```
Team.jsx (Page)
└── TeamComponent.jsx (Logic)
    ├── HeaderMenu.jsx
    ├── Dynamic Team Member Inputs
    ├── PinaculoChartComponent.jsx (×N)
    └── Team Synastry Display
```

---

## Data Flow Examples

### Example 1: User Submits Single Calculator
```
User enters name + birthdate (DD/MM/YYYY)
    ↓
handleSubmit() in SingleComponent
    ↓
Format date: "25/05/1990" (DD/MM/YYYY)
    ↓
Call calculosUtils.GetFirstLine(dateString)
    ↓
Returns: [{ A: 8, B: 9, C: 6, D: 5, P1: 2, ... }]
    ↓
Store in state: setRpinaculo(result)
    ↓
Also call GetYear() with same date but in MM/DD/YYYY format
    ↓
Returns: { UniYear: 8, PerY: 5, Cage: 34, ... }
    ↓
Store: setPinYear(result)
    ↓
Components re-render with results:
    - PinaculoSvg displays pyramid
    - YearSvg displays annual chart
    - MonthVisualizer displays 12 months
    - DayTable displays 365 days
```

---

## Important Patterns & Conventions

### 1. Component Props Pattern
```javascript
// Destructured props
function MyComponent({ nombre, birthdate, onSubmit }) {
  // Use props directly
}
```

### 2. State Initialization
```javascript
const [nombre, setNombre] = useState("");
const [loading, setLoading] = useState(false);
const [resultados, setResultados] = useState(false);
```

### 3. Loading Pattern
```javascript
setLoading(true);
// Simulate async calculation
await new Promise(resolve => setTimeout(resolve, 500));
const result = calculosUtils.GetFirstLine(dateString);
setRpinaculo(result);
setLoading(false);
setResultados(true);
```

### 4. Language Usage
```javascript
import { useContext } from 'react';
import LanguageContext from './utils/i18n/LanguageContext';

function MyComponent() {
  const { t } = useContext(LanguageContext);
  return <h1>{t('home.title')}</h1>;
}
```

### 5. Responsive Handling
```javascript
const [getScreenWidth, setGetScreenWidth] = useState(window.innerWidth > 600);

useEffect(() => {
  const handleResize = () => {
    setGetScreenWidth(window.innerWidth > 600);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Use getScreenWidth to render different components
```

---

## CSS Organization

### Global Styles (App.css)
- Base element styling
- Color scheme (primary purple #5b356c)
- Loading spinner animation
- Grid system utilities
- Responsive breakpoints

### Color Palette
- **Primary**: #5b356c (dark purple)
- **Secondary**: #594363, #6e01a0
- **Text**: #333, #000
- **Background**: #fff, #f5f5f7
- **Border**: #858585

### Component Styles
- Each major component has its own `.css` file
- Class names use kebab-case: `.pinaculo-chart`, `.form-input`
- Print styles in `prints.css` for PDF export

---

## Performance Optimizations

1. **useMemo**: Used in DayTable and MonthVisualizer for expensive calculations
2. **Component Splitting**: Logical separation reduces unnecessary re-renders
3. **Conditional Rendering**: Mobile/desktop components render separately
4. **Event Delegation**: Click handlers on parent elements where possible

---

## Translation System

### How Translations Work
```javascript
// In component:
const { t } = useContext(LanguageContext);
return <h1>{t('home.title')}</h1>;

// In en.json:
{ "home": { "title": "Welcome" } }

// In es.json:
{ "home": { "title": "Bienvenido" } }
```

### Available Translations
- `nav.*` - Navigation items
- `home.*` - Home page text
- `team.*` - Team calculator
- `singleBasic.*` - Basic calculator
- `months.*` - Month names
- `language_selector.*` - Language UI
- `numberDescriptions.*` - 27 number interpretations

---

## Build & Deployment

### Build Command
```bash
npm run build
```
Creates optimized production build in `build/` folder.

### Deployment
- Hosted on **Netlify**
- Automatic CI/CD on git push
- SPA routing configured (redirects to index.html)
- Environment: Node.js 14.x+

### Netlify Configuration (netlify.toml)
```toml
[build]
  command = "CI=false npm run build"
  publish = "build"
```

---

## Known Issues & Limitations

1. **Date Format Inconsistency**: Different functions expect different formats (DD/MM/YYYY vs MM/DD/YYYY)
2. **Limited Testing**: Test libraries installed but no test files present
3. **No Data Persistence**: Calculations not saved to database/localStorage
4. **Binary Responsive Design**: Only desktop (>600px) and mobile (<600px), no tablet optimization
5. **No Lazy Loading**: All components imported statically
6. **Performance**: All 12 months calculated even if only some are displayed

---

## For Other AI Assistants

When modifying this codebase:

1. **Always check date formats** when calling calculation functions
2. **Master numbers** (11, 22, 33, etc.) are never reduced - format as `"11/2"`
3. **calculosUtils.js is complex** - test calculation changes thoroughly
4. **i18n**: Update both en.json and es.json for any UI text changes
5. **Responsive design**: Test changes at both 600px breakpoint
6. **Component hierarchy**: Respect existing separation (pages → components → utils)
7. **State management**: Use useState/useContext pattern, avoid Redux
8. **CSS**: Keep styles in component-level CSS files, avoid inline styles

---

## Quick Links to Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `src/utils/calculosUtils.js` | 1,297 | Core calculation engine |
| `src/components/SingleComponent.jsx` | 324 | Single person calculator logic |
| `src/components/CoupleComponent.jsx` | 1,171 | Couple calculator logic |
| `src/components/TeamComponent.jsx` | 591 | Team calculator logic |
| `src/App.css` | 451 | Global styles |
| `src/utils/i18n/LanguageContext.jsx` | ~50 | Multi-language support |

---

**Last Updated:** May 25, 2026  
**Project Status:** Production Ready  
**Maintenance:** Active
