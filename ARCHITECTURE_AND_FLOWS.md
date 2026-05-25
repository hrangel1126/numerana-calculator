# Numerana Calculator - Architecture & Data Flows

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      React Application                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  App.jsx (Root Component)                                │   │
│  │  - BrowserRouter configuration                           │   │
│  │  - LanguageContext Provider                              │   │
│  │  - Route definitions                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ├─── Home.jsx (/home) ──────────────────────────────┐   │
│         │                                                   │   │
│         ├─── Single.jsx (/single)                           │   │
│         │     ├─ SingleComponent.jsx                        │   │
│         │     ├─ NumerologyInputFormComponent.jsx           │   │
│         │     ├─ PinaculoChartComponent.jsx                 │   │
│         │     ├─ YearChartComponent.jsx                     │   │
│         │     ├─ DesktopMonthGridComponent.jsx              │   │
│         │     ├─ DayTable.jsx                               │   │
│         │     └─ Mobile components                          │   │
│         │                                                   │   │
│         ├─── SingleBasic.jsx (/singlebasic)                 │   │
│         │     └─ SingleBasicComponent.jsx (simplified)      │   │
│         │                                                   │   │
│         ├─── Couple.jsx (/couple)                           │   │
│         │     ├─ CoupleComponent.jsx                        │   │
│         │     ├─ Dual inputs (Person A & B)                 │   │
│         │     ├─ Swiper carousels (3 views)                 │   │
│         │     └─ Synastry calculations                      │   │
│         │                                                   │   │
│         └─── Team.jsx (/team)                               │   │
│               ├─ TeamComponent.jsx                          │   │
│               ├─ Dynamic member management                  │   │
│               └─ Group synastry analysis                    │   │
│                                                             │   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Shared Components Layer                                 │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  HeaderMenu.jsx, Menu.jsx, LoadingComponent.jsx          │   │
│  │  PinaculoSvg.jsx, YearSvg.jsx, MonthVisualizer.jsx       │   │
│  │  DayTable.jsx                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         └─→ LanguageContext (Global Language State)             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Utilities Layer                                         │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  calculosUtils.js (1,297 lines)                          │   │
│  │  - GetFirstLine()  → Pinaculo calculation                │   │
│  │  - GetYear()       → Annual numerology                   │   │
│  │  - GetMonth()      → 12-month breakdown                  │   │
│  │  - GetDays()       → Daily breakdown                     │   │
│  │  - combine3()      → Synastry combination                │   │
│  │  - Helper functions for master numbers                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Layered Architecture

```
PRESENTATION LAYER (Pages)
  ↓ (Routes)
PRESENTATION LAYER (Components)
  ↓ (Props, State)
SHARED COMPONENTS LAYER
  ↓ (Utilities)
CALCULATION LAYER (calculosUtils.js)
  ↓ (Pure functions)
STATE MANAGEMENT (Hooks + Context)
  ↓ (localStorage)
USER DATA
```

---

## Application Data Flows

### Flow 1: Single Person Calculator Flow

