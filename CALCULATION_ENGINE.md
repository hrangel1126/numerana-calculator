# Numerana Calculator - Calculation Engine Deep Dive

## Overview

The **calculosUtils.js** file (1,297 lines) is the computational heart of the application. It contains all numerological algorithms converted from the original Angular service. This document provides detailed understanding of how calculations work.

---

## Core Numerological Principles

### Digital Root
A digital root is obtained by iteratively summing digits until a single digit remains (or a master number).

**Example:**
```
25/05/1990
├─ Day: 25 → 2+5 = 7
├─ Month: 05 → 0+5 = 5
├─ Year: 1990 → 1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1
```

### Master Numbers
Certain numbers have special significance and are NOT reduced further:
- **11** (Master intuition) → displays as "11/2" (11 with single digit 2)
- **22** (Master builder) → displays as "22/4"
- **33** (Master teacher) → displays as "33/6"
- **44, 55, 66, 77, 88, 99** → follow same pattern

**Master Number Format:**
```
11 → "11/2"     (11 never becomes 2, but 2 is its reduction)
22 → "22/4"
33 → "33/6"
etc.
```

### Pinaculo Structure
The pinaculo is a pyramid with 15 numerological positions:
```
                    top
                   /   \
                 P1     P2
                /  \   /  \
               A    D    C
              / \  / \  / \
            P3  P4  P5   (bottom connection)
           / \ / \ / \
          N1 N2 N3  N4
                |
            bottom (sum of all)
```

**Position Meanings:**
- **A, B, C, D** - Core life numbers (month, day, year components, sum)
- **P1-P5** - Pinnacles (major life periods)
- **N1-N4** - Challenges (obstacles and lessons)
- **top** - Universal energy
- **bottom** - Personal integration

---

## Main Calculation Functions

### 1. GetFirstLine(date: String) → Array

**Purpose:** Calculate the pinaculo pyramid structure

**Input Format:** `"DD/MM/YYYY"` (e.g., "25/05/1990")

**Output:** `[{ A, B, C, D, P1-P5, N1-N4, top, bottom }]`

**Algorithm:**

```javascript
GetFirstLine(date) {
  // Parse date: "DD/MM/YYYY"
  // ├─ Extract day, month, year
  // ├─ Sum each component to single digit (respecting master numbers)
  // └─ Store as A, B, C
  
  A = reduce(month)        // e.g., 05 → 5
  B = reduce(day)          // e.g., 25 → 2+5 = 7
  C = reduce(year)         // e.g., 1990 → 1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1
  
  D = sum(A, B)            // 5 + 7 = 12 → 1+2 = 3
  
  // Calculate Pinnacles
  P1 = sum(A, B)           // Same as D
  P2 = sum(B, C)           // 7 + 1 = 8
  P3 = sum(P1, P2)         // 3 + 8 = 11 (MASTER!)
  P4 = sum(A, C)           // 5 + 1 = 6
  P5 = sum(P3, P4)         // sum(11, 6) = 17 → 1+7 = 8
  
  // Calculate Challenges (absolute differences)
  N1 = |A - B|             // |5 - 7| = 2
  N2 = |B - C|             // |7 - 1| = 6
  N3 = |N1 - N2|           // |2 - 6| = 4
  N4 = |A - C|             // |5 - 1| = 4
  
  // Calculate corners
  top = sum(A, B, C)       // 5 + 7 + 1 = 13 → 1+3 = 4
  bottom = sum(P1, P2, P3, P4, P5)  // sum(3,8,11,6,8) = 36 → 3+6 = 9
  
  return [{ A, B, C, D, P1, P2, P3, P4, P5, N1, N2, N3, N4, top, bottom }]
}
```

