# Numerana Calculator - Components Reference Guide

## Component Directory Structure

```
src/components/
├── [ROOT LEVEL COMPONENTS]
│   ├── SingleComponent.jsx (324 lines)
│   ├── SingleComponent.css
│   ├── CoupleComponent.jsx (1,171 lines)
│   ├── CoupleComponent.css
│   ├── SingleBasicComponent.jsx (413 lines)
│   ├── MonthVisualizer.jsx
│   ├── MonthVisualizer.css
│   ├── DayTable.jsx
│   ├── DayTable.css
│   ├── Menu.jsx
│   ├── Menu.css
│   ├── PinaculoSvg.jsx
│   ├── YearSvg.jsx
│   │
│   ├── HeaderMenu/
│   │   ├── HeaderMenu.jsx
│   │   └── HeaderMenu.css
│   │
│   ├── TeamComponent/
│   │   ├── TeamComponent.jsx (591 lines)
│   │   └── TeamComponent.css
│   │
│   ├── couple/
│   │   ├── PinaculoChartComponent.jsx
│   │   └── PinaculoSvg.jsx (80% scaled version)
│   │
│   └── common/
│       ├── NumerologyInputFormComponent.jsx
│       ├── ResultsHeaderComponent.jsx
│       ├── PinaculoChartComponent.jsx
│       ├── YearChartComponent.jsx
│       ├── LoadingComponent.jsx
│       ├── DesktopMonthGridComponent.jsx
│       ├── DesktopDayGridComponent.jsx
│       ├── MobileYearSliderComponent.jsx
│       ├── MobileMonthDayViewComponent.jsx
│       └── SingleComponent.css (shared)
```

---

## Core Logic Components

### 1. SingleComponent.jsx (324 lines)

**Purpose:** Main logic component for single person numerology calculator

**Responsibilities:**
- Manage form inputs (name, birthdate)
- Coordinate calculation calls to calculosUtils
- Manage state for pinaculo, year, month, and day data
- Handle responsive layout (desktop vs mobile)
- Coordinate rendering of sub-components

**State:**
```javascript
{
  nombre: string,                 // User's name
  birthdate: string,              // DD/MM/YYYY format
  birthdateShow: string,          // Formatted display
  rpinaculo: object,              // Pinaculo calculation result
  pinYear: object,                // Year data
  monthsData: array,              // Month breakdown
  dayData: array,                 // Daily breakdown
  loading: boolean,               // Loading spinner state
  isVisible: boolean,             // Form visibility
  resultados: boolean,            // Show/hide results
  getScreenWidth: boolean,        // >600px?
  monthsVisible: array,           // Which quarters visible
  mobilMesSelect: number          // Selected month on mobile
}
```

**Key Methods:**
- `handleSubmit()` - Validates and processes form submission
- `setNombre()` - Updates name input
- `setbirthdate()` - Updates and validates date input
- `handleReload()` - Clears state and shows form again
- `useEffect()` - Listens to window resize for responsive behavior

**Props:** None (standalone page component)

**Sub-Components Used:**
- NumerologyInputFormComponent
- LoadingComponent
- ResultsHeaderComponent
- PinaculoChartComponent
- YearChartComponent
- DesktopMonthGridComponent
- DesktopDayGridComponent
- MobileYearSliderComponent
- MobileMonthDayViewComponent

**Integration:**
```javascript
// Calculation calls:
const pinaculo = calculosUtils.GetFirstLine(formattedDate);
const year = calculosUtils.GetYear(dateInMMDDYYYY);
const months = calculosUtils.GetMonth(dateInMMDDYYYY);
const days = calculosUtils.GetDays(dateInDDMMYYYY);
```

**Responsive Behavior:**
- Desktop (width > 600px): All 12 months + 365 days visible
- Mobile (width ≤ 600px): Swiper carousels for month/day selection

---

### 2. CoupleComponent.jsx (1,171 lines)

**Purpose:** Main logic component for couple compatibility calculator

**Responsibilities:**
- Manage dual person inputs (Person A & Person B)
- Calculate individual pinaculos + synastry combination
- Handle Swiper carousel for result navigation
- Manage complex state for two people
- Coordinate couple-specific visualizations

