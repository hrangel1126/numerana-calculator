# QUICK REFERENCE CARD - Annual Year Data

## Data Structure Overview

```
GetYear() Returns:
├─ Current Year
│  ├─ UniYear (Universal Year)
│  ├─ PerY (Personal Year)
│  ├─ Cage (Current Age)
│  ├─ P1, P2, P3 (Pinnacles)
│  ├─ Pb (Bridge)
│  └─ Pc (Challenge)
│
└─ Next Year
   ├─ NextUY (Next Universal Year)
   ├─ NextPY (Next Personal Year)
   ├─ NxAge (Next Age)
   ├─ NxP1, NxP2, NxP3 (Pinnacles)
   ├─ NxPb (Bridge)
   └─ NxPc (Challenge)
```

## HTML Structure (Current)

```
.couple-year-charts-section
└── .couple-year-charts-container
    └── .couple-year-charts-row
        ├── .couple-person-year-charts (Person 1)
        │   └── .person-year-swiper (Swiper)
        │       └── .swiper-slide (each year)
        │           └── .year-chart-slide (FLEX)
        │               ├── YearChartComponent
        │               │   └── YearSvg (SVG)
        │               └── .year-label "2026"
        │
        └── .couple-person-year-charts (Person 2)
            └── .person-year-swiper (Swiper)
                └── .swiper-slide (each year)
                    └── .year-chart-slide (FLEX)
                        ├── YearChartComponent
                        │   └── YearSvg (SVG)
                        └── .year-label "2026" MISSING!
```

## Required HTML Structure (Fixed)

```
.year-chart-slide
├── .year-label "2026" (MOVED TO TOP)
└── YearChartComponent
    └── YearSvg (SVG)
```

## CSS Property Changes Needed

| Class | Property | Current | Required |
|-------|----------|---------|----------|
| `.year-chart-slide` | display | flex | flex |
| `.year-chart-slide` | flex-direction | (default) | column |
| `.year-chart-slide` | justify-content | center | flex-start |
| `.year-chart-slide` | align-items | center | center |
| `.year-label` | margin-top | 1rem | 0 |
| `.year-label` | margin-bottom | (none) | 0.5rem |
| `.year-label` | order | (none) | -1 |

## Code Changes Checklist

```jsx
// CHANGE 1: Move label in Person 1 slider (Line 824-838)
[ ] Reorder: <label> BEFORE <YearChartComponent>

// CHANGE 2: Add missing label in Person 2 slider (Line 854-862)
[ ] Add: <p className="year-label">{yearData.yearValue}</p>
[ ] Place BEFORE <YearChartComponent>

// CHANGE 3: Update CSS for .year-chart-slide (Line 217-223)
[ ] Add: flex-direction: column;
[ ] Change: justify-content: flex-start;

// CHANGE 4: Update CSS for .year-label (Line 104-110)
[ ] Remove: margin-top: 1rem;
[ ] Add: margin-bottom: 0.5rem;
[ ] Add: order: -1;

// CHANGE 5: Implement sweep filtering (Optional)
[ ] Add sweep property to GetYear() return
[ ] Add checkSweepYear() method
[ ] Add .filter() in year rendering
```

## Test Cases

```
TEST 1: Label Positioning
- Open couple calculator
- Generate results with year data
- Check that year labels appear ABOVE charts
- Both Person 1 and 2 should have labels
- No console errors

TEST 2: Responsive Design
- View on desktop (1200px+)
- View on tablet (768-1024px)
- View on mobile (< 768px)
- Verify flexbox alignment works correctly

TEST 3: Swiper Navigation
- Click next/prev arrows
- Verify labels update with year
- Check no duplicate labels

TEST 4: Sweep Filtering (if implemented)
- Verify only sweep years display
- Verify non-sweep years hidden
- Check swiper still works with fewer items
```

## Line Number Index

| Feature | File | Lines |
|---------|------|-------|
| Year state | CoupleComponent.jsx | 64-65 |
| Year data population | CoupleComponent.jsx | 269-273 |
| Year charts section | CoupleComponent.jsx | 815-871 |
| Person 1 slider | CoupleComponent.jsx | 821-843 |
| Person 2 slider | CoupleComponent.jsx | 846-868 |
| Person 1 year label | CoupleComponent.jsx | 836 |
| Person 2 year label | CoupleComponent.jsx | MISSING |
| rpinaculo3 population | CoupleComponent.jsx | 326-344 |
| GetYear() method | calculosUtils.js | 444-558 |
| GetYear() return | calculosUtils.js | 536-553 |
| .year-label CSS | CoupleComponent.css | 104-110 |
| .year-chart-slide CSS | CoupleComponent.css | 217-223 |
| .couple-year-charts-section CSS | CoupleComponent.css | 1224-1228 |

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Labels below chart | HTML order wrong | Move label BEFORE component |
| Person 2 no label | Missing code | Add label <p> element |
| Labels not centered | Missing CSS | Add align-items: center |
| Labels covering chart | Positioning wrong | Use flex-direction: column |
| Responsive breaks | Flexbox incomplete | Add flex-direction and justify-content |