```
START
  │
  ├─ User navigates to /single
  │     ↓
  ├─ Single.jsx renders
  │     ↓
  ├─ SingleComponent.jsx mounted
  │     ↓
  ├─ Display: NumerologyInputFormComponent
  │     • Input: Name (string)
  │     • Input: Birth Date (DD/MM/YYYY)
  │     • Validation checks
  │
  ├─ User clicks "Calculate"
  │     ↓
  ├─ setLoading(true) → LoadingComponent shows
  │     ↓
  ├─ Format date: "25/05/1990" (DD/MM/YYYY)
  │     ↓
  ├─ CALCULATE PINACULO
  │     ├─ Call: calculosUtils.GetFirstLine(dateString)
  │     ├─ Returns: [{ A, B, C, D, P1-P5, N1-N4, top, bottom }]
  │     └─ Store: setRpinaculo(result)
  │
  ├─ CALCULATE YEAR DATA
  │     ├─ Format date to MM/DD/YYYY for GetYear()
  │     ├─ Call: calculosUtils.GetYear(dateString)
  │     ├─ Returns: { UniYear, PerY, Cage, P1-P3, Pb, Pc, Next* }
  │     └─ Store: setPinYear(result)
  │
  ├─ CALCULATE MONTHLY DATA
  │     ├─ Format date to MM/DD/YYYY
  │     ├─ Call: calculosUtils.GetMonth(dateString)
  │     ├─ Returns: [currentYearMonths[], nextYearMonths[]]
  │     └─ Store: setMonthsData(result)
  │
  ├─ CALCULATE DAILY DATA
  │     ├─ Format date to DD/MM/YYYY
  │     ├─ Call: calculosUtils.GetDays(dateString)
  │     ├─ Returns: [currentYearDays[], nextYearDays[]]
  │     └─ Store: setDayData(result)
  │
  ├─ setLoading(false) → Loading spinner disappears
  │     ↓
  ├─ setResultados(true) → Results section shows
  │     ↓
  ├─ RENDER RESULTS
  │     ├─ ResultsHeaderComponent
  │     │   ├─ Display: Name + Birth Date
  │     │   ├─ Reload button → clears state, shows form again
  │     │   └─ PDF Export button → html2pdf of entire view
  │     │
  │     ├─ PinaculoChartComponent
  │     │   └─ PinaculoSvg.jsx
  │     │       └─ SVG: 15-node pyramid with calculated values
  │     │
  │     ├─ YearChartComponent
  │     │   └─ YearSvg.jsx
  │     │       └─ SVG: Diamond chart with annual data
  │     │
  │     └─ Conditional Layout (Responsive)
  │         ├─ If Desktop (width > 600px):
  │         │   ├─ DesktopMonthGridComponent
  │         │   │   └─ 12× MonthVisualizer.jsx
  │         │   │       └─ Grid: Each month's MU, MP, PT, PL, PR
  │         │   └─ DesktopDayGridComponent
  │         │       └─ DayTable.jsx
  │         │           └─ Table: 365 days with daily values
  │         │
  │         └─ If Mobile (width ≤ 600px):
  │             ├─ MobileYearSliderComponent
  │             │   └─ Swiper: Select year (current/next)
  │             └─ MobileMonthDayViewComponent
  │                 └─ Swiper: Select month + swipe through days
  │
  └─ User can:
      ├─ Click Reload → Clear results, show form again
      ├─ Click PDF → Download as PDF
      ├─ Language toggle → Re-render in other language
      └─ Navigate to other calculator
END
```

**Key Points:**
- Form validation checks name and date format
- Date format must be DD/MM/YYYY for GetFirstLine and GetDays
- Date format must be MM/DD/YYYY for GetYear and GetMonth
- Loading delay simulates async calculation (500ms)
- Results display changes based on screen width (600px breakpoint)

---

### Flow 2: Couple Calculator Flow