**State:**
```javascript
{
  // Person A
  nombre: string,
  birthdate: string,
  birthdateShow: string,
  rpinaculo: object,              // Person A pinaculo
  pinYear: object,                // Person A year data
  
  // Person B
  nombre2: string,
  birthdate2: string,
  birthdateShow2: string,
  rpinaculo2: object,             // Person B pinaculo
  pinYear2: object,               // Person B year data
  
  // Combined
  rpinaculo3: object,             // Synastry pinaculo
  sinastra: object,               // Synastry data
  
  // Swiper navigation
  index: number,                  // Pinaculo swiper position (0-2)
  indexMobil: number,             // Mobile month swiper position
  indexSina: number,              // Synastry swiper position
  
  // UI states
  loading: boolean,
  isVisible: boolean,
  resultados: boolean,
  getScreenWidth: boolean,
  monthsVisible: array,
  listMobileM: array,
  mobilMesSelect: number
}
```

**Key Methods:**
- `handleSubmit()` - Validates both inputs and calculates
- `handleReload()` - Clears all state
- `onSwiperReach()` - Updates swiper position for carousel navigation

**Calculation Flow:**
```javascript
// Individual calculations
const pinA = calculosUtils.GetFirstLine(dateA);
const pinB = calculosUtils.GetFirstLine(dateB);

// Synastry combination
const pinCombined = calculosUtils.combine3(pinA, pinB);

// Couple monthly/daily
const monthCouple = calculosUtils.GetMonthCouple(dateA, dateB);
const dayCouple = calculosUtils.GetDaysCouple(dateA, dateB);
```

**Sub-Components Used:**
- NumerologyInputFormComponent (×2)
- LoadingComponent
- ResultsHeaderComponent
- PinaculoChartComponent (×2)
- couple/PinaculoChartComponent (scaled 80%)
- YearChartComponent (×2)
- Swiper carousel
- DesktopMonthGridComponent
- MonthVisualizer

**Special Features:**
- Swiper with 3 slides (Person A, Person B, Combined)
- Scaled pinaculo diagrams (80% of single size)
- Dual year charts side-by-side
- Couple-specific monthly/daily calculations

---

### 3. SingleBasicComponent.jsx (413 lines)

**Purpose:** Simplified version of single person calculator (pinaculo only)

**Responsibilities:**
- Simplified form input handling
- Calculate only pinaculo (no monthly/daily data)
- Faster performance for basic use case
- Same validation as SingleComponent

**State:**
```javascript
{
  nombre: string,
  birthdate: string,
  birthdateShow: string,
  rpinaculo: object,              // Only pinaculo
  loading: boolean,
  isVisible: boolean,
  resultados: boolean
}
```

**Key Methods:**
- `handleSubmit()` - Form validation and pinaculo calculation
- `handleReload()` - Clear state

**Calculation:**
```javascript
// Only pinaculo, no year/month/day
const pinaculo = calculosUtils.GetFirstLine(dateString);
```

**Sub-Components Used:**
- NumerologyInputFormComponent
- LoadingComponent
- ResultsHeaderComponent
- PinaculoChartComponent

**Difference from SingleComponent:**
- No GetYear/GetMonth/GetDays calculations
- No month grid visualization
- No day table visualization
- Significantly lighter performance footprint

---

### 4. TeamComponent.jsx (591 lines)

**Purpose:** Main logic component for team synastry calculator

**Responsibilities:**
- Dynamic team member management (add/remove)
- Calculate individual pinaculos for each member
- Calculate pairwise synastry between all members
- Calculate overall team energy signature
- Manage team list state

**State:**
```javascript
{
  teamMembers: [                  // Array of team members
    { id: number, name: string, birthdate: string },
    ...
  ],
  
  teamCalculo: array,             // Individual pinaculos
  sinastraE: object,              // Team synastry data
  
  // Current input form
  nombre: string,
  birthdate: string,
  
  // UI states
  loading: boolean,
  isVisible: boolean,
  resultados: boolean
}
```

**Key Methods:**
- `handleAddMember()` - Add new team member to list
- `handleRemoveMember(id)` - Remove member from team
- `handleSubmit()` - Calculate team synastry
- `handleReload()` - Reset to member input form

**Calculation Flow:**
```javascript
// For each member
for (let member of teamMembers) {
  const pin = calculosUtils.GetFirstLine(member.birthdate);
  teamCalculo.push(pin);
}

// Pairwise synastry
for (let i = 0; i < teamMembers.length; i++) {
  for (let j = i + 1; j < teamMembers.length; j++) {
    const synastry = calculosUtils.combine3(
      teamCalculo[i],
      teamCalculo[j]
    );
    // Store pairwise results
  }
}

// Overall team energy
const teamEnergy = calculosUtils.combine3All(teamCalculo);
```

