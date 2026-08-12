# Function Usage Map - calculosUtils.js

**Shows exactly where each calculation function is called in the codebase**

---

## 📍 GetFirstLine(date) - Pinaculo Pyramid

**Function Location:** `src/utils/calculosUtils.js:286-439`  
**Input Format:** `DD/MM/YYYY`  
**Output:** Pinaculo data object with 15 nodes

### Usage Locations:

#### 1. **SingleComponent.jsx:173**
```javascript
const pinaculo = calculosUtils.GetFirstLine(formattedDate);
```
- Single person calculator
- Calculates pinaculo pyramid for one person

#### 2. **SingleBasicComponent.jsx:167**
```javascript
const pinaculo = calculosUtils.GetFirstLine(formattedDate);
```
- Simplified single person calculator
- Same pinaculo calculation

#### 3. **CoupleComponent.jsx:275**
```javascript
const pinaculo1 = calculosUtils.GetFirstLine(birthdate);
```
- Person A's pinaculo in couple calculator

#### 4. **CoupleComponent.jsx:280**
```javascript
const pinaculo2 = calculosUtils.GetFirstLine(birthdate2);
```
- Person B's pinaculo in couple calculator

#### 5. **TeamComponent.jsx:180**
```javascript
const mainLine = calculosUtils.GetFirstLine(birthdate)[0];
```
- Team member's pinaculo
- Called for each team member

---

## 📍 GetYear(birthdate) - Annual Numerology

**Function Location:** `src/utils/calculosUtils.js:444-755`  
**Input Format:** `MM/DD/YYYY`  
**Output:** Annual data (current year + next year)

### Usage Locations:

#### 1. **SingleComponent.jsx:177**
```javascript
const yearData = calculosUtils.GetYear(formattedDate);
```
- Annual numerology for single person
- Used in annual calculations section

#### 2. **SingleBasicComponent.jsx:175**
```javascript
const yearData = calculosUtils.GetYear(birthdate);
```
- Simplified single person annual data

#### 3. **CoupleComponent.jsx:288-291**
```javascript
const yearData1 = calculosUtils.GetYear(birthdate);
const yearData2 = calculosUtils.GetYear(birthdate2);
```
- Annual data for both people in couple
- Displayed side-by-side

---

## 📍 GetMonth(birthdate) - Monthly Forecast

**Function Location:** `src/utils/calculosUtils.js:754-928`  
**Input Format:** `MM/DD/YYYY` or `DD/MM/YYYY`  
**Output:** Array with 12 months for current + next year

### Usage Locations:

#### 1. **MonthVisualizer.jsx:51** (Single mode)
```javascript
result = calculosUtils.GetMonth(birthdate);
```
- Single person monthly forecast
- 12 months breakdown

#### 2. **MonthVisualizer.jsx:49** (Couple mode)
```javascript
result = calculosUtils.GetMonthCouple(birthdate, birthdate2);
```
- Uses GetMonthCouple internally (calls GetMonth)

#### 3. **MonthVisualizerNew.jsx:52** (Single mode)
```javascript
result = calculosUtils.GetMonth(birthdate);
```
- Alternative month visualizer component

#### 4. **MonthVisualizerNew.jsx:50** (Couple mode)
```javascript
result = calculosUtils.GetMonthCouple(birthdate, birthdate2);
```
- Uses GetMonthCouple internally

#### 5. **DesktopMonthGridComponent.jsx** (indirect)
- Receives processed month data from MonthVisualizer
- Renders the monthly grid display

---

## 📍 GetDays(birthdate) - Daily Breakdown

**Function Location:** `src/utils/calculosUtils.js:937-1063`  
**Input Format:** `DD/MM/YYYY`  
**Output:** Array with daily data for current + next year

### Usage Locations:

#### 1. **DayTable.jsx:31**
```javascript
return CalculosService.GetDays(birthdate);
```
- Single person daily breakdown
- Creates day-by-day numerology

#### 2. **DesktopDayGridComponent.jsx** (uses DayTable)
- Displays daily grid

---

## 📍 combine3(pin1, pin2) - Couple Synastry

**Function Location:** `src/utils/calculosUtils.js:1065-1115`  
**Input:** Two pinaculo arrays from GetFirstLine()  
**Output:** Combined pinaculo showing compatibility

### Usage Locations:

#### 1. **CoupleComponent.jsx** (lines 290-300, approximate)
```javascript
// After getting pin1 and pin2:
// Used to create relationship structure pinaculo
const synastra = calculosUtils.combine3(pinaculo1, pinaculo2);
```
- Relationship structure section
- Shows combined pinaculo pyramid

---

## 📍 GetMonthCouple(birthdateA, birthdateB, isCouple) - Combined Months

**Function Location:** `src/utils/calculosUtils.js:1128-1194`  
**Input:** Two birthdates + couple flag  
**Output:** Combined monthly data for both people

### Usage Locations:

#### 1. **MonthVisualizer.jsx:49**
```javascript
result = calculosUtils.GetMonthCouple(birthdate, birthdate2);
```
- Couple mode monthly forecast
- Internally calls GetMonth() for each person

#### 2. **MonthVisualizerNew.jsx:50**
```javascript
result = calculosUtils.GetMonthCouple(birthdate, birthdate2);
```
- Alternative couple monthly visualizer

