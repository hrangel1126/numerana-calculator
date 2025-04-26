import moment from 'moment';

/**
 * Interfaces from the Angular service converted to JSDoc type definitions
 * @typedef {Object} PinaculoData
 * @property {any} A
 * @property {any} B
 * @property {any} C
 * @property {any} D
 * @property {any} P1
 * @property {any} P2
 * @property {any} P3
 * @property {any} P4
 * @property {any} P5
 * @property {any} top
 * @property {any} N1
 * @property {any} N2
 * @property {any} N3
 * @property {any} N4
 * @property {any} bottom
 */

/**
 * @typedef {Object} IPinYear
 * @property {any} Cage
 * @property {any} NextPY
 * @property {any} NextUY
 * @property {any} NxAge
 * @property {any} NxP1
 * @property {any} NxP2
 * @property {any} NxP3
 * @property {any} NxPb
 * @property {any} NxPc
 * @property {any} P1
 * @property {any} P2
 * @property {any} P3
 * @property {any} Pb
 * @property {any} Pc
 * @property {any} PerY
 * @property {any} UniYear
 */

/**
 * Core calculation methods converted from Angular's CalculosService
 */
export const calculosUtils = {
  /**
   * Performs subtraction between two numbers with special rules
   */
  subs(s1, s2) {
    // Prevent infinite recursion
    let recursionDepth = arguments[2] || 0;
    if (recursionDepth > 10) {
      console.warn("Preventing infinite recursion in subs function", s1, s2);
      return Math.abs((s1 || 0) - (s2 || 0)) % 10; // Fallback calculation
    }

    // Ensure numbers are defined
    s1 = s1 || 0;
    s2 = s2 || 0;

    switch(s1) {
      case 33: {s1=6; break;}
      case 22: {s1=4; break;}
      case 11: {s1=2; break;}
      case 13: {s1=4; break;}
      case 14: {s1=5; break;}
      case 16: {s1=7; break;}
      case 19: {s1=1; break;}
      default: {break;}
    }
    
    switch(s2) {
      case 33: {s2=6; break;}
      case 22: {s2=4; break;}
      case 11: {s2=2; break;}
      case 13: {s2=4; break;}
      case 14: {s2=5; break;}
      case 16: {s2=7; break;}
      case 19: {s2=1; break;}
      default: {break;}
    }
    
    let n1 = s1 < 0 ? s1*-1 : s1;
    let n2 = s2 < 0 ? s2*-1 : s2;
    let r = n1-n2;
    let nr = r < 0 ? r*-1 : r;
    
    if(nr.toString().length > 1) {
      let again = nr.toString().split("").map((t) => parseInt(t));
      if (!again[0] && !again[1]) return 0; // Prevent NaN cases
      return this.subs(again[0] || 0, again[1] || 0, recursionDepth + 1);
    } else {
      return nr;
    }
  },

  /**
   * Performs addition between two numbers with special rules
   */
  sum(s1, s2) {
    let master = [33, 22, 11];
    let suma;

    // Prevent infinite recursion
    let recursionDepth = arguments[2] || 0;
    if (recursionDepth > 10) {
      // console.warn("Preventing infinite recursion in sum function", s1, s2);
      return (s1 + s2) % 10 || 10; // Fallback calculation
    }

    switch(s1) {
      case 33: {s1=6; break;}
      case 22: {s1=4; break;}
      case 11: {s1=2; break;}
      case 13: {s1=4; break;}
      case 14: {s1=5; break;}
      case 16: {s1=7; break;}
      case 19: {s1=1; break;}
      default: {break;}
    }
    
    switch(s2) {
      case 33: {s2=6; break;}
      case 22: {s2=4; break;}
      case 11: {s2=2; break;}
      case 13: {s2=4; break;}
      case 14: {s2=5; break;}
      case 16: {s2=7; break;}
      case 19: {s2=1; break;}
      default: {break;}
    }
    
    suma = s1 + s2;
    let exi;
    
    switch(suma) {
      case 33: {exi=`33/6`; return exi;}
      case 22: {exi=`22/4`; return exi;}
      case 11: {exi=`11/2`; return exi;}
      default: {suma=suma; break;}
    }

    if(suma.toString().length > 1) {
      let again = suma.toString().split("").map((t) => parseInt(t));
      return this.sum(again[0], again[1], recursionDepth + 1);
    } else {
      return suma;
    }
  },

  /**
   * Clean integer value
   */
  cleanint(number) {
    let response;
    switch(number) {
      case '44/8': {response=8; break;}
      case '33/6': {response=6; break;}
      case '22/4': {response=4; break;}
      case '11/2': {response=2; break;}
      default: {response=number; break;}
    }
    return response;
  },

  /**
   * Another method for sum with Y
   */
  sumY(s1, s2) {
    // Prevent infinite recursion
    let recursionDepth = arguments[2] || 0;
    if (recursionDepth > 10) {
      console.warn("Preventing infinite recursion in sumY function", s1, s2);
      return (s1 + s2) % 10 || 10; // Fallback calculation
    }

    let master = [55, 44, 33, 22, 11];
    let suma;
    let suma0 = s1 + s2;

    switch(s1) {
      case 33: {s1=6; break;}
      case 22: {s1=4; break;}
      case 11: {s1=2; break;}
      case 13: {s1=4; break;}
      case 14: {s1=5; break;}
      case 16: {s1=7; break;}
      case 19: {s1=1; break;}
      default: {break;}
    }
    
    switch(s2) {
      case 33: {s2=6; break;}
      case 22: {s2=4; break;}
      case 11: {s2=2; break;}
      case 13: {s2=4; break;}
      case 14: {s2=5; break;}
      case 16: {s2=7; break;}
      case 19: {s2=1; break;}
      default: {break;}
    }
    
    suma = s1 + s2;
    let exi;
    
    switch(suma0) {
      case 44: {exi=44; return exi;}
      case 33: {exi=33; return exi;}
      case 22: {exi=22; return exi;}
      case 11: {exi=11; return exi;}
      default: {suma=suma; break;}
    }

    if(suma.toString().length > 1) {
      try {
        let again = suma.toString().split("").map((t) => parseInt(t));
        return this.sumY(again[0], again[1], recursionDepth + 1);
      } catch(error) {
        console.log('error en suma ', error);
      }
    } else {
      return suma;
    }
  },

  /**
   * Check if a number is a master number
   */
  checkmaster(master) {
    let res;
    switch(master) {
      case 99: {res=`99/9`; return res;}
      case 88: {res=`88/7`; return res;}
      case 77: {res=`77/5`; return res;}
      case 66: {res=`12/3`; return res;}
      case 55: {res=`55/1`; return res;}
      case 44: {res=`44/8`; return res;}
      case 33: {res=`33/6`; return res;}
      case 22: {res=`22/4`; return res;}
      case 11: {res=`11/2`; return res;}
      default: {
        return master.toString().split("").map((t) => parseInt(t))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          .toString().split("").map((t) => parseInt(t))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      }
    }
  },

  /**
   * Get today's month number (1-12)
   */
  getTodaysMonth() {
    return new Promise((resolve) => {
      const current = 1 + moment().month();
      let quarter;
      
      switch(current) {
        case 1: {quarter=1; break;}
        case 2: {quarter=1; break;}
        case 3: {quarter=1; break;}
        case 4: {quarter=1; break;}
        case 5: {quarter=2; break;}
        case 6: {quarter=2; break;}
        case 7: {quarter=2; break;}
        case 8: {quarter=2; break;}
        case 9: {quarter=3; break;}
        case 10: {quarter=3; break;}
        case 11: {quarter=3; break;}
        case 12: {quarter=3; break;}
        default: {quarter=99; break;}
      }
      
      resolve(quarter);
    });
  },


 /**
 * Calculates numerological values based on a birth date.
 * Assumes helper functions this.checkmaster, this.sumY, this.sum, this.subs, this.cleanint are defined elsewhere.
 * @param {string} date - The birth date in DD/MM/YYYY format.
 * @returns {object} An object containing the calculated values, or an empty object on error.
 */
GetFirstLine(date) {
  // --- Input Validation ---
  if (!date || typeof date !== 'string') {
      console.error('GetFirstLine Error: Input date is invalid or missing.', date);
      return {}; // Return empty object for invalid input
  }

  const dateParts = date.split('/');
  if (dateParts.length !== 3) {
      console.error('GetFirstLine Error: Invalid date format. Expected DD/MM/YYYY.', date);
      return {}; // Return empty object for invalid format
  }

  const dayStr = dateParts[0];
  const monthStr = dateParts[1];
  const yearStr = dateParts[2];

  const dayInt = parseInt(dayStr);
  const monthInt = parseInt(monthStr);
  const yearInt = parseInt(yearStr);

  if (isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt) ||
      dayStr.length > 2 || monthStr.length > 2 || yearStr.length !== 4 || // Basic sanity check
      dayInt < 1 || dayInt > 31 || monthInt < 1 || monthInt > 12 || yearInt < 1000) { // Basic date validity
      console.error('GetFirstLine Error: Invalid date numbers.', date);
      return {}; // Return empty object for invalid numbers/range
  }

  // --- Calculation Logic (mirrors Function 1) ---
  try {
      const master = [99, 88, 77, 66, 55, 44, 33, 22, 11];

      // Convert parts to arrays of digits
      const dayArr = dayStr.split("").map(Number); // Use Number constructor for clarity
      const monthArr = monthStr.split("").map(Number);
      const yearArr = yearStr.split("").map(Number);

      // Helper for the reduction logic (digital root unless first sum is master)
      const reduceToSingleOrMaster = (digits) => {
          const initialSum = digits.reduce((a, c) => a + c, 0);
          if (master.includes(initialSum)) {
              return initialSum;
          }
          // If not master, reduce potentially multiple times to get single digit
          let currentSum = initialSum;
          while (currentSum > 9 && !master.includes(currentSum)) { // Check master again just in case intermediate sum matches
               currentSum = currentSum.toString().split("").map(Number).reduce((a, c) => a + c, 0);
          }
           // One final check needed if the loop terminated because currentSum <= 9
           if (currentSum > 9 && master.includes(currentSum)) {
               return currentSum;
           } else if (currentSum > 9) {
               // If it's still > 9 and not master, one final reduction
               return currentSum.toString().split("").map(Number).reduce((a, c) => a + c, 0);
           }
           return currentSum; // Return single digit or a master number found mid-reduction

          /* --- Old logic from original code - slightly harder to read ---
          return master.includes(initialSum)
              ? initialSum
              : initialSum.toString().split("").map(Number)
                  .reduce((a, c) => a + c, 0).toString().split("").map(Number) // first reduction
                  .reduce((a, c) => a + c, 0); // second reduction (assumes max 2 needed)
          */
      };

      // Calculate sumD, sumM, sumY using the defined reduction logic
      const sumD = reduceToSingleOrMaster(dayArr);
      const sumM = reduceToSingleOrMaster(monthArr);
      const sumY = reduceToSingleOrMaster(yearArr);

      // Calculate DN (sum of all digits in YYYYDDMM)
      // Ensure digits are actually numbers before summing
      const allDigits = [...yearArr, ...dayArr, ...monthArr];
      if (allDigits.some(isNaN)) {
           console.error('GetFirstLine Error: Failed to parse digits correctly.', date);
           return {};
      }
      const DN = allDigits.reduce((a, c) => a + c, 0);

      // Calculate A, B, C (using checkmaster helper)
      // A relates to Year, B relates to Month, C relates to Day
      const calcA = master.includes(yearInt) ? this.checkmaster(yearInt) : this.checkmaster(sumY);
      const calcB = master.includes(monthInt) ? this.checkmaster(monthInt) : this.checkmaster(sumM);
      const calcC = master.includes(dayInt) ? this.checkmaster(dayInt) : this.checkmaster(sumD);

      // Calculate D0 (complex reduction based on DN)
      const D0 = master.includes(DN)
          ? (sumD + sumY + sumM) // Note: Original used sumD+sumY+sumM here, check if intended
          : reduceToSingleOrMaster((sumD + sumY + sumM).toString().split("").map(Number)); // Reduce the sum if DN not master

      // Calculate D (checkmaster on DN)
      const D = this.checkmaster(DN);

      // Calculate P values (using sumY, sum, cleanint helpers)
      const P1 = this.sumY(sumD, sumM); // Check if sumY or sum is correct based on helper definition
      const P2 = this.sum(sumM, sumD);   // Check if sumY or sum is correct based on helper definition
      const P3 = this.sumY(P1, P2);     // Check if sumY or sum is correct based on helper definition

      // Calculate P4 base value
      const p4Base = this.cleanint(P1) + this.cleanint(P2) + this.cleanint(P3);
      const P4 = master.includes(p4Base)
          ? p4Base
          : reduceToSingleOrMaster(p4Base.toString().split("").map(Number));

      // Calculate top (using sum helper)
      const top = this.sum(sumD, sumY); // Check if sumY or sum is correct

      // Calculate P5 (using sumY helper)
      const P5 = this.sumY(top, D0);    // Check if sumY or sum is correct

      // Calculate N values (using subs, sumY helpers)
      const N1 = this.subs(sumY, sumM);
      const N2 = this.subs(sumM, sumD);
      const N3 = this.subs(N1, N2);
      // Original: N4=this.sumY(this.subs(sumY,sumM),this.sumY(N2,N3)); -- Seems to use N1 definition inline
      const N4 = this.sumY(N1, this.sumY(N2, N3)); // More readable version using N1

      // Calculate bottom (using subs helper)
      const bottom = this.subs(sumY, sumD);

      // --- Construct Final Result Object (with A/B/C swap) ---
      const result = {
          A: calcB, // Result A gets calculated B
          B: calcC, // Result B gets calculated C
          C: calcA, // Result C gets calculated A
          D: D,
          P1: P1,
          P2: P2,
          P3: P3,
          P4: P4,
          P5: P5,
          top: top,
          N1: N1,
          N2: N2,
          N3: N3,
          N4: N4,
          bottom: bottom
      };

      console.log('............GetFirstLine Calculation Result:', result); // Optional: uncomment for debugging
      // return result;
      const resCen = this.Centraline(date);
      console.log('.....resCen...', resCen);
      return resCen;
      // return result;

  } catch (error) {
      console.error('Error during GetFirstLine calculation:', error, 'Input date:', date);
      return {}; // Return empty object on unexpected calculation errors
  }
},

  /**
   * Calculate year data
   * @param {string} birthdate - Birthdate in format MM/DD/YYYY (original Angular expects this format)
   * @returns {IPinYear} - The calculated year data
   */
  GetYear(birthdate) {
    if (!birthdate) {
      console.error('GetYear received undefined birthdate');
      return {};
    }

    try {
      // Parse birth date
      const dateParts = birthdate.split('/');
      if (dateParts.length !== 3) {
        console.error('GetYear received invalid date format', birthdate);
        return {};
      }

      const day = parseInt(dateParts[1]);  // In Angular, day is at index 1
      const month = parseInt(dateParts[0]); // In Angular, month is at index 0
      const year = parseInt(dateParts[2]);

      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        console.error('GetYear received invalid date numbers', birthdate);
        return {};
      }

      // Current date for calculations
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const nextYear = currentYear + 1;

      // Calculate age
      let age = currentYear - year;
      
      // Day and month calculations
      let dayDigits = day.toString().split("").map((t) => parseInt(t));
      let yearDigits = year.toString().split("").map((t) => parseInt(t));
      let monthDigits = month.toString().split("").map((t) => parseInt(t));
      
      let sumD = dayDigits.reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      let sumM = monthDigits.reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Universal Year calculation
      let universalYear = currentYear.toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Next Universal Year
      let nextUniversalYear = nextYear.toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Personal Year calculation
      let personalYear = (sumD + sumM + universalYear).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Next Personal Year
      let nextPersonalYear = (sumD + sumM + nextUniversalYear).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Current age calculation
      let Cage = age.toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Next age calculation
      let nextAge = (age + 1);
      let NxAge = nextAge.toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Calculate pinnacles
      let P1 = this.sumY(universalYear, personalYear);
      let P2 = this.sumY(personalYear, Cage);
      let P3 = this.sumY(P1, P2);
      let Pb = (universalYear + Cage).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      let Pc = (P1 + P3 + P2).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Calculate next year pinnacles
      let NxP1 = this.sumY(nextUniversalYear, nextPersonalYear);
      let NxP2 = this.sumY(nextPersonalYear, NxAge);
      let NxP3 = this.sumY(NxP1, NxP2);
      let NxPb = (nextUniversalYear + NxAge).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      let NxPc = (NxP1 + NxP3 + NxP2).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);

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
        UniYear: universalYear
      };
    } catch (error) {
      console.error('Error in GetYear:', error);
      return {};
    }
  },

  /**
   * Breakdown calculation for year data
   */
  breakdown(dig0, dig1) {
    return this.sum(this.cleanint(dig0), this.cleanint(dig1));
  },

  /**
   * Handle master numbers specially
   */
  MasterNo(master) {
    let res;
    let ismaster = false;
    
    switch(master) {
      case 99: {res=`99/9`; ismaster=true; break;}
      case 88: {res=`88/7`; ismaster=true; break;}
      case 77: {res=`77/5`; ismaster=true; break;}
      case 66: {res=`12/3`; ismaster=true; break;}
      case 55: {res=`55/1`; ismaster=true; break;}
      case 44: {res=`44/8`; ismaster=true; break;}
      case 33: {res=`33/6`; ismaster=true; break;}
      case 22: {res=`22/4`; ismaster=true; break;}
      case 11: {res=`11/2`; ismaster=true; break;}
      default: {
        ismaster=false; 
        res = master.toString().split("").map((t) => parseInt(t))
          .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
          .reduce((a, c) => a + c, 0).toString();
        break;
      }
    }
    
    if (master.toString().length > 1) {
      let r = master.toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      return {toshow: res, touse: r, ismaster};
    } else {
      return {toshow: res, touse: master, ismaster};
    }
  },

  /**
   * Sum master numbers specially
   */
  sumaMaster(num0, num1) {
    let f = [];
    let s = [];
    let suma = 0;
    let res;
    let ismaster = false;

    if (num0.ismaster) {
      let fuse = num0.toshow.split('/');
      ismaster = true;
      let fMaestro = {
        toshow: fuse[0],
        touse: parseInt(fuse[1]),
        ismaster: ismaster,
      };
      f.push({Nmaster: fuse[0], Ntouse: fMaestro});
    } else {
      f.push({Nmaster: 0, Ntouse: num0});
    }
    
    if (num1.ismaster) {
      let suse = num1.toshow.split('/');
      ismaster = true;
      let sMaestro = {
        toshow: suse[0],
        touse: parseInt(suse[1]),
        ismaster: ismaster,
      };
      s.push({Nmaster: suse[0], Ntouse: sMaestro});
    } else {
      s.push({Nmaster: 0, Ntouse: num1});
    }

    if (num1.ismaster && num0.ismaster) {
      suma = parseInt(f[0].Nmaster) + parseInt(s[0].Nmaster);
    } else {
      suma = f[0].Ntouse.touse + s[0].Ntouse.touse;
    }
    
    res = this.MasterNo(suma);
    return res;
  },

  /**
   * Subtract master numbers specially
   */
  subMaster(num0, num1) {
    let f = [];
    let s = [];
    let suma = 0;
    let ismaster = false;
    
    if (num0.ismaster) {
      let fuse = num0.toshow.split('/');
      ismaster = true;
      let fMaestro = {
        toshow: fuse[0],
        touse: parseInt(fuse[1]),
        ismaster: ismaster,
      };
      f.push({Nmaster: fuse[0], Ntouse: fMaestro});
    } else {
      f.push({Nmaster: 0, Ntouse: num0});
    }
    
    if (num1.ismaster) {
      let suse = num1.toshow.split('/');
      ismaster = true;
      let sMaestro = {
        toshow: suse[0],
        touse: parseInt(suse[1]),
        ismaster: ismaster,
      };
      s.push({Nmaster: suse[0], Ntouse: sMaestro});
    } else {
      s.push({Nmaster: 0, Ntouse: num1});
    }
    
    if (num1.ismaster && num0.ismaster) {
      suma = parseInt(f[0].Nmaster) - parseInt(s[0].Nmaster);
    } else {
      suma = f[0].Ntouse.touse - s[0].Ntouse.touse;
    }
    
    let resta = {
      toshow: Math.abs(suma),
      touse: Math.abs(suma),
      ismaster: false,
    };
    
    return resta;
  },

  /**
   * Calculate the central line
   */
  Centraline(date) {
    let bd = date.split('/');
    let dia = parseInt(bd[0]);
    let mes = parseInt(bd[1]);
    let year = parseInt(bd[2]);
    let Du = this.MasterNo(dia);
    let Mu = this.MasterNo(mes);
    let y = year.toString().split("");
    let DN0 = parseInt(y[0]) + parseInt(y[1]) + parseInt(y[2]) + parseInt(y[3]) + Du.touse + Mu.touse;
    let DN = this.MasterNo(DN0);

    let c0 = parseInt(y[0]) + parseInt(y[1]) + parseInt(y[2]) + parseInt(y[3]);
    let c = this.MasterNo(c0);
    let P1 = this.sumaMaster(Du, Mu);
    let P2 = this.sumaMaster(Mu, c);
    let P3 = this.sumaMaster(P1, P2);
    let P4s1 = this.sumaMaster(P3, P2);
    let P4 = this.sumaMaster(P4s1, P1);
    let top = this.sumaMaster(Du, c);
    let P5 = this.sumaMaster(top, DN);
    let Np1 = this.subMaster(Du, Mu);
    let Np2 = this.subMaster(Mu, c);
    let Np3 = this.subMaster(Np1, Np2);
    let Np4s0 = this.sumaMaster(Np1, Np3);
    let Np4 = this.sumaMaster(Np4s0, Np2);
    let Np5 = this.subMaster(Du, c);

    let res = [{
      A: Du.toshow,
      B: Mu.toshow,
      C: c.toshow,
      D: DN.toshow,
      P1: P1.toshow,
      P2: P2.toshow,
      P3: P3.toshow,
      P4: P4.toshow,
      top: top.toshow,
      P5: P5.toshow,
      N1: Np1.toshow,
      N2: Np2.toshow,
      N3: Np3.toshow,
      N4: Np4.toshow,
      bottom: Np5.toshow,
    }];

    console.log('...res.........', res);
    
    return res;
  },