**Example Walkthrough:**
```
Input: "25/05/1990"

Parse:
  DD = 25, MM = 05, YYYY = 1990

Reduce:
  A = reduce(05) = 5
  B = reduce(25) = 2+5 = 7
  C = reduce(1990) = 1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1

Calculate D:
  D = sum(5, 7) = 12 → 1+2 = 3

Pinnacles:
  P1 = 3 (same as D)
  P2 = 7 + 1 = 8
  P3 = 3 + 8 = 11 ← MASTER NUMBER! Format as "11/2"
  P4 = 5 + 1 = 6
  P5 = sum(11, 6) = 17 → 1+7 = 8

Challenges:
  N1 = |5 - 7| = 2
  N2 = |7 - 1| = 6
  N3 = |2 - 6| = 4
  N4 = |5 - 1| = 4

Corners:
  top = 5 + 7 + 1 = 13 → 1+3 = 4
  bottom = 3 + 8 + 11 + 6 + 8 = 36 → 3+6 = 9

Result:
{
  A: 5,
  B: 7,
  C: 1,
  D: 3,
  P1: 3,
  P2: 8,
  P3: "11/2",  ← Master number with reduction
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

**Date Format Notes:**
- Input must be **DD/MM/YYYY** format
- Different from GetYear which expects MM/DD/YYYY
- Critical for correct calculation

---

### 2. GetYear(date: String) → Object

**Purpose:** Calculate annual numerology (Personal Year, Universal Year, Pinnacles, Challenges)

**Input Format:** `"MM/DD/YYYY"` (e.g., "05/25/1990") **← Different from GetFirstLine!**

**Output:** 
```javascript
{
  Cage: number,           // Age reduced to single digit
  PerY: number,           // Personal Year
  UniYear: number,        // Universal Year
  P1: number,             // Pinnacle 1
  P2: number,             // Pinnacle 2
  P3: number,             // Pinnacle 3
  Pb: number,             // Challenge b
  Pc: number,             // Challenge c
  
  // Next year values (prefixed with Nx)
  NextPY: number,
  NextUY: number,
  NxAge: number,
  NxP1, NxP2, NxP3: number,
  NxPb, NxPc: number
}
```

**Algorithm:**

```javascript
GetYear(date) {
  // Parse date: "MM/DD/YYYY"
  const month = parseInt(date.substring(0, 2));
  const day = parseInt(date.substring(3, 5));
  const year = parseInt(date.substring(6, 10));
  
  // Calculate current age and reduce
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  Cage = reduce(age);
  
  // Personal Year = reduce(month + day + current_year)
  PerY = reduce(month + day + currentYear);
  
  // Universal Year = reduce(current_year)
  UniYear = reduce(currentYear);
  
  // Pinnacles based on birth components
  // (Uses birth month, day, year reduced values)
  P1 = reduce(month) + reduce(day);
  P2 = reduce(day) + reduce(year);
  P3 = P1 + P2;
  
  // Challenges
  Pb = |reduce(month) - reduce(day)|;
  Pc = |reduce(day) - reduce(year)|;
  
  // Calculate next year values (same formulas with nextYear)
  // ...
  
  return {
    Cage, PerY, UniYear, P1, P2, P3, Pb, Pc,
    NextPY, NextUY, NxAge, NxP1, NxP2, NxP3, NxPb, NxPc
  }
}
```

**Example:**
```
Input: "05/25/1990"

Current date: May 25, 2026 (example)

Parse:
  month = 5, day = 25, year = 1990

Age:
  age = 2026 - 1990 = 36
  Cage = reduce(36) = 3+6 = 9

Personal Year:
  PerY = reduce(5 + 25 + 2026)
       = reduce(2056)
       = 2+0+5+6 = 13 → 1+3 = 4

Universal Year:
  UniYear = reduce(2026) = 2+0+2+6 = 10 → 1+0 = 1

Pinnacles:
  P1 = reduce(5) + reduce(25) = 5 + 7 = 12 → 1+2 = 3
  P2 = reduce(25) + reduce(1990) = 7 + 1 = 8
  P3 = 3 + 8 = 11 ← MASTER!

Challenges:
  Pb = |5 - 7| = 2
  Pc = |7 - 1| = 6

Next Year (2027):
  Similar calculations with 2027 as current year
