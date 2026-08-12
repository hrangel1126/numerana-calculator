# Calculation Architecture Diagram

**Quick Visual Reference for calculosUtils.js**

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   React Components Layer                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ SingleComponent  │  │ CoupleComponent  │  │ TeamComponent│  │
│  │   & variants     │  │   & variants     │  │   & variants │  │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘  │
│           │                      │                   │           │
│           └──────────────────────┼───────────────────┘           │
│                                  │                               │
│                     All components ONLY call                     │
│                   calculosUtils.js functions                     │
│                                  │                               │
└──────────────────────────────────┼───────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│              calculosUtils.js (1,297 lines)                     │
│            ✅ SINGLE SOURCE OF ALL CALCULATIONS                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ MAIN CALCULATION FUNCTIONS (7)                          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ • GetFirstLine(date) ─────→ Pinaculo pyramid (15 nodes) │   │
│  │ • GetYear(date) ──────────→ Annual numerology data      │   │
│  │ • GetMonth(date) ─────────→ Monthly forecast (12 months)│   │
│  │ • GetDays(date) ──────────→ Daily breakdown             │   │
│  │ • combine3(pin1, pin2) ───→ Couple synastry (combined)  │   │
│  │ • GetMonthCouple(d1, d2) ─→ Combined monthly data       │   │
│  │ • GetDaysCouple(d1, d2) ──→ Combined daily data         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ HELPER FUNCTIONS (7)                                    │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ • sum(s1, s2) ──→ Addition with master handling         │   │
│  │ • subs(s1, s2) ──→ Subtraction with special rules       │   │
│  │ • sumY(s1, s2) ──→ Alternative sum for years            │   │
│  │ • checkmaster() ──→ Master number identification         │   │
│  │ • cleanint() ─────→ Convert to integer                  │   │
│  │ • reduceToSingleOrMaster() ──→ Inline helper            │   │
│  │ • reduceAndRespectMaster() ───→ Inline helper           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Function Call Map

```
SINGLE CALCULATOR:
│
├─ SingleComponent.jsx
│  ├─ GetFirstLine(DD/MM/YYYY) ──→ Pinaculo chart
│  ├─ GetYear(MM/DD/YYYY) ───────→ Annual data
│  ├─ GetMonth(MM/DD/YYYY) ──────→ Monthly forecast
│  └─ GetDays(DD/MM/YYYY) ───────→ Daily breakdown
│
└─ SingleBasicComponent.jsx
   ├─ GetFirstLine(DD/MM/YYYY) ──→ Pinaculo chart
   └─ GetYear(MM/DD/YYYY) ───────→ Annual data


COUPLE CALCULATOR:
│
└─ CoupleComponent.jsx
   ├─ GetFirstLine(A's date) ────→ Person A pinaculo
   ├─ GetFirstLine(B's date) ────→ Person B pinaculo
   ├─ combine3(pinA, pinB) ──────→ Relationship compatibility
   ├─ GetYear(A's date) ────────→ Person A annual
   ├─ GetYear(B's date) ────────→ Person B annual
   ├─ GetMonth(A, B) ──────────→ Combined monthly
   └─ GetDays(A, B) ──────────→ Combined daily


TEAM CALCULATOR:
│
└─ TeamComponent.jsx
   ├─ GetFirstLine(Member1) ────→ Member 1 pinaculo
   ├─ GetFirstLine(Member2) ────→ Member 2 pinaculo
   ├─ GetFirstLine(Member3...) ─→ Member N pinaculo
   └─ [combine logic for group]


MONTH/DAY COMPONENTS:
│
├─ MonthVisualizer.jsx
│  ├─ GetMonth(single) ────────→ Single person months
│  └─ GetMonthCouple(A, B) ────→ Couple months
│
└─ DayTable.jsx
   ├─ GetDays(single) ────────→ Single person days
   └─ GetDaysCouple(A, B) ────→ Couple days
```

---

## 🔄 Data Flow Example: Single Calculator