**Sub-Components Used:**
- NumerologyInputFormComponent
- LoadingComponent
- ResultsHeaderComponent
- PinaculoChartComponent (×N for each member)

**Constraints:**
- Minimum 3 members
- Maximum 6 members
- Calculate button only enabled within this range

---

## Visualization Components

### 5. PinaculoSvg.jsx

**Purpose:** Render the numerological pyramid diagram as SVG

**Props:**
```javascript
{
  rpinaculo: {
    A: number|string,
    B: number|string,
    C: number|string,
    D: number|string,
    P1-P5: number|string,
    N1-N4: number|string,
    top: number|string,
    bottom: number|string
  }
}
```

**Output:** 15-node pyramid structure
```
         top
        /   \
       P1   P2
      / \   / \
     A   D   C
    / \ / \ / \
   P3 P4 P5 bottom
  / \ ...
 N1  N2 N3 N4
```

**Rendering:**
- Converts calculated numerological values to SVG nodes
- Dynamic positioning based on pyramid structure
- Text rendering for each node
- Master number formatting (e.g., "11/2")

**Styling:**
- From PinaculoSvg styling
- Circle nodes with borders
- Text centered in nodes
- Connecting lines between nodes

---

### 6. YearSvg.jsx

**Purpose:** Render annual numerology data as diamond-shaped chart

**Props:**
```javascript
{
  pinYear: {
    UniYear: number,            // Universal Year
    PerY: number,               // Personal Year
    Cage: number,               // Age reduced
    P1, P2, P3: number,         // Pinnacles
    Pb, Pc: number,             // Challenges
    NextUY, NextPY: number,     // Next year data
    NxAge, NxP1-P3, NxPb, NxPc: number
  }
}
```

**Output:** Diamond chart with current and next year data

**Positioning:**
- Center: Personal Year + Universal Year
- Four corners: Pinnacles (P1, P2, P3, P4)
- Additional nodes for challenges (Pb, Pc)

---

## Shared/Common Components

### 7. NumerologyInputFormComponent.jsx

**Purpose:** Reusable form component for name and birthdate input

**Props:**
```javascript
{
  nombre: string,               // Current name value
  setNombre: function,          // Setter for name
  birthdate: string,            // Current birthdate (DD/MM/YYYY)
  setbirthdate: function,       // Setter for birthdate
  handleSubmit: function,       // Form submission handler
  isVisible: boolean,           // Show/hide form
  buttonText?: string,          // Custom button label (default: "Calculate")
  loading?: boolean             // Disable button while loading
}
```

**Features:**
- Input masking for date field (auto-formats to DD/MM/YYYY)
- Name validation (required)
- Date format validation
- Responsive input layout
- Calendar picker integration (optional)

---

### 8. ResultsHeaderComponent.jsx

**Purpose:** Display results summary with action buttons

**Props:**
```javascript
{
  nombre: string,               // Display person's name
  birthdate: string,            // Display birthdate
  onReload: function,           // Handle reload button click
  onExport: function,           // Handle PDF export button click
  loading?: boolean
}
```

**Features:**
- Display: Name + Birthdate
- Reload button → clears results, shows form
- PDF Export button → html2pdf of results
- Language-aware labels

---

### 9. PinaculoChartComponent.jsx

**Purpose:** Wrapper component for pinaculo SVG display

**Props:**
```javascript
{
  rpinaculo: object,            // Pinaculo data
  title?: string,               // Optional title
  scale?: number                // Scale factor (1.0 = 100%, 0.8 = 80%)
}
```

**Renders:**
- Title (optional)
- PinaculoSvg component
- Container with responsive sizing

**Variations:**
- `common/PinaculoChartComponent.jsx` - Full size (100%)
- `couple/PinaculoChartComponent.jsx` - Couple version (80% scaled)

---

### 10. YearChartComponent.jsx

**Purpose:** Wrapper component for year SVG display

**Props:**
```javascript
{
  pinYear: object,              // Year data
  title?: string                // Optional title
}
```

**Renders:**
- Title (optional)
- YearSvg component
- Container with responsive sizing

---

### 11. LoadingComponent.jsx

**Purpose:** Display loading spinner while calculations process

**Props:**
```javascript
{
  visible: boolean              // Show/hide spinner
}
```

**Features:**
- Ripple animation effect
- Centered overlay
- Blocks interaction while loading
- Auto-hide when complete