```
START
  │
  ├─ User navigates to /couple
  │     ↓
  ├─ Couple.jsx renders
  │     ↓
  ├─ CoupleComponent.jsx mounted
  │     ↓
  ├─ Display: Two NumerologyInputFormComponents
  │     ├─ Person A: Name + Birth Date
  │     └─ Person B: Name + Birth Date
  │
  ├─ User fills both forms and clicks "Calculate"
  │     ↓
  ├─ setLoading(true)
  │     ↓
  ├─ FOR PERSON A:
  │     ├─ calculosUtils.GetFirstLine(dateA)
  │     ├─ calculosUtils.GetYear(dateA)
  │     └─ Store: setRpinaculo(resultA)
  │           setRpinaculo2(resultA) [for display 1]
  │
  ├─ FOR PERSON B:
  │     ├─ calculosUtils.GetFirstLine(dateB)
  │     ├─ calculosUtils.GetYear(dateB)
  │     └─ Store: setRpinaculo2(resultB) [overwrites]
  │
  ├─ COMBINE RESULTS (Synastry)
  │     ├─ Call: calculosUtils.combine3(pinA, pinB)
  │     ├─ Returns: Combined pinaculo values
  │     └─ Store: setRpinaculo3(combined)
  │
  ├─ COUPLE MONTHLY DATA
  │     ├─ Call: calculosUtils.GetMonthCouple(dateA, dateB, isCouple)
  │     └─ Store: setMonthsData(coupleMonths)
  │
  ├─ COUPLE DAILY DATA
  │     ├─ Call: calculosUtils.GetDaysCouple(dateA, dateB, isCouple)
  │     └─ Store: setDayData(coupleDays)
  │
  ├─ setLoading(false)
  │     ↓
  ├─ setResultados(true)
  │     ↓
  ├─ RENDER SWIPER WITH 3 SLIDES
  │     ├─ Swiper Component (Horizontal carousel)
  │     │
  │     ├─ SLIDE 0: Person A Pinaculo
  │     │   └─ PinaculoChartComponent (80% scaled)
  │     │       └─ PinaculoSvg.jsx
  │     │
  │     ├─ SLIDE 1: Person B Pinaculo
  │     │   └─ PinaculoChartComponent (80% scaled)
  │     │       └─ PinaculoSvg.jsx
  │     │
  │     └─ SLIDE 2: Combined Synastry Pinaculo
  │         └─ PinaculoChartComponent (80% scaled)
  │             └─ couple/PinaculoSvg.jsx (special couple version)
  │
  ├─ YEAR DATA DISPLAY
  │     ├─ Person A Year Data (left side)
  │     │   └─ YearChartComponent → YearSvg
  │     └─ Person B Year Data (right side)
  │         └─ YearChartComponent → YearSvg
  │
  ├─ MONTHLY DATA (Desktop only)
  │     └─ DesktopMonthGridComponent
  │         └─ MonthVisualizer (couple data)
  │
  └─ User can:
      ├─ Swipe/click arrows → Navigate between 3 pinaculos
      ├─ Reload → Clear results, show forms again
      ├─ PDF → Download results as PDF
      └─ Language toggle → Re-render in other language
END
```

**Key Differences from Single Flow:**
- Dual input forms (two people)
- Two separate calculations for each person
- Additional combine3() call for synastry
- Swiper carousel for navigating between 3 pinaculos
- Scaled down pinaculo diagrams (80%)
- Couple-specific monthly/daily data

---

### Flow 3: Team Calculator Flow

```
START
  │
  ├─ User navigates to /team
  │     ↓
  ├─ Team.jsx renders
  │     ↓
  ├─ TeamComponent.jsx mounted
  │     ↓
  ├─ Display: Add Team Members Form (initially empty)
  │     ├─ Member counter: "0/6 members"
  │     ├─ Input fields for member name + birthdate
  │     └─ "Add Member" button (enabled for 3-6 members)
  │
  ├─ User adds 3-6 team members
  │     ├─ Click "Add Member" after filling form
  │     ├─ Member added to state.teamMembers[]
  │     ├─ Form clears, ready for next member
  │     └─ Repeat until 3-6 members added
  │
  ├─ User clicks "Calculate Team Synastry"
  │     ↓
  ├─ setLoading(true)
  │     ↓
  ├─ FOR EACH TEAM MEMBER:
  │     ├─ calculosUtils.GetFirstLine(memberDate)
  │     ├─ Store individual pinaculo
  │     └─ Add to memberPinaculos array
  │
  ├─ CALCULATE TEAM SYNASTRY:
  │     ├─ For each pair of members:
  │     │   └─ calculosUtils.combine3(pin[i], pin[j])
  │     ├─ Calculate overall group synastry
  │     └─ Store: setSinastraE(teamSynastry)
  │
  ├─ setLoading(false)
  │     ↓
  ├─ setResultados(true)
  │     ↓
  ├─ RENDER TEAM RESULTS
  │     ├─ ResultsHeaderComponent
  │     │   ├─ Team member count
  │     │   ├─ Reload button
  │     │   └─ PDF Export button
  │     │
  │     ├─ FOR EACH MEMBER:
  │     │   ├─ PinaculoChartComponent
  │     │   │   └─ PinaculoSvg.jsx
  │     │   │       └─ SVG: Member's individual pinaculo
  │     │   │
  │     │   └─ (Font size adjusts based on digit length)
  │     │
  │     ├─ COMBINED TEAM PINACULO
  │     │   └─ PinaculoChartComponent
  │     │       └─ SVG: Overall team energy signature
  │     │
  │     └─ SYNASTRY MATRIX
  │         └─ Grid showing pairwise compatibility
  │
  └─ User can:
      ├─ Add/Remove members → Recalculate
      ├─ Reload → Clear results, show member form
      ├─ PDF → Download team profile as PDF
      └─ Language toggle
END
```