```

**Date Format Notes:**
- Input format is **MM/DD/YYYY** (month first)
- This is different from GetFirstLine (DD/MM/YYYY)
- Must be carefully handled in component layer

---

### 3. GetMonth(date: String) → Array

**Purpose:** Calculate monthly numerology for all 12 months

**Input Format:** `"MM/DD/YYYY"` (e.g., "05/25/1990")

**Output:** `[currentYearMonths[], nextYearMonths[]]`

Each month object: `{ Mon, Yea, MU, MP, PT, PL, PR }`

**Algorithm:**

```javascript
GetMonth(date) {
  const currentYearMonths = [];
  const nextYearMonths = [];
  
  // Calculate for current year
  for (month = 1; month <= 12; month++) {
    MU = reduce(month + currentYear);      // Universal Month
    MP = reduce(MU + PerYear);             // Personal Month
    PT = reduce(day + month);              // Top Point
    PL = reduce(month + day);              // Left Point
    PR = reduce(month);                    // Right Point
    
    currentYearMonths.push({
      Mon: monthName(month),
      Yea: currentYear,
      MU: MU,
      MP: MP,
      PT: PT,
      PL: PL,
      PR: PR
    });
  }
  
  // Similar for next year
  for (month = 1; month <= 12; month++) {
    // ... same logic with nextYear
  }
  
  return [currentYearMonths, nextYearMonths];
}
```

**Data Structure:**
```javascript
// Each month object contains:
{
  Mon: "JAN/ENE",                    // Bilingual month name
  Yea: 2026,                         // Year
  MU: 3,                             // Universal Month
  MP: 7,                             // Personal Month
  PT: 6,                             // Top Point
  PL: 8,                             // Left Point
  PR: 5                              // Right Point
}
```

**Output Structure:**
```javascript
[
  // Current year months
  [
    { Mon: "JAN/ENE", Yea: 2026, MU: 3, MP: 7, PT: 6, PL: 8, PR: 5 },
    { Mon: "FEB/FEB", Yea: 2026, MU: 4, MP: 8, PT: 7, PL: 9, PR: 2 },
    // ... 10 more months
  ],
  // Next year months
  [
    { Mon: "JAN/ENE", Yea: 2027, MU: 4, MP: 8, PT: 6, PL: 8, PR: 5 },
    // ... 12 more months
  ]
]
```

---

### 4. GetDays(date: String) → Array

**Purpose:** Calculate daily numerology for all days in current and next year

**Input Format:** `"DD/MM/YYYY"` (e.g., "25/05/1990") **← Different from GetMonth!**

**Output:** `[currentYearDays[], nextYearDays[]]`

Each day object: `{ day, universal, personal, vibra22 }`

**Algorithm:**

```javascript
GetDays(date) {
  const currentYearDays = [];
  const nextYearDays = [];
  
  // Get personal year values for both years
  const currentPersonalYear = getPersonalYear(currentYear);
  const nextPersonalYear = getPersonalYear(nextYear);
  
  // Calculate for each day in current year
  for (month = 1; month <= 12; month++) {
    for (day = 1; day <= daysInMonth(month); day++) {
      
      // Universal day number
      universal = reduce(month + day + currentYear);
      
      // Personal day number
      personal = reduce(universal + currentPersonalYear);
      
      // Check if special "vibra22" day
      vibra22 = (universal === 22 || personal === 22);
      
      currentYearDays.push({
        month: month,
        day: day,
        universal: universal,
        personal: personal,
        vibra22: vibra22
      });
    }
  }
  
  // Similar for next year
  // ...
  
  return [currentYearDays, nextYearDays];
}
```

**Data Structure:**
```javascript
// Each day object
{
  day: 25,                    // Day of month (1-31)
  universal: 8,              // Universal day number (1-9, 11, 22, etc.)
  personal: 4,               // Personal day number (1-9, 11, 22, etc.)
  vibra22: false             // Is this a "vibra22" day?
}
```

**Output Structure:**
```javascript
[
  // Current year, organized by month
  [
    {
      year: 2026,
      month: 1,
      days: [
        { day: 1, universal: 3, personal: 7, vibra22: false },
        { day: 2, universal: 4, personal: 8, vibra22: false },
        { day: 3, universal: 5, personal: 9, vibra22: false },
        // ... up to 31 days
      ]
    },
    // ... 11 more months
  ],
  // Next year
  [
    // ... similar structure
  ]
]
```

**Vibra22 Significance:**
- Special days where the number 22 appears in calculations
- Marked for special numerological significance
- Highlighted in UI with special styling

---

## Helper Functions

### 1. sum(s1, s2) → Number

Numerological addition with master number support

```javascript
sum(s1, s2) {
  const n1 = cleanint(s1);    // Extract numeric value
  const n2 = cleanint(s2);
  const total = n1 + n2;
  
  if (total <= 9) return total;
  if (total === 11 || total === 22 || /* etc */) return total;  // Master
  
  // Recurse to reduce
  return reduce(total);
}
```

**Examples:**
```
sum(5, 7) = 12 → 3       (not a master)
sum(5, 6) = 11 → "11/2"  (master number)
sum(3, 8) = 11 → "11/2"  (master number)
```

### 2. subs(s1, s2) → Number

Numerological subtraction

```javascript
subs(s1, s2) {
  const n1 = cleanint(s1);
  const n2 = cleanint(s2);
  let result = n1 - n2;
  
  if (result <= 0) result += 9;  // Wrap around
  
  return reduce(result);
}
```

**Examples:**
```
subs(7, 2) = 5
subs(3, 5) = 3 + 9 = 12 → 3
```

### 3. reduce(number) → Number or String

Convert any number to single digit or master number

```javascript
reduce(num) {
  let sum = 0;
  let temp = Math.abs(num);
  
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  
  if (sum <= 9) return sum;
  
  // Check for master numbers
  if (sum === 11) return "11/2";
  if (sum === 22) return "22/4";
  if (sum === 33) return "33/6";
  // ... etc
  
  // Recurse if not master
  return reduce(sum);
}
```

**Examples:**
```
reduce(25) = 2+5 = 7
reduce(1990) = 1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1
reduce(19) = 1+9 = 10 → 1+0 = 1
reduce(22) = "22/4"
reduce(44) = "44/8"
```

### 4. cleanint(value) → Number

Extract numeric integer from master number notation

```javascript
cleanint(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    if (value.includes('/')) {
      return parseInt(value.split('/')[1]);  // Get reduction
    }
    return parseInt(value);
  }
  return 0;
}
```

**Examples:**
```
cleanint(5) = 5
cleanint("5") = 5
cleanint("11/2") = 2        // Extract reduction
cleanint("22/4") = 4
```

### 5. checkmaster(master) → String or Number

Convert any number to its proper numerological value

```javascript
checkmaster(num) {
  if (num <= 9) return num;
  
  // Check for master numbers
  const masters = [11, 22, 33, 44, 55, 66, 77, 88, 99];
  if (masters.includes(num)) {
    return formatMaster(num);  // "11/2", "22/4", etc.
  }
  
  // Reduce recursively
  return reduce(num);
}
```

### 6. MasterNo(master) → String or Number

Specialized master number detection and formatting

```javascript
MasterNo(num) {
  const masterMap = {
    11: "11/2",
    22: "22/4",
    33: "33/6",
    44: "44/8",
    55: "55/1",  // Special rule
    66: "66/3",
    77: "77/5",
    88: "88/7",
    99: "99/9"
  };
  
  if (masterMap[num]) return masterMap[num];
  return reduce(num);  // Regular reduction
}
```

---

## Combination Functions

### 1. combine3(pin1, pin2) → Object

Combine two pinaculo sets for synastry (couple compatibility)

```javascript
combine3(pin1, pin2) {
  const combined = {};
  
  // Combine each position
  combined.A = sum(pin1.A, pin2.A);
  combined.B = sum(pin1.B, pin2.B);
  combined.C = sum(pin1.C, pin2.C);
  combined.D = sum(pin1.D, pin2.D);
  
  // Combine pinnacles
  combined.P1 = sum(pin1.P1, pin2.P1);
  combined.P2 = sum(pin1.P2, pin2.P2);
  // ... etc for all positions
  
  return combined;
}
```

**Usage in Couple Component:**
```javascript
const pin1 = calculosUtils.GetFirstLine(date1);
const pin2 = calculosUtils.GetFirstLine(date2);
const combined = calculosUtils.combine3(pin1[0], pin2[0]);
// combined = synastry pinaculo
```

### 2. GetMonthCouple(dateA, dateB, isCouple) → Array

Calculate couple monthly data

```javascript
GetMonthCouple(dateA, dateB, isCouple) {
  const monthsA = GetMonth(dateA);
  const monthsB = GetMonth(dateB);
  
  const combined = [];
  
  // Combine each month
  for (let i = 0; i < 12; i++) {
    combined.push({
      Mon: monthsA[i].Mon,
      Yea: monthsA[i].Yea,
      MU: sum(monthsA[i].MU, monthsB[i].MU),
      MP: sum(monthsA[i].MP, monthsB[i].MP),
      PT: sum(monthsA[i].PT, monthsB[i].PT),
      PL: sum(monthsA[i].PL, monthsB[i].PL),
      PR: sum(monthsA[i].PR, monthsB[i].PR)
    });
  }
  
  return combined;
}
```

### 3. GetDaysCouple(dateA, dateB, isCouple) → Array

Calculate couple daily data

Similar to GetMonthCouple but for daily values

---

## Common Errors & Issues

### Issue 1: Date Format Mismatch
**Problem:** Using MM/DD/YYYY with GetFirstLine or DD/MM/YYYY with GetYear

```javascript
// WRONG:
const pin = calculosUtils.GetFirstLine("05/25/1990");  // MM/DD/YYYY
// Should be:
const pin = calculosUtils.GetFirstLine("25/05/1990");  // DD/MM/YYYY