**Styling:**
- Animated ripple circles
- Semi-transparent background
- z-index to appear above content

---

### 12. DesktopMonthGridComponent.jsx

**Purpose:** Display all 12 months in grid layout (desktop only)

**Props:**
```javascript
{
  monthsData: array,            // Month data from GetMonth()
  monthsVisible: array          // Which quarters to show [1,2,3]
}
```

**Renders:**
- 12 MonthVisualizer components in grid
- Quarter indicators
- All months visible simultaneously

**Layout:**
- Responsive grid (3-4 columns)
- Desktop only (hidden on mobile)

---

### 13. MonthVisualizer.jsx

**Purpose:** Display individual month numerology data

**Props:**
```javascript
{
  month: object,                // { Mon, Yea, MU, MP, PT, PL, PR }
  monthIndex: number            // 0-11 for month order
}
```

**Renders:**
- Month name and year
- Values: MU, MP, PT, PL, PR
- Color-coded cells
- Master number highlighting

---

### 14. DesktopDayGridComponent.jsx

**Purpose:** Display all days of current month in table (desktop)

**Props:**
```javascript
{
  dayData: array,               // Day data from GetDays()
  currentMonth: number          // Current month selected
}
```

**Renders:**
- DayTable component
- 30-31 day rows

---

### 15. DayTable.jsx

**Purpose:** Detailed daily numerology table

**Props:**
```javascript
{
  days: array,                  // { day, universal, personal, vibra22 }
  month: number                 // Month for context
}
```

**Features:**
- Tabular layout: Day | Universal | Personal | Special
- Highlight vibra22 days (special numerological significance)
- Highlight master numbers
- useMemo optimization for large dataset

---

### 16. MobileYearSliderComponent.jsx

**Purpose:** Mobile carousel for selecting year (current/next)

**Props:**
```javascript
{
  yearData: array,              // [currentYear, nextYear]
  onSelectYear: function
}
```

**Uses:** Swiper carousel for horizontal scroll

---

### 17. MobileMonthDayViewComponent.jsx

**Purpose:** Mobile-optimized month and day viewing

**Props:**
```javascript
{
  monthsData: array,
  dayData: array,
  onMonthSelect: function
}
```

**Features:**
- Month selector carousel
- Day table for selected month
- Swiper integration
- Full-screen optimized layout

---

### 18. HeaderMenu.jsx

**Purpose:** Top navigation bar with language toggle

**Props:** None (uses LanguageContext internally)

**Features:**
- Application logo/title
- Language selector (EN/ES)
- Current page indicator
- Navigation links
- Mobile hamburger menu (responsive)

**Context Usage:**
```javascript
const { language, t, setLanguage } = useContext(LanguageContext);
```

---

### 19. Menu.jsx

**Purpose:** Side or bottom navigation menu (if applicable)

**Features:**
- Navigation to different calculators
- Active page indicator
- Responsive menu layout

---

## Component Composition Example

### Typical Single Person Flow Hierarchy

```
SingleComponent.jsx (Logic)
├── HeaderMenu.jsx
│   └─ Language toggle
├── Conditional: isVisible
│   └─ NumerologyInputFormComponent.jsx
│       ├─ Input: name
│       └─ Input: birthdate (DD/MM/YYYY)
├── Conditional: loading
│   └─ LoadingComponent.jsx
│       └─ Ripple spinner
└── Conditional: resultados
    ├── ResultsHeaderComponent.jsx
    │   ├─ Reload button
    │   └─ PDF Export button
    ├── PinaculoChartComponent.jsx
    │   └─ PinaculoSvg.jsx
    ├── YearChartComponent.jsx
    │   └─ YearSvg.jsx
    ├── Conditional: getScreenWidth > 600
    │   ├── DesktopMonthGridComponent.jsx
    │   │   └─ MonthVisualizer.jsx (×12)
    │   └── DesktopDayGridComponent.jsx
    │       └─ DayTable.jsx
    └── Conditional: getScreenWidth ≤ 600
        ├── MobileYearSliderComponent.jsx
        └── MobileMonthDayViewComponent.jsx
```

---

## Component Props Pattern

### Standard Props Pattern Used Throughout

```javascript
// Function Component with destructured props
export default function MyComponent({
  prop1,
  prop2,
  onClickHandler,
  visible = true,           // Default value
  className = "default"
}) {
  // Component logic
  return (
    // JSX render
  );
}

// Typical usage:
<MyComponent
  prop1={value}
  prop2={anotherValue}
  onClickHandler={handleFunction}
  visible={true}
/>
```

