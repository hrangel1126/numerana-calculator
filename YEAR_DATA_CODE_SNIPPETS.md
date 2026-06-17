# Code Snippets Reference - Year Calculation Details

## Complete GetYear() Return Object Structure

From: calculosUtils.js, Lines 536-553

```javascript
return {
  // Current Year Values
  Cage: Cage,                 // Current age reduced to single digit (e.g., 42 => 6)
  PerY: personalYear,         // Personal Year (reduced sum of day + month + universal year)
  UniYear: universalYear,     // Universal Year (current year reduced to single digit)
  
  // Current Year Pinnacles
  P1: P1,                     // Pinnacle 1 = sum(universalYear, personalYear)
  P2: P2,                     // Pinnacle 2 = sum(personalYear, Cage)
  P3: P3,                     // Pinnacle 3 = sum(P1, P2)
  
  // Current Year Supporting Numbers
  Pb: Pb,                     // Bridge number = sum(universalYear, Cage)
  Pc: Pc,                     // Challenge number = sum(P1 + P3 + P2)
  
  // Next Year Values
  NextUY: nextUniversalYear,  // Next Universal Year
  NextPY: nextPersonalYear,   // Next Personal Year
  NxAge: NxAge,               // Next age (reduced)
  
  // Next Year Pinnacles
  NxP1: NxP1,                 // Next Pinnacle 1
  NxP2: NxP2,                 // Next Pinnacle 2
  NxP3: NxP3,                 // Next Pinnacle 3
  
  // Next Year Supporting Numbers
  NxPb: NxPb,                 // Next Bridge number
  NxPc: NxPc                  // Next Challenge number
};
```

## Data Flow Diagram

```
Birth Date (MM/DD/YYYY)
         |
         v
    GetYear() function (calculosUtils.js:444-558)
         |
         v
   Year Data Object (16 properties)
         |
         v
    setState([yearData])  => pinYear / pinYear2
         |
         v
    pinYear[0] / pinYear2[0]
         |
         v
    YearChartComponent props
         |
         v
    YearSvg component
         |
         v
    SVG rendering with year values
```

## Year Data Access Pattern

Current usage in CoupleComponent.jsx:

```jsx
// Line 269-273: Getting year data
const yearData1 = calculosUtils.GetYear(birthdate);     // Returns object
setPinYear([yearData1]);                                 // Wraps in array

// Line 826-827: Using year data in slider
{ yearValue: year, dataValue: pinYear[0], isCurrent: true }
                              ^
                        Access first (and only) element

// Line 831-834: Passing to component
<YearChartComponent
  year={yearData.yearValue}          // e.g., 2026
  data={yearData.dataValue}          // The full year data object
  isCurrentYear={yearData.isCurrent} // Boolean flag
/>
```

## CSS Class Hierarchy for Year Charts

```
.couple-year-charts-section (wrapper)
  |-- .couple-year-charts-container
  |   |-- .couple-year-charts-row
  |       |-- .couple-person-year-charts (Person 1)
  |       |   |-- .year-slider-wrapper
  |       |       |-- .person-year-swiper
  |       |           |-- .swiper-slide (each year)
  |       |               |-- .year-chart-slide
  |       |               |   |-- YearChartComponent
  |       |               |   |   |-- .centerVertHoriz
  |       |               |   |       |-- YearSvg (SVG)
  |       |               |   |-- .year-label
  |       |               
  |       |-- .couple-person-year-charts (Person 2)
  |           |-- [Same structure, missing year-label]
```

## Key Takeaways

1. **Array Structure**: Year data is wrapped in an array [1] element
2. **Object Properties**: 16 properties total - 8 for current, 8 for next
3. **Rendering Logic**: Conditional based on isCurrentYear prop
4. **No Sweep Filter**: No sweep property exists
5. **Label Missing**: Person 2 missing year label
6. **Label Position**: Currently at bottom, should be at top
7. **Combined Data**: rpinaculo3 properly combines both persons