// WRONG:
const year = calculosUtils.GetYear("25/05/1990");  // DD/MM/YYYY
// Should be:
const year = calculosUtils.GetYear("05/25/1990");  // MM/DD/YYYY
```

**Solution:** Always verify date format for each function

### Issue 2: Master Number Not Displaying Correctly
**Problem:** Master number returned as string "11/2" instead of object

```javascript
// Check type before rendering
const value = pin.P3;  // Could be 3 or "11/2"
if (typeof value === 'string') {
  // Handle master number
  return <span>{value}</span>;
}
```

### Issue 3: Infinite Recursion in Reduce
**Problem:** reduce() function loops infinitely on invalid input

```javascript
// Safeguard: Check for edge cases
reduce(num) {
  if (!num || num === 0) return 0;
  if (num === Infinity) return 9;
  // ... rest of function
}
```

---

## Calculation Examples

### Example 1: Birth Date 25/05/1990

**GetFirstLine Calculation:**
```
Input: "25/05/1990"

Month (05):   0+5 = 5
Day (25):     2+5 = 7
Year (1990):  1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1

A = 5
B = 7
C = 1
D = 5+7 = 12 → 1+2 = 3

P1 = 3
P2 = 7+1 = 8
P3 = 3+8 = 11 ← MASTER
P4 = 5+1 = 6
P5 = 11+6 = 17 → 1+7 = 8