**Key Features:**
- Dynamic member count (3-6 members)
- Pairwise synastry calculations between all members
- Overall group energy signature
- Font sizing optimization for long numerals

---

### Flow 4: Responsive Design Flow

```
Component Mount
  │
  ├─ Check: window.innerWidth
  │
  ├─ If width > 600px (Desktop)
  │     ├─ getScreenWidth = true
  │     ├─ Render:
  │     │   ├─ DesktopMonthGridComponent
  │     │   ├─ DesktopDayGridComponent
  │     │   ├─ All 12 months visible
  │     │   └─ All days in table
  │     └─ State: monthsVisible = [1, 2, 3] (all 3 quarters)
  │
  └─ If width ≤ 600px (Mobile)
      ├─ getScreenWidth = false
      ├─ Render:
      │   ├─ MobileYearSliderComponent
      │   └─ MobileMonthDayViewComponent
      ├─ Swiper: Select year (current/next)
      ├─ Swiper: Select month + swipe through days
      └─ State: monthsVisible = [1] (only current selection)

Window Resize Event Triggers
  │
  ├─ setGetScreenWidth(window.innerWidth > 600)
  │     ↓
  └─ Component re-renders with new layout

useEffect Hook Manages:
  ├─ addEventListener('resize', handleResize)
  ├─ Throttling/debouncing (if needed)
  └─ removeEventListener on cleanup
```

**Responsive Breakpoints:**
- Desktop: width > 600px
- Mobile: width ≤ 600px
- No tablet-specific optimizations

---

## Language (i18n) Flow

```
App.jsx Mount
  │
  ├─ LanguageProvider Context Provider
  │     ├─ Check localStorage for 'language' key
  │     ├─ If found: setLanguage(stored)
  │     ├─ If not found: setLanguage('es') [default: Spanish]
  │     └─ Provide to all child components
  │
  ├─ HeaderMenu displays Language Selector
  │     ├─ Current language badge
  │     ├─ Two buttons: "EN" and "ES"
  │     └─ onClick → toggleLanguage()
  │
  ├─ User clicks Language Button
  │     ├─ setLanguage(newLanguage)
  │     ├─ Save to localStorage: localStorage.setItem('language', newLanguage)
  │     └─ Trigger re-render
  │
  ├─ All Components Using Translation
  │     ├─ useContext(LanguageContext)
  │     ├─ Call: t('namespace.key')
  │     │   Example: t('home.title')
  │     ├─ Returns translated string from:
  │     │   ├─ en.json (if language === 'en')
  │     │   └─ es.json (if language === 'es')
  │     └─ Render translated text
  │
  └─ Entire App re-renders in new language
      └─ localStorage persists selection for next session
```

**Translation System:**
- Translation files: `assets/i18n/en.json` and `assets/i18n/es.json`
- 122+ translation keys with dot-notation structure
- Context-based global state management
- localStorage persistence

---

## State Management Patterns

### Local Component State (SingleComponent)
```javascript
// Form inputs
const [nombre, setNombre] = useState("");
const [birthdate, setBirthdateEdit] = useState("");
const [birthdateShow, setBirthdateShow] = useState("");

// Results
const [rpinaculo, setRpinaculo] = useState({});
const [pinYear, setPinYear] = useState({});

// UI states
const [loading, setLoading] = useState(false);
const [isVisible, setIsVisible] = useState(true);
const [resultados, setResultados] = useState(false);

// Responsive
const [getScreenWidth, setGetScreenWidth] = useState(window.innerWidth > 600);

// Data visibility
const [monthsVisible, setMonthsVisible] = useState([1, 2, 3]);
const [mobilMesSelect, setMobilMesSelect] = useState(1);
```

### Global Context State (LanguageContext)
```javascript
{
  language: 'es' | 'en',
  t: (key: string) => string,
  setLanguage: (lang: string) => void
}
```