```
USER INPUT
    ↓
Name: "John"
DOB: "25/05/1990"
    ↓
[FormSubmit - handleSubmit()]
    ↓
┌─ PINACULO CALCULATION ─────────────────────┐
│                                             │
│ GetFirstLine("25/05/1990")                 │
│   ├─ Parse: Day=25, Month=5, Year=1990    │
│   ├─ Reduce each part: 2+5=7, 5, 1+9+9+0  │
│   ├─ Calculate: Pinaculo pyramid          │
│   └─ Return: {A, B, C, D, P1-P5, ...}     │
│                                             │
│ → Renders: PinaculoChartComponent          │
│                                             │
└─────────────────────────────────────────────┘
    ↓
┌─ ANNUAL CALCULATION ───────────────────────┐
│                                             │
│ GetYear("05/25/1990")                      │
│   ├─ Current year calculations             │
│   ├─ Next year calculations                │
│   └─ Return: {UniYear, PerY, ...}          │
│                                             │
│ → Renders: YearChartComponent              │
│                                             │
└─────────────────────────────────────────────┘
    ↓
┌─ MONTHLY BREAKDOWN ────────────────────────┐
│                                             │
│ GetMonth("05/25/1990")                     │
│   ├─ 12 months data (current year)         │
│   ├─ 12 months data (next year)            │
│   └─ Return: [monthArray1, monthArray2]    │
│                                             │
│ → Renders: MonthVisualizer                 │
│                                             │
└─────────────────────────────────────────────┘
    ↓
┌─ DAILY BREAKDOWN ──────────────────────────┐
│                                             │
│ GetDays("25/05/1990")                      │
│   ├─ Daily data (current year)             │
│   ├─ Daily data (next year)                │
│   └─ Return: [dayArray1, dayArray2]        │
│                                             │
│ → Renders: DayTable                        │
│                                             │
└─────────────────────────────────────────────┘
    ↓
RESULTS DISPLAYED
```

---

## 📈 Data Flow Example: Couple Calculator

```
USER INPUT
    ↓
Person A: Name="John", DOB="25/05/1990"
Person B: Name="Jane", DOB="10/03/1992"
    ↓
[FormSubmit - subm()]
    ↓
┌─ PINACULO CALCULATIONS ─────────────────┐
│                                          │
│ GetFirstLine("25/05/1990") → pinA       │
│ GetFirstLine("10/03/1992") → pinB       │
│                                          │
│ → Renders: Two PinaculoChartComponents  │
│                                          │
└──────────────────────────────────────────┘
    ↓
┌─ SYNASTRY / RELATIONSHIP COMPATIBILITY ─┐
│                                          │
│ combine3(pinA, pinB)                    │
│   ├─ Combines each node:                │
│   │   cA = sumY(A.A, B.A)               │
│   │   cB = sumY(A.B, B.B)               │
│   │   ... (all 15 nodes)                 │
│   └─ Return: Combined pinaculo           │
│                                          │
│ → Renders: Relationship Structure        │
│                                          │
└──────────────────────────────────────────┘
    ↓
┌─ ANNUAL DATA FOR BOTH ──────────────────┐
│                                          │
│ GetYear("05/25/1990") → yearA           │
│ GetYear("03/10/1992") → yearB           │
│                                          │
│ → Renders: Two YearChartComponents      │
│                                          │
└──────────────────────────────────────────┘
    ↓
┌─ MONTHLY COMBINED DATA ─────────────────┐
│                                          │
│ GetMonthCouple("05/25/1990", ...)       │
│   ├─ Combine both people's months       │
│   └─ Return: Combined monthly data       │
│                                          │
│ → Renders: MonthVisualizer               │
│                                          │
└──────────────────────────────────────────┘
    ↓
┌─ DAILY COMBINED DATA ───────────────────┐
│                                          │
│ GetDaysCouple("05/25/1990", ...)        │
│   ├─ Combine both people's days         │
│   └─ Return: Combined daily data         │
│                                          │
│ → Renders: DayTable                      │
│                                          │
└──────────────────────────────────────────┘
    ↓
RELATIONSHIP ANALYSIS DISPLAYED
```

---

## 🎯 Master Number Handling

Master numbers (11, 22, 33, etc.) are special in numerology:

```
calculosUtils.js handles these specially:

11 → Converts to 2 in some contexts
22 → Converts to 4 in some contexts
33 → Converts to 6 in some contexts
44 → Converts to 8 in some contexts
55 → Converts to 1 in some contexts
...

BUT also preserves them in master array:
master = [99, 88, 77, 66, 55, 44, 33, 22, 11]

This ensures accurate numerology calculations!
```

---

## ✅ Verification Checklist

- ✅ All calculation logic centralized in ONE file
- ✅ NO calculation logic in component files
- ✅ All components import from calculosUtils ONLY
- ✅ 7 main functions cover all calculator types
- ✅ 7 helper functions handle edge cases
- ✅ Master number handling implemented throughout
- ✅ Error handling and validation present
- ✅ Recursion depth protection prevents infinite loops
- ✅ Input validation on all functions
- ✅ Clean separation of concerns

---

**Result:** ✅ **calculosUtils.js IS the complete and only source of all calculations**