// The main function, now using the modified helper
GetMonth(birthdate) {

  console.log('.....birthdate....', birthdate);

  // Corrected Helper function to respect Master Numbers during reduction
  function reduceAndRespectMaster(num) {
      // Ensure input is a number
      if (typeof num !== 'number' || isNaN(num)) {
          console.error("Invalid input to reduceAndRespectMaster:", num);
          return NaN;
      }

      const master = [99, 88, 77, 66, 55, 44, 33, 22, 11];

      // --- Optional but recommended: Check if the input number itself is master or single digit ---
      // This handles cases where reduce is called with an already reduced/master number.
      if (master.includes(num) || (num >= 0 && num < 10)) {
          return num;
      }
      // --- End optional check ---

      let sum1 = num.toString()
          .split("")
          .map(t => parseInt(t, 10))
          .reduce((a, c) => a + c, 0);

      // --- Check the result of the first sum ('sum1') ---

      // 1. Is sum1 a Master Number?
      if (master.includes(sum1)) {
          return sum1; // Return the Master Number
      }
      // 2. Is sum1 a single digit?
      else if (sum1 >= 0 && sum1 < 10) {
          return sum1; // Return the single digit
      }
      // 3. If neither, perform the second reduction
      else {
          let sum2 = sum1.toString()
              .split("")
              .map(t => parseInt(t, 10))
              .reduce((a, c) => a + c, 0);

          // Optional: Check if sum2 is master? Generally not needed/expected
          // after a double reduction unless the rules are very specific.
          // if (master.includes(sum2)) { return sum2; }

          return sum2; // Return the result of the second reduction
      }
  }
  // End of corrected helper function

  // Master numbers list (defined within GetMonth scope)
  const master = [99, 88, 77, 66, 55, 44, 33, 22, 11];

  // Current date information
  const thisY = new Date();
  const currentFullYear = thisY.getFullYear();
  const nextFullYear = currentFullYear + 1;

  // Parse birthdate
  const t = birthdate.split('/');
  if (t.length !== 3) {
      console.error("Invalid birthdate format. Expected MM/DD/YYYY");
      return [[], []]; // Return empty arrays on error
  }
  // Add validation for MM and DD ranges if necessary

  const monthDigits = t[0].toString().split("").map(d => parseInt(d, 10));
  const dayDigits = t[1].toString().split("").map(d => parseInt(d, 10));
  const yearDigits = t[2].toString().split("").map(d => parseInt(d, 10));

  if (monthDigits.some(isNaN) || dayDigits.some(isNaN) || yearDigits.some(isNaN)) {
      console.error("Invalid date components in birthdate:", birthdate);
      return [[], []]; // Return empty arrays on error
  }

  // --- Use the corrected reduction logic ---
  const reduce = reduceAndRespectMaster; // Alias for clarity

  // Calculate base sums
  // Ensure the summing happens *before* reducing
  const sumM = reduce(monthDigits.reduce((a, c) => a + c, 0));
  const sumD = reduce(dayDigits.reduce((a, c) => a + c, 0));

  // Calculate Universal Year numbers
  const UniYear = reduce(currentFullYear);
  const NextUY = reduce(nextFullYear);

  // Calculate Personal Year numbers
  // Ensure components are numbers before adding
  const PerY = reduce(Number(sumD) + Number(sumM) + Number(UniYear));
  const NextPY = reduce(Number(sumD) + Number(sumM) + Number(NextUY));


  // Initialize result array
  let resultado = [[], []];

  // Loop through months (1 to 12)
  for (let index = 0; index <= 11; index++) {
      const mesindex = index + 1; // Month number 1-12
      let mes = '';

      // Assign month names (no change needed here)
      switch (index) {
          case 0: mes = "JAN/ENE"; break;
          case 1: mes = "FEB"; break;
          case 2: mes = "MAR"; break;
          case 3: mes = "APR/ABR"; break;
          case 4: mes = "MAY"; break;
          case 5: mes = "JUN"; break;
          case 6: mes = "JUL"; break;
          case 7: mes = "AUG/AGO"; break;
          case 8: mes = "SEP"; break;
          case 9: mes = "OCT"; break;
          case 10: mes = "NOV"; break;
          case 11: mes = "DEC/DIC"; break;
          default: mes = 'error.'; break;
      }

      // --- Calculate month values for the CURRENT year ---

      // MU: Universal Month = Reduce(Universal Year + Month Index)
      // Note: The previous logic reduce(reduce(UniYear) + reduce(mesindex)) might be
      // specific to a certain numerology system. If reduce(UniYear + mesindex) gives
      // wrong results elsewhere, revert MU calculation, but the main issue was likely
      // the reducer itself. Let's try the simpler sum first.
      // If UniYear or mesindex could be master numbers, ensure they are treated as such.
      const MU = reduce(Number(UniYear) + Number(mesindex)); // Sum first, then reduce

      // MP: Personal Month
      const mpSum = Number(PerY) + Number(mesindex);
      // MP logic: Check if the raw sum is master *before* reducing
      const MP = master.includes(mpSum) ? mpSum : reduce(mpSum);

      // PT: Top Point = Reduce(MU + MP)
      const p0t = reduce(Number(MU) + Number(MP)); // Sum first, then reduce

      // PL: Left Point = Reduce(MU + PT)
      const p0l = reduce(Number(MU) + Number(p0t)); // Sum first, then reduce

      // PR: Right Point = Reduce(MP + PT)
      const p0R = reduce(Number(MP) + Number(p0t)); // Sum first, then reduce


      // --- Calculate month values for the NEXT year ---

      // NMU: Next Universal Month = Reduce(Next Universal Year + Month Index)
      const NMU = reduce(Number(NextUY) + Number(mesindex)); // Sum first, then reduce

      // NMP: Next Personal Month
      const nmpSum = Number(NextPY) + Number(mesindex);
      // NMP logic: Check master first (though less common for NMP in some systems)
      const NMP = master.includes(nmpSum) ? nmpSum : reduce(nmpSum);
      // Or always reduce NMP if the specific system requires it: const NMP = reduce(nmpSum);

      // p1t: Next Top Point = Reduce(NMU + NMP)
      const p1t = reduce(Number(NMU) + Number(NMP)); // Sum first, then reduce

      // p1l: Next Left Point = Reduce(NMU + p1t)
      const p1l = reduce(Number(NMU) + Number(p1t)); // Sum first, then reduce

      // p1R: Next Right Point = Reduce(NMP + p1t)
      const p1R = reduce(Number(NMP) + Number(p1t)); // Sum first, then reduce


      // Push results for both years
      resultado[0].push({ Mon: mes, Yea: currentFullYear, MU: MU, MP: MP, PT: p0t, PL: p0l, PR: p0R });
      resultado[1].push({ Mon: mes, Yea: nextFullYear, MU: NMU, MP: NMP, PT: p1t, PL: p1l, PR: p1R });
  }

  console.log('.....resultado....', resultado);

  return resultado;
}, // End of GetMonth function