### Couple Component Extended State
```javascript
// Dual person data
const [nombre, setNombre] = useState("");
const [nombre2, setNombre2] = useState("");
const [birthdate, setbirthdate] = useState("");
const [birthdate2, setbirthdate2] = useState("");

// Three pinaculos (A, B, combined)
const [rpinaculo, setRpinaculo] = useState({});
const [rpinaculo2, setRpinaculo2] = useState({});
const [rpinaculo3, setRpinaculo3] = useState({});

// Swiper navigation
const [index, setIndex] = useState(0);
const [indexMobil, setIndexMobil] = useState(0);
const [indexSina, setIndexSina] = useState(0);

// Synastry data
const [sinastra, setSinastra] = useState({});
```

### Team Component State
```javascript
// Team members array
const [teamMembers, setTeamMembers] = useState([]);
// { id: number, name: string, birthdate: string }

// Calculation results
const [sinastraE, setSinastraE] = useState({});
const [teamCalculo, setTeamCalculo] = useState([]);
```

---

## Error Handling Flow

```
User Input Submission
  │
  ├─ Validation Check
  │     ├─ Name empty? → Show alert "Please enter name"
  │     ├─ Date invalid? → Show alert "Invalid date format"
  │     └─ Birthdate empty? → Show alert "Please enter birthdate"
  │
  ├─ If Invalid → Stop execution, return
  │
  ├─ If Valid → Proceed to calculation
  │     │
  │     ├─ try {
  │     │   result = calculosUtils.GetFirstLine(dateString)
  │     │ } catch (error) {
  │     │   console.error("Calculation error:", error)
  │     │   Show alert "Calculation error"
  │     │   Return
  │     │ }
  │     │
  │     └─ On Success: Display results
  │
  └─ Finally:
      └─ setLoading(false) [always executed]
```

---

## PDF Export Flow

```
User clicks "Export PDF" button
  │
  ├─ Create html2pdf instance
  │     ├─ Element: ref to results container
  │     ├─ Options:
  │     │   ├─ filename: "Numerology_[Name]_[Date].pdf"
  │     │   ├─ margin: [10, 10, 10, 10]
  │     │   ├─ filename: calculated from user data
  │     │   └─ image: { type: 'png', quality: 0.98 }
  │     └─ Styling: prints.css (custom PDF styles)
  │
  ├─ Capture HTML content
  │     ├─ PinaculoSvg rendered as SVG
  │     ├─ YearSvg rendered as SVG
  │     ├─ Month/Day data as tables
  │     └─ All styled with print.css
  │
  ├─ Generate PDF
  │     ├─ Client-side generation (no server needed)
  │     ├─ SVG diagrams rasterized to PNG
  │     └─ Tables preserved as HTML
  │
  └─ Download
      └─ Browser downloads PDF with calculated filename
```

---

## Calculation Engine Flow Details

### GetFirstLine() Internal Process
```
Input: "25/05/1990" (DD/MM/YYYY)
  │
  ├─ Parse date string
  │   ├─ Day: 25 → sum(2,5) = 7
  │   ├─ Month: 05 → sum(0,5) = 5
  │   └─ Year: 1990 → sum(1,9,9,0) = 19 → sum(1,9) = 10 → sum(1,0) = 1
  │
  ├─ Calculate A (Digit of month)
  │   └─ A = 5
  │
  ├─ Calculate B (Digit of day)
  │   └─ B = 7
  │
  ├─ Calculate C (Digit of year)
  │   └─ C = 1
  │
  ├─ Calculate D (Sum A+B)
  │   └─ D = sum(5,7) = 12 → sum(1,2) = 3
  │
  ├─ Calculate Pinnacles (P1-P5)
  │   ├─ P1 = sum(A, B) = sum(5,7) = 3 (same as D)
  │   ├─ P2 = sum(B, C) = sum(7,1) = 8
  │   ├─ P3 = sum(P1, P2) = sum(3,8) = 11 (MASTER NUMBER!)
  │   ├─ P4 = sum(A, C) = sum(5,1) = 6
  │   └─ P5 = sum(P3, P4) = sum(11,6) = 17 → sum(1,7) = 8
  │
  ├─ Calculate Challenges (N1-N4)
  │   ├─ N1 = |A - B| = |5 - 7| = 2
  │   ├─ N2 = |B - C| = |7 - 1| = 6
  │   ├─ N3 = |N1 - N2| = |2 - 6| = 4
  │   └─ N4 = |A - C| = |5 - 1| = 4
  │
  ├─ Calculate Corners
  │   ├─ top = sum(A,B,C) = sum(5,7,1) = 13 → sum(1,3) = 4
  │   └─ bottom = sum(P1,P2,P3,P4,P5) = sum(3,8,11,6,8) = 36 → sum(3,6) = 9
  │
  └─ Return: {
      A: 5,
      B: 7,
      C: 1,
      D: 3,
      P1: 3,
      P2: 8,
      P3: "11/2", ← Master number with reduction
      P4: 6,
      P5: 8,
      N1: 2,
      N2: 6,
      N3: 4,
      N4: 4,
      top: 4,
      bottom: 9
    }
```

