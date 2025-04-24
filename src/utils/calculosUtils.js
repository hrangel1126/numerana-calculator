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
      console.warn("Preventing infinite recursion in sum function", s1, s2);
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
    // Handle undefined or null values
    if (number === undefined || number === null) {
      console.warn('cleanint received undefined or null value');
      return 0;
    }
    
    // Handle string with slash
    if (typeof number === 'string' && number.includes('/')) {
      return parseInt(number.split('/')[0]) || 0;
    }
    
    // Handle NaN values
    const result = parseInt(number);
    if (isNaN(result)) {
      console.warn('cleanint received NaN value', number);
      return 0;
    }
    
    return result;
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

    let master = [33, 22, 11];
    let suma;

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
      const today = new Date();
      const month = today.getMonth() + 1; // JavaScript months are 0-based
      
      // For the purpose of quarter calculations in the component
      const quarter = Math.ceil(month / 3);
      resolve(quarter);
    });
  },

  /**
   * Calculate the first line of the pinaculo
   * @param {string} date - Date in format DD/MM/YYYY
   * @returns {PinaculoData} - The calculated pinaculo data
   */
  GetFirstLine(date) {
    if (!date) {
      console.error('GetFirstLine received undefined date');
      return {};
    }

    try {
      // Parse date parts
      const dateParts = date.split('/');
      if (dateParts.length !== 3) {
        console.error('GetFirstLine received invalid date format', date);
        return {};
      }

      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);

      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        console.error('GetFirstLine received invalid date numbers', date);
        return {};
      }

      // Day calculation
      let sumd = day.toString().split('').map(Number);
      if (sumd.length > 1) {
        sumd = sumd.reduce((a, b) => a + b, 0);
      } else {
        sumd = day;
      }

      // Month calculation
      let summ = month.toString().split('').map(Number);
      if (summ.length > 1) {
        summ = summ.reduce((a, b) => a + b, 0);
      } else {
        summ = month;
      }

      // Year calculation
      let sumy = 0;
      year.toString().split('').forEach(digit => {
        sumy += parseInt(digit);
      });

      // Convert to simpler values if applicable
      if (sumy.toString().length > 1) {
        sumy = sumy.toString().split('').map(Number).reduce((a, b) => a + b, 0);
      }

      // Calculate pinaculo values
      const A = summ;
      const B = sumd;
      const C = this.sum(A, B);
      const D = this.sum(sumy, C);
      const top = this.sum(D, C);

      const P1 = this.sum(A, B);
      const P2 = this.sum(B, C);
      const P3 = this.sum(C, D);
      const P4 = this.sum(D, A);
      const P5 = this.sum(A, C);

      const N1 = this.sum(A, top);
      const N2 = this.sum(B, top);
      const N3 = this.sum(C, top);
      const N4 = this.sum(D, top);
      const bottom = this.sum(top, this.sum(this.sum(A, B), this.sum(C, D)));

      return {
        A,
        B,
        C,
        D,
        P1,
        P2,
        P3,
        P4,
        P5,
        top,
        N1,
        N2,
        N3,
        N4,
        bottom
      };
    } catch (error) {
      console.error('Error in GetFirstLine:', error);
      return {};
    }
  },

  /**
   * Calculate year data
   * @param {string} birthdate - Birthdate in format DD/MM/YYYY
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

      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
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
      const birthMonth = month - 1; // JS months are 0-based
      const birthDay = day;
      
      // Adjust age if birthday hasn't occurred yet this year
      if (
        birthMonth > currentDate.getMonth() ||
        (birthMonth === currentDate.getMonth() && birthDay > currentDate.getDate())
      ) {
        age--;
      }

      // Personal year calculation
      const personalYear = this.breakdown(day + month, age);
      const universalYear = this.breakdown(currentYear, 0);
      
      // Next year calculations
      const nextAge = age + 1;
      const nextPersonalYear = this.breakdown(day + month, nextAge);
      const nextUniversalYear = this.breakdown(nextYear, 0);

      // Calculate pinnacles
      const P1 = this.breakdown(personalYear, universalYear);
      const P2 = this.breakdown(personalYear, month);
      const P3 = this.breakdown(personalYear, day);
      const Pb = this.breakdown(P1, P2);
      const Pc = this.breakdown(P2, P3);

      // Calculate next year pinnacles
      const NxP1 = this.breakdown(nextPersonalYear, nextUniversalYear);
      const NxP2 = this.breakdown(nextPersonalYear, month);
      const NxP3 = this.breakdown(nextPersonalYear, day);
      const NxPb = this.breakdown(NxP1, NxP2);
      const NxPc = this.breakdown(NxP2, NxP3);

      return {
        Cage: age,
        NextPY: nextPersonalYear,
        NextUY: nextUniversalYear,
        NxAge: nextAge,
        NxP1,
        NxP2,
        NxP3,
        NxPb,
        NxPc,
        P1,
        P2,
        P3,
        Pb,
        Pc,
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
    try {
      // Ensure numbers are valid
      dig0 = parseInt(dig0) || 0;
      dig1 = parseInt(dig1) || 0;

      // Sum the digits
      const sumDigits = dig0 + dig1;
      
      // Check for master numbers
      if (sumDigits === 11 || sumDigits === 22) {
        return sumDigits;
      }
      
      // Reduce to a single digit
      if (sumDigits > 9) {
        return this.breakdown(
          Math.floor(sumDigits / 10),
          sumDigits % 10
        );
      }
      
      return sumDigits;
    } catch (error) {
      console.error('Error in breakdown:', error);
      return 0;
    }
  },

  /**
   * Handle master numbers specially
   */
  MasterNo(master) {
    if (master === 11 || master === 22 || master === 33) {
      return master;
    }
    
    // If not a master number, return single digit
    if (master > 9) {
      let digits = master.toString().split('').map(Number);
      return this.MasterNo(digits.reduce((a, b) => a + b, 0));
    }
    
    return master;
  }
};

export default calculosUtils; 