// --- Example Usage ---
// const birthdateExample = "11/11/1984"; // Example: Nov 11, 1984
// const monthlyData = GetMonth(birthdateExample);
// console.log("--- Using reduceAndRespectMaster ---");
// console.log("Current Year Data (11/11/1984):", JSON.stringify(monthlyData[0], null, 2));
// console.log("Next Year Data (11/11/1984):", JSON.stringify(monthlyData[1], null, 2));

  GetDays(birthdate) {
    // Validate birthdate format first
    if (!birthdate || !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate)) {
      console.error("Invalid birthdate format in GetDays. Expected DD/MM/YYYY");
      return [];
    }
    
    try {
      let thisY = new Date();
      let t = birthdate.split('/');
      
      // Ensure we have all parts of the date
      if (t.length !== 3 || !t[0] || !t[1] || !t[2]) {
        console.error("Invalid birthdate parts in GetDays");
        return [];
      }
      
      let resultado = [[0], [1]];
      
      let day = t[0].toString().split("").map((t) => parseInt(t));
      let month = t[1].toString().split("").map((t) => parseInt(t));
      let year = t[2].toString().split("").map((t) => parseInt(t));
      
      let UniYear = thisY.getFullYear().toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
        
      let sumD = day.reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      let sumM = month.reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      let sumY = year.reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
        
      let PerY = (sumD + sumM + UniYear).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
        
      let NextUY = (thisY.getFullYear() + 1).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
        
      let NextPY = (sumD + sumM + NextUY).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0).toString().split("").map((t) => parseInt(t))
        .reduce((a, c) => a + c, 0);
      
      // Get month data for current year and next year
      for (let index = 0; index < 12; index++) {
        let mesindex = index + 1;
        let normalizomes = mesindex < 10 ? `0${mesindex}` : mesindex;
        let elmes = '';
        
        switch(index) {
          case 0: {elmes = "JAN/ENE"; break;}
          case 1: {elmes = "FEB"; break;}
          case 2: {elmes = "MAR"; break;}
          case 3: {elmes = "APR/ABR"; break;}
          case 4: {elmes = "MAY"; break;}
          case 5: {elmes = "JUN"; break;}
          case 6: {elmes = "JUL"; break;}
          case 7: {elmes = "AUG/AGO"; break;}
          case 8: {elmes = "SEP"; break;}
          case 9: {elmes = "OCT"; break;}
          case 10: {elmes = "NOV"; break;}
          case 11: {elmes = "DEC/DIC"; break;}
          default: {elmes = 'error.'; break;}
        }
        
        let cm = `${thisY.getFullYear()}-${normalizomes}`;
        let nm = `${(thisY.getFullYear() + 1)}-${normalizomes}`;
        
        const daysInMonth = moment(cm).daysInMonth();
        const daysInnxMonth = moment(nm).daysInMonth();
        
        // Process days for current month
        let currentMonthData = [];
        for (let day = 1; day <= daysInMonth; day++) {
          let chkvibra22 = 22 - (UniYear + mesindex);
          let vibra22 = chkvibra22 === day;
          
          currentMonthData.push({
            day,
            universal: this.sumY((UniYear + mesindex), day),
            personal: this.sumY((PerY + mesindex), day),
            vibra22
          });
        }
        
        // Process days for next year's month
        let nextYearMonthData = [];
        for (let day = 1; day <= daysInnxMonth; day++) {
          nextYearMonthData.push({
            day,
            universal: this.sumY((NextUY + mesindex), day),
            personal: this.sumY((NextPY + mesindex), day)
          });
        }
        
        resultado[0].push({
          year: thisY.getFullYear(),
          month: elmes,
          days: currentMonthData
        });
        
        resultado[1].push({
          year: thisY.getFullYear() + 1,
          month: elmes,
          days: nextYearMonthData
        });
      }
      
      // Remove placeholder first items
      resultado[0].splice(0, 1);
      resultado[1].splice(0, 1);
      
      return resultado;
    } catch (error) {
      console.error("Error in GetDays calculation:", error);
      return [];
    }
  },

  /**
   * Combine pinaculo data
   * @param {Array} pin1 - First pinaculo data
   * @param {Array} pin2 - Second pinaculo data
   * @returns {Array} - Combined pinaculo data
   */
  combine3(pin1, pin2) {
    try {
      let pin1Data = pin1[0];
      let pin2Data = pin2[0];
      
      // Make sure we have valid data
      if (!pin1Data || !pin2Data) {
        console.error('combine3 received invalid pinaculo data');
        return [];
      }

      let cA = this.sumY(this.cleanint(pin1Data.A), this.cleanint(pin2Data.A));
      let cB = this.sumY(this.cleanint(pin1Data.B), this.cleanint(pin2Data.B));
      let cC = this.sumY(this.cleanint(pin1Data.C), this.cleanint(pin2Data.C));
      let cD = this.sumY(this.cleanint(pin1Data.D), this.cleanint(pin2Data.D));
      
      let cP1 = this.sumY(this.cleanint(pin1Data.P1), this.cleanint(pin2Data.P1));
      let cP2 = this.sumY(this.cleanint(pin1Data.P2), this.cleanint(pin2Data.P2));
      let cP3 = this.sumY(this.cleanint(pin1Data.P3), this.cleanint(pin2Data.P3));
      let cP4 = this.sumY(this.cleanint(pin1Data.P4), this.cleanint(pin2Data.P4));
      let cP5 = this.sumY(this.cleanint(pin1Data.P5), this.cleanint(pin2Data.P5));
      
      let ctop = this.sumY(this.cleanint(pin1Data.top), this.cleanint(pin2Data.top));
      
      let cN1 = this.sumY(this.cleanint(pin1Data.N1), this.cleanint(pin2Data.N1));
      let cN2 = this.sumY(this.cleanint(pin1Data.N2), this.cleanint(pin2Data.N2));
      let cN3 = this.sumY(this.cleanint(pin1Data.N3), this.cleanint(pin2Data.N3));
      let cN4 = this.sumY(this.cleanint(pin1Data.N4), this.cleanint(pin2Data.N4));
      
      let cbottom = this.sumY(this.cleanint(pin1Data.bottom), this.cleanint(pin2Data.bottom));
      
      let combined = [{
        A: cA,
        B: cB,
        C: cC,
        D: cD,
        P1: cP1,
        P2: cP2,
        P3: cP3,
        P4: cP4,
        P5: cP5,
        top: ctop,
        N1: cN1,
        N2: cN2,
        N3: cN3,
        N4: cN4,
        bottom: cbottom
      }];
      
      return combined;
    } catch (error) {
      console.error('Error in combine3:', error);
      return [];
    }
  },

  /**
   * Get month data for couple
   * @param {string} birthdateA - First person's birthdate 
   * @param {string} birthdateB - Second person's birthdate
   * @param {boolean} isCouple - Whether this is a couple calculation
   * @returns {Array} - Month data for couple
   */
  GetMonthCouple(birthdateA, birthdateB, isCouple) {
    try {
      // Get individual month data
      let monthsA = this.GetMonth(birthdateA);
      let monthsB = this.GetMonth(birthdateB);
      
      if (!monthsA || !monthsA.length || !monthsB || !monthsB.length) {
        console.error('GetMonthCouple received invalid month data');
        return [];
      }
      
      // Initialize result structure
      let resultado = [[0], [1]];
      
      // Loop through each month and compute combined values
      for (let i = 0; i < 12; i++) {
        // Current year
        let thisYearA = monthsA[0][i];
        let thisYearB = monthsB[0][i];
        
        let MU = this.sumY(this.cleanint(thisYearA.MU), this.cleanint(thisYearB.MU));
        let MP = this.sumY(this.cleanint(thisYearA.MP), this.cleanint(thisYearB.MP));
        let PT = this.sumY(this.cleanint(thisYearA.PT), this.cleanint(thisYearB.PT));
        let PL = this.sumY(this.cleanint(thisYearA.PL), this.cleanint(thisYearB.PL));
        let PR = this.sumY(this.cleanint(thisYearA.PR), this.cleanint(thisYearB.PR));
        
        resultado[0].push({
          Mon: thisYearA.Mon,
          Yea: thisYearA.Yea,
          MU: MU,
          MP: MP,
          PT: PT,
          PL: PL,
          PR: PR
        });
        
        // Next year
        let nextYearA = monthsA[1][i];
        let nextYearB = monthsB[1][i];
        
        let NMU = this.sumY(this.cleanint(nextYearA.MU), this.cleanint(nextYearB.MU));
        let NMP = this.sumY(this.cleanint(nextYearA.MP), this.cleanint(nextYearB.MP));
        let NPT = this.sumY(this.cleanint(nextYearA.PT), this.cleanint(nextYearB.PT));
        let NPL = this.sumY(this.cleanint(nextYearA.PL), this.cleanint(nextYearB.PL));
        let NPR = this.sumY(this.cleanint(nextYearA.PR), this.cleanint(nextYearB.PR));
        
        resultado[1].push({
          Mon: nextYearA.Mon,
          Yea: nextYearA.Yea,
          MU: NMU,
          MP: NMP,
          PT: NPT,
          PL: NPL,
          PR: NPR
        });
      }
      
      resultado[0].splice(0, 1);
      resultado[1].splice(0, 1);
      
      return resultado;
    } catch (error) {
      console.error('Error in GetMonthCouple:', error);
      return [];
    }
  },

  /**
   * Get days data for couple
   * @param {string} birthdateA - First person's birthdate
   * @param {string} birthdateB - Second person's birthdate
   * @param {boolean} isCouple - Whether this is a couple calculation
   * @returns {Array} - Days data for couple
   */
  GetDaysCouple(birthdateA, birthdateB, isCouple) {
    try {
      // Get individual days data
      let daysA = this.GetDays(birthdateA);
      let daysB = this.GetDays(birthdateB);
      
      if (!daysA || !daysA.length || !daysB || !daysB.length) {
        console.error('GetDaysCouple received invalid days data');
        return [];
      }
      
      // Initialize result structure
      let resultado = [[0], [1]];
      
      // Loop through each month
      for (let i = 0; i < 12; i++) {
        // Current year
        let thisYearA = daysA[0][i];
        let thisYearB = daysB[0][i];
        let combinedMU = [];
        
        // Loop through each day in the month
        for (let j = 0; j < thisYearA.MU.length; j++) {
          let dayA = thisYearA.MU[j];
          let dayB = thisYearB.MU[j];
          
          // Handle empty day placeholders
          if (dayA.dia === '  ' || dayB.dia === '  ') {
            combinedMU.push({dia: '  ', MU: '  ', MP: '  '});
            continue;
          }
          
          // Calculate combined values
          let dayMU = this.sumY(this.cleanint(dayA.MU), this.cleanint(dayB.MU));
          let dayMP = this.sumY(this.cleanint(dayA.MP), this.cleanint(dayB.MP));
          
          combinedMU.push({
            dia: dayA.dia,
            MU: dayMU,
            MP: dayMP,
            veinti2: dayA.veinti2
          });
        }
        
        resultado[0].push({
          Year: thisYearA.Year,
          Month: thisYearA.Month,
          MU: combinedMU
        });
        
        // Next year
        let nextYearA = daysA[1][i];
        let nextYearB = daysB[1][i];
        let combinedNXMU = [];
        
        // Loop through each day in the next year's month
        for (let j = 0; j < nextYearA.MU.length; j++) {
          let dayA = nextYearA.MU[j];
          let dayB = nextYearB.MU[j];
          
          // Handle empty day placeholders
          if (dayA.dia === '' || dayB.dia === '') {
            combinedNXMU.push({dia: '', MU: '', MP: ''});
            continue;
          }
          
          // Calculate combined values
          let dayMU = this.sumY(this.cleanint(dayA.MU), this.cleanint(dayB.MU));
          let dayMP = this.sumY(this.cleanint(dayA.MP), this.cleanint(dayB.MP));
          
          combinedNXMU.push({
            dia: dayA.dia,
            MU: dayMU,
            MP: dayMP
          });
        }
        
        resultado[1].push({
          Year: nextYearA.Year,
          Month: nextYearA.Month,
          MU: combinedNXMU
        });
      }
      
      resultado[0].splice(0, 1);
      resultado[1].splice(0, 1);
      
      return resultado;
    } catch (error) {
      console.error('Error in GetDaysCouple:', error);
      return [];
    }
  }
};

export default calculosUtils; 