---

## Styling Patterns

### CSS File Organization

Each major component has a paired `.css` file:
- `SingleComponent.jsx` + `SingleComponent.css`
- `CoupleComponent.jsx` + `CoupleComponent.css`
- `MonthVisualizer.jsx` + `MonthVisualizer.css`

### CSS Class Naming Convention

```css
/* Container classes */
.single-component { }
.month-visualizer { }
.pinaculo-chart { }

/* Element classes */
.form-input { }
.input-field { }
.button-primary { }

/* State classes */
.is-hidden { }
.is-loading { }
.is-active { }

/* Responsive modifier */
@media (max-width: 600px) {
  .mobile-only { }
}
```

---

## Common Props Patterns

### Data Props
```javascript
// Single calculation result
rpinaculo: { A, B, C, D, P1-P5, N1-N4, top, bottom }

// Year data result
pinYear: { UniYear, PerY, Cage, P1-P3, Pb, Pc, Next*, Nx* }

// Array of month objects
monthsData: [{ Mon, Yea, MU, MP, PT, PL, PR }, ...]

// Array of day objects
dayData: [{ day, universal, personal, vibra22 }, ...]
```

### Handler Props
```javascript
// Setter functions from useState
setNombre: function(string) → void
setbirthdate: function(string) → void

// Event handlers
onSubmit: function(event) → void
onClick: function(event) → void
onSelectYear: function(index) → void
```

### UI Control Props
```javascript
// Visibility flags
isVisible: boolean
resultados: boolean
loading: boolean
getScreenWidth: boolean

// Data indices
index: number              // Swiper position
mobilMesSelect: number     // Selected month
monthsVisible: array       // [1, 2, 3] quarters
```

---

## Responsive Component Usage

### Desktop Components
```javascript
{getScreenWidth && (
  <>
    <DesktopMonthGridComponent monthsData={monthsData} />
    <DesktopDayGridComponent dayData={dayData} />
  </>
)}
```

### Mobile Components
```javascript
{!getScreenWidth && (
  <>
    <MobileYearSliderComponent yearData={pinYear} />
    <MobileMonthDayViewComponent monthsData={monthsData} />
  </>
)}
```

---

## Performance Optimization Tips

### useMemo in DayTable
```javascript
const processedDays = useMemo(() => {
  return dayData.map(day => ({
    ...day,
    formatted: formatDay(day)
  }));
}, [dayData]);
```

### Conditional Rendering
```javascript
// Only render what's needed for current screen size
{getScreenWidth && <DesktopComponent />}
{!getScreenWidth && <MobileComponent />}
```

### Component Splitting
```javascript
// Instead of one huge component:
<SingleComponent /> // 324 lines

// Break into:
<NumerologyInputFormComponent />
<ResultsHeaderComponent />
<PinaculoChartComponent />
<YearChartComponent />
```

---

## Common Issues & Solutions

### Issue: Missing Props Error
**Solution:** Check prop names and types match component definition

### Issue: SVG Not Rendering
**Solution:** Verify rpinaculo object has all 15 required properties

### Issue: Date Formatting Errors
**Solution:** Use DD/MM/YYYY for SingleComponent, MM/DD/YYYY for GetYear

### Issue: Responsive Layout Not Switching
**Solution:** Check window.innerWidth > 600 logic and window resize listener

### Issue: Language Not Updating
**Solution:** Verify useContext(LanguageContext) called and t() function used

---

## Component Import Example

```javascript
// In SingleComponent.jsx
import HeaderMenu from './HeaderMenu/HeaderMenu';
import NumerologyInputFormComponent from './common/NumerologyInputFormComponent';
import LoadingComponent from './common/LoadingComponent';
import ResultsHeaderComponent from './common/ResultsHeaderComponent';
import PinaculoChartComponent from './common/PinaculoChartComponent';
import YearChartComponent from './common/YearChartComponent';
import DesktopMonthGridComponent from './common/DesktopMonthGridComponent';
import DayTable from './DayTable';
import MobileYearSliderComponent from './common/MobileYearSliderComponent';
import MobileMonthDayViewComponent from './common/MobileMonthDayViewComponent';
import calculosUtils from '../utils/calculosUtils';
```

---

**Last Updated:** May 25, 2026  
**Total Components:** 19 major components  
**Pattern:** React Hooks + Function Components  
**State Management:** useState + useContext  
**CSS Approach:** Component-scoped CSS files
