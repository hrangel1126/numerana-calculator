# Implementation Guide - Year Label Positioning & Sweep Filtering

## ISSUE 1: Move Year Labels to Top of Pinaculo

### Current State (WRONG)
```
┌─────────────────────────────────────┐
│      .year-chart-slide              │
│  ┌──────────────────────────────┐   │
│  │   YearChartComponent (SVG)   │   │
│  │   ┌──────────────────────┐   │   │
│  │   │  Pinaculo Diagram    │   │   │
│  │   │  (350x400px)         │   │   │
│  │   │                      │   │   │
│  │   │   O   O   O          │   │   │
│  │   │    \ | /            │   │   │
│  │   │     O-O             │   │   │
│  │   │    / | \            │   │   │
│  │   │   O   O   O          │   │   │
│  │   └──────────────────────┘   │   │
│  └──────────────────────────────┘   │
│                                      │
│         2026                         │  <- year-label (BELOW)
│         WRONG POSITION              │
└─────────────────────────────────────┘
```

### Target State (CORRECT)
```
┌─────────────────────────────────────┐
│      .year-chart-slide              │
│                                      │
│         2026                         │  <- year-label (TOP)
│         CORRECT POSITION            │
│                                      │
│  ┌──────────────────────────────┐   │
│  │   YearChartComponent (SVG)   │   │
│  │   ┌──────────────────────┐   │   │
│  │   │  Pinaculo Diagram    │   │   │
│  │   │  (350x400px)         │   │   │
│  │   │                      │   │   │
│  │   │   O   O   O          │   │   │
│  │   │    \ | /            │   │   │
│  │   │     O-O             │   │   │
│  │   │    / | \            │   │   │
│  │   │   O   O   O          │   │   │
│  │   └──────────────────────┘   │   │
│  └──────────────────────────────┘   │
│                                      │
└─────────────────────────────────────┘
```

### Implementation Steps

#### Step 1: Modify CoupleComponent.jsx (Line 824-838)
FROM:
```jsx
<SwiperSlide key={`${nombre}-year-${yearData.yearValue}-${index}`} className="year-chart-slide">
  <YearChartComponent
    year={yearData.yearValue}
    data={yearData.dataValue}
    isCurrentYear={yearData.isCurrent}
  />
  <p className="year-label">{yearData.yearValue}</p>
</SwiperSlide>
```

TO:
```jsx
<SwiperSlide key={`${nombre}-year-${yearData.yearValue}-${index}`} className="year-chart-slide">
  <p className="year-label">{yearData.yearValue}</p>
  <YearChartComponent
    year={yearData.yearValue}
    data={yearData.dataValue}
    isCurrentYear={yearData.isCurrent}
  />
</SwiperSlide>
```

#### Step 2: Fix Person 2 Slider (Line 854-862) - ADD MISSING LABEL
FROM:
```jsx
<SwiperSlide key={`${nombre2}-year-${yearData.yearValue}-${index}`} className="year-chart-slide">
  <YearChartComponent
    year={yearData.yearValue}
    data={yearData.dataValue}
    isCurrentYear={yearData.isCurrent}
  />
</SwiperSlide>
```

TO:
```jsx
<SwiperSlide key={`${nombre2}-year-${yearData.yearValue}-${index}`} className="year-chart-slide">
  <p className="year-label">{yearData.yearValue}</p>
  <YearChartComponent
    year={yearData.yearValue}
    data={yearData.dataValue}
    isCurrentYear={yearData.isCurrent}
  />
</SwiperSlide>
```

#### Step 3: Update CoupleComponent.css - .year-chart-slide (Line 217-223)
FROM:
```css
.year-chart-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 5px;
}
```

TO:
```css
.year-chart-slide {
  display: flex;
  flex-direction: column;       /* Stack items vertically */
  justify-content: flex-start;  /* Align to top */
  align-items: center;          /* Center horizontally */
  box-sizing: border-box;
  padding: 5px;
}
```

#### Step 4: Update CoupleComponent.css - .year-label (Line 104-110)
FROM:
```css
.year-label {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a3a52;
  margin-top: 1rem;
}
```

TO:
```css
.year-label {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a3a52;
  margin-bottom: 0.5rem;   /* Space below label (above chart) */
  margin-top: 0;           /* Remove top margin */
  order: -1;               /* Force to appear first (flex order) */
}
```

---

## ISSUE 2: Implement Sweep Year Filtering

### Option A: Define Sweep in numerology context

Sweep years are typically identified when a person's pinnacle or personal year numbers create a "sweeping" cycle.

### Step 1: Add sweep property to GetYear() in calculosUtils.js