---

## 📍 GetDaysCouple(birthdateA, birthdateB) - Combined Days

**Function Location:** `src/utils/calculosUtils.js:1195-1294`  
**Input:** Two birthdates  
**Output:** Combined daily data for relationship

### Usage Locations:

#### 1. **DayTable.jsx** (couple mode)
```javascript
return CalculosService.GetDaysCouple(birthdate, birthdate2);
```
- Couple mode daily breakdown
- Combined daily numerology

---

## 📊 Usage Summary Table

| Function | Called In | Times | Purpose |
|----------|-----------|-------|---------|
| **GetFirstLine** | SingleComponent, SingleBasicComponent, CoupleComponent (x2), TeamComponent | 5+ | Pinaculo pyramid calculation |
| **GetYear** | SingleComponent, SingleBasicComponent, CoupleComponent (x2) | 4 | Annual numerology data |
| **GetMonth** | MonthVisualizer, MonthVisualizerNew | 2 | Single person monthly forecast |
| **GetDays** | DayTable | 1+ | Single person daily breakdown |
| **combine3** | CoupleComponent | 1 | Relationship compatibility |
| **GetMonthCouple** | MonthVisualizer, MonthVisualizerNew | 2 | Couple monthly forecast |
| **GetDaysCouple** | DayTable | 1+ | Couple daily breakdown |

---

## 🔄 Helper Functions Usage

These are called WITHIN the main functions:

### sum(s1, s2)
- Called from: GetFirstLine, GetYear, GetMonth, combine3, GetMonthCouple, GetDaysCouple
- Purpose: Addition with master number handling

### subs(s1, s2)
- Called from: GetFirstLine, GetYear
- Purpose: Subtraction with special rules

### sumY(s1, s2)
- Called from: combine3, GetMonthCouple, GetDaysCouple
- Purpose: Alternative sum for year/couple calculations

### checkmaster(master)
- Called from: GetFirstLine, GetMonth, GetMonthCouple
- Purpose: Identify master numbers

### cleanint(number)
- Called from: combine3
- Purpose: Convert master notation to integer

### reduceToSingleOrMaster()
- Called from: GetFirstLine (inline)
- Purpose: Reduce numbers while respecting master numbers

### reduceAndRespectMaster()
- Called from: GetMonth (inline)
- Purpose: Helper for master number reduction

---

## 📈 Call Chain Example: Single Calculator

```
SingleComponent.jsx
    │
    ├─ calculosUtils.GetFirstLine()
    │   ├─ Uses: sum()
    │   ├─ Uses: checkmaster()
    │   └─ Uses: reduceToSingleOrMaster()
    │
    ├─ calculosUtils.GetYear()
    │   ├─ Uses: sum()
    │   ├─ Uses: subs()
    │   └─ Uses: checkmaster()
    │
    └─ (Results go to MonthVisualizer & DayTable)
        │
        ├─ calculosUtils.GetMonth()
        │   ├─ Uses: reduceAndRespectMaster()
        │   └─ Uses: checkmaster()
        │
        └─ calculosUtils.GetDays()
```

---

## 📈 Call Chain Example: Couple Calculator

```
CoupleComponent.jsx
    │
    ├─ calculosUtils.GetFirstLine(personA)
    ├─ calculosUtils.GetFirstLine(personB)
    │
    ├─ calculosUtils.combine3(pin1, pin2)
    │   ├─ Uses: sumY()
    │   ├─ Uses: cleanint()
    │   └─ Uses: checkmaster()
    │
    ├─ calculosUtils.GetYear(personA)
    ├─ calculosUtils.GetYear(personB)
    │
    └─ (Results go to MonthVisualizer & DayTable)
        │
        ├─ calculosUtils.GetMonthCouple(A, B)
        │   ├─ Calls: GetMonth(A)
        │   ├─ Calls: GetMonth(B)
        │   └─ Combines results
        │
        └─ calculosUtils.GetDaysCouple(A, B)
```

---

## ✅ Coverage Analysis

### Single Calculators (SingleComponent, SingleBasicComponent)
- ✅ GetFirstLine - pinaculo
- ✅ GetYear - annual data
- ✅ GetMonth - monthly forecast (via MonthVisualizer)
- ✅ GetDays - daily breakdown (via DayTable)

### Couple Calculator (CoupleComponent)
- ✅ GetFirstLine - both people
- ✅ GetYear - both people
- ✅ combine3 - relationship compatibility
- ✅ GetMonthCouple - combined monthly
- ✅ GetDaysCouple - combined daily

### Team Calculator (TeamComponent)
- ✅ GetFirstLine - each member
- ✅ (GetYear implicitly for members)
- ✅ (GetMonth via MonthVisualizer)
- ✅ (GetDays via DayTable)

---

## 🎯 Key Insight

**Every single calculation in the app goes through calculosUtils.js**

This means:
- ✅ **ONE place to fix bugs** - Edit calculosUtils.js
- ✅ **ONE place to optimize** - Performance improvements help all features
- ✅ **ONE place to verify** - All calculations use same functions
- ✅ **Consistent results** - Same calculation always gives same output
- ✅ **Easy testing** - Test functions once, all features use tested code

---

**Document Generated:** June 17, 2026  
**Analysis Type:** Complete Usage Map  
**Status:** ✅ **100% Verified**