**Master Number Handling:**
- If result is 11, 22, 33, etc., store as "11/2", "22/4", "33/6", etc.
- Never reduce further in subsequent calculations
- Special MasterNo() function detects and formats

---

## Performance Optimization Flows

### useMemo Hook Usage
```javascript
// In DayTable.jsx
const processedDays = useMemo(() => {
  return dayData.map(day => ({
    ...day,
    isSpecial: day.vibra22,
    displayFormat: formatDay(day)
  }));
}, [dayData]); // Only recalculates if dayData changes

// In MonthVisualizer.jsx
const monthData = useMemo(() => {
  return calculateMonthValues(birthdate);
}, [birthdate]); // Only recalculates if birthdate changes
```

### Conditional Rendering for Responsive
```javascript
// Don't render desktop components on mobile
{getScreenWidth && <DesktopMonthGridComponent />}
{!getScreenWidth && <MobileMonthDayViewComponent />}

// Only one set of components renders at a time
// Reduces DOM nodes and processing
```

---

## Event Flow Example: Form Submission

```
User types in name input
  │
  ├─ onChange event → setNombre(value)
  ├─ State updates
  └─ Component re-renders

User types in birthdate input
  │
  ├─ onChange event → setbirthdate(value)
  ├─ Input masking formats: "25051990" → "25/05/1990"
  ├─ setState updates
  └─ Component re-renders

User clicks "Calculate" button
  │
  ├─ onClick event → handleSubmit()
  │
  ├─ Validation:
  │   ├─ if (!nombre) → alert and return
  │   ├─ if (!birthdate) → alert and return
  │   └─ if invalid format → alert and return
  │
  ├─ setLoading(true)
  │   └─ LoadingComponent displays spinner
  │
  ├─ Simulate async: await setTimeout(500)
  │
  ├─ Call calculations:
  │   ├─ const pin = calculosUtils.GetFirstLine(birthdate)
  │   ├─ const year = calculosUtils.GetYear(birthdate)
  │   ├─ const month = calculosUtils.GetMonth(birthdate)
  │   └─ const days = calculosUtils.GetDays(birthdate)
  │
  ├─ Update state:
  │   ├─ setRpinaculo(pin[0])
  │   ├─ setPinYear(year)
  │   ├─ setMonthsData(month)
  │   └─ setDayData(days)
  │
  ├─ setIsVisible(false)
  │   └─ Hide form
  │
  ├─ setLoading(false)
  │   └─ Hide spinner
  │
  ├─ setResultados(true)
  │   └─ Show results section
  │
  └─ Component re-renders with full results display
```

---

## Summary: Data Flow Key Points

1. **Form Input → Validation → Calculation → Display**
2. **Date Format**: Critical distinction between DD/MM/YYYY and MM/DD/YYYY
3. **Master Numbers**: Special handling (11, 22, 33, etc. never reduced)
4. **Responsive**: Binary breakpoint at 600px width
5. **Language**: Context API with localStorage persistence
6. **SVG Rendering**: Dynamic node positioning based on calculated values
7. **Loading States**: Promise-based async simulation
8. **Error Handling**: try-catch with user-facing alerts
9. **Component Hierarchy**: Clear separation of concerns (pages → components → utils)
10. **State Management**: React Hooks (useState, useContext, useMemo)

---

**Last Updated:** May 25, 2026  
**Complexity Level:** Intermediate to Advanced  
**Main Challenge Areas:** Date format handling, calculation engine complexity