Location: calculosUtils.js, Lines 536-553

Add after line 552:
```javascript
// Determine if this is a "sweep" year
// (Define your sweep logic here based on numerology rules)
const isSweepYear = this.checkSweepYear(personalYear, universalYear, age);

return {
  Cage: Cage,
  NextPY: nextPersonalYear,
  NextUY: nextUniversalYear,
  NxAge: NxAge,
  NxP1: NxP1,
  NxP2: NxP2,
  NxP3: NxP3,
  NxPb: NxPb,
  NxPc: NxPc,
  P1: P1,
  P2: P2,
  P3: P3,
  Pb: Pb,
  Pc: Pc,
  PerY: personalYear,
  UniYear: universalYear,
  sweep: isSweepYear  // NEW PROPERTY
};
```

### Step 2: Implement checkSweepYear method in calculosUtils.js

Add this new method:
```javascript
checkSweepYear(personalYear, universalYear, age) {
  // Define your sweep year logic here
  // Example: Sweep years might be when personal year equals universal year
  // Or when pinnacle numbers form a specific pattern
  
  // Placeholder logic - replace with actual numerology rules
  const personalDigits = personalYear.toString().split('').map(Number);
  const universalDigits = universalYear.toString().split('').map(Number);
  
  // Example: Sweep if digits are palindromic
  const isPalindrome = personDigits.join('') === universalDigits.join('').split('').reverse().join('');
  
  return isPalindrome || false; // Adjust logic as needed
}
```

### Step 3: Filter years in CoupleComponent.jsx (Line 826-828)

FROM:
```jsx
{[
  { yearValue: year, dataValue: pinYear[0], isCurrent: true },
  { yearValue: nxYear, dataValue: pinYear[0], isCurrent: false },
].map((yearData, index) => (
```

TO:
```jsx
{[
  { yearValue: year, dataValue: pinYear[0], isCurrent: true },
  { yearValue: nxYear, dataValue: pinYear[0], isCurrent: false },
]
.filter(yearData => yearData.dataValue.sweep === true)  // Filter sweep years
.map((yearData, index) => (
```

### Step 4: Same for Person 2 (Line 851-853)

FROM:
```jsx
{[
  { yearValue: year, dataValue: pinYear2[0], isCurrent: true },
  { yearValue: nxYear, dataValue: pinYear2[0], isCurrent: false },
].map((yearData, index) => (
```

TO:
```jsx
{[
  { yearValue: year, dataValue: pinYear2[0], isCurrent: true },
  { yearValue: nxYear, dataValue: pinYear2[0], isCurrent: false },
]
.filter(yearData => yearData.dataValue.sweep === true)  // Filter sweep years
.map((yearData, index) => (
```

### Option B: Simple Quick Implementation (without defining sweep logic)

If you just want to hide certain years temporarily without understanding sweep:

```jsx
// Show only current year (hide next year)
{[
  { yearValue: year, dataValue: pinYear[0], isCurrent: true },
  // { yearValue: nxYear, dataValue: pinYear[0], isCurrent: false },  // Hidden
]
.map((yearData, index) => (
```

Or:

```jsx
// Show years based on a hardcoded condition
{[
  { yearValue: year, dataValue: pinYear[0], isCurrent: true },
  { yearValue: nxYear, dataValue: pinYear[0], isCurrent: false },
]
.filter(yearData => {
  // Example: Only show if personal year is 1, 5, or 9
  return pinYear[0].PerY === 1 || pinYear[0].PerY === 5 || pinYear[0].PerY === 9;
})
.map((yearData, index) => (
```

---

## Testing Checklist

After implementing changes:

- [ ] Year labels now appear ABOVE pinaculo charts (not below)
- [ ] Both Person 1 and Person 2 sliders show year labels
- [ ] Year labels are centered horizontally
- [ ] Spacing between label and chart looks correct
- [ ] If sweep filtering is implemented:
  - [ ] Only sweep years are displayed
  - [ ] Non-sweep years are hidden
  - [ ] Swiper navigation still works correctly with filtered years
- [ ] Responsive design works on mobile (flexbox applied correctly)
- [ ] SVG charts still render properly below labels
- [ ] No console errors

---

## Rollback Instructions

If you need to revert changes:

1. Replace .year-chart-slide CSS with original (remove flex-direction: column and order: -1)
2. Replace .year-label CSS with original (remove order: -1, change margins back)
3. Move <p className="year-label"> back to after YearChartComponent in JSX
4. Remove .filter() calls if sweep filtering was added
5. Remove sweep property from GetYear() return object if added