N1 = |5-7| = 2
N2 = |7-1| = 6
N3 = |2-6| = 4
N4 = |5-1| = 4

top = 5+7+1 = 13 → 1+3 = 4
bottom = 3+8+11+6+8 = 36 → 3+6 = 9

Result:
{
  A: 5, B: 7, C: 1, D: 3,
  P1: 3, P2: 8, P3: "11/2", P4: 6, P5: 8,
  N1: 2, N2: 6, N3: 4, N4: 4,
  top: 4, bottom: 9
}
```

### Example 2: Couple Combination

**Input:**
- Person A: P3 = "11/2"
- Person B: P3 = 3

**Combine:**
```
combine3.P3 = sum("11/2", 3)
            = sum(2, 3)         // cleanint extracts 2 from "11/2"
            = 5
```

**Result:** Combined P3 = 5 (not a master number in this case)

---

## Performance Considerations

### Expensive Operations
1. **GetDays()** - Calculates 365+ days per year (expensive)
2. **GetMonth()** - Calculates 12 months × 2 years
3. **GetFirstLine()** - Moderate (fixed calculation)
4. **GetYear()** - Moderate (fixed calculation)

### Optimization Techniques Used
1. **useMemo** in components to cache GetMonth/GetDays results
2. **Conditional rendering** to avoid unnecessary calculations
3. **Component splitting** to localize calculations

### Caching Strategy
```javascript
// In DayTable.jsx
const processedDays = useMemo(() => {
  return dayData.map(transformDay);
}, [dayData]);

// Only recalculates if dayData changes
```

---

## Testing the Calculation Engine

### Unit Test Example
```javascript
test('GetFirstLine calculates pinaculo correctly', () => {
  const result = calculosUtils.GetFirstLine("25/05/1990");
  
  expect(result[0].A).toBe(5);
  expect(result[0].B).toBe(7);
  expect(result[0].C).toBe(1);
  expect(result[0].D).toBe(3);
  expect(result[0].P3).toBe("11/2");
  expect(result[0].bottom).toBe(9);
});
```

### Integration Test Example
```javascript
test('Single person flow calculates correctly', () => {
  const date = "25/05/1990";
  
  const pin = calculosUtils.GetFirstLine(date);
  const year = calculosUtils.GetYear("05/25/1990");
  const months = calculosUtils.GetMonth("05/25/1990");
  
  expect(pin[0].A).toBeDefined();
  expect(year.PerY).toBeDefined();
  expect(months[0].length).toBe(12);
});
```

---

## Quick Reference Table

| Function | Input Format | Output | Purpose |
|----------|-------------|--------|---------|
| GetFirstLine | DD/MM/YYYY | Pinaculo object | Birth pyramid |
| GetYear | MM/DD/YYYY | Year data object | Annual numerology |
| GetMonth | MM/DD/YYYY | 2D array | Monthly breakdown |
| GetDays | DD/MM/YYYY | 3D array | Daily breakdown |
| reduce | number | number/string | Digital root |
| sum | 2 numbers | number/string | Numerological add |
| combine3 | 2 pinaculos | pinaculo | Synastry |

---

## Summary

The calculation engine is a sophisticated numerological system with:
- **15-node pinaculo structure** for life path analysis
- **Master number support** for special significance
- **Annual, monthly, and daily breakdowns** for temporal analysis
- **Synastry calculations** for relationship compatibility
- **Complex reduction rules** for digital roots

Key challenges:
- Date format inconsistency (DD/MM vs MM/DD)
- Master number handling in calculations
- Performance optimization for large datasets
- Accuracy of complex mathematical rules

---

**Last Updated:** May 25, 2026  
**Complexity:** Advanced  
**Critical Attention Areas:** Date formats, Master numbers, Calculation accuracy
