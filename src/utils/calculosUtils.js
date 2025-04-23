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
      return this.subs(again[0], again[1]);
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
      return this.sum(again[0], again[1]);
    } else {
      return suma;
    }
  },

  /**
   * Clean integer value
   */
  cleanint(number) {
    if (typeof number === 'string' && number.includes('/')) {
      return parseInt(number.split('/')[0]);
    }
    return number;
  },

  /**
   * Another method for sum with Y
   */
  sumY(s1, s2) {
    // This is duplicated but slightly different from sum
    // Keeping it to maintain the same behavior as Angular
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
      return this.sum(again[0], again[1]);
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
   * Gets the current month
   */
  async getTodaysMonth() {
    return moment().month();
  },

  /**
   * Gets the calculation for a first line
   */
  GetFirstLine(date) {
    let master = [99, 88, 77, 66, 55, 44, 33, 22, 11];
    
    let t = date.split('/');
    
    let day = t[0].toString().split("").map((t) => parseInt(t));
    let year = t[2].toString().split("").map((t) => parseInt(t));
    let month = t[1].toString().split("").map((t) => parseInt(t));
    
    let sumD = master.includes(day.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) 
      ? day.reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
      : day.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
    let sumM = master.includes(month.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) 
      ? month.reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
      : month.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
    let sumY = master.includes(year.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) 
      ? year.reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
      : year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let DN = parseInt(year[0])+parseInt(year[1])+parseInt(year[2])+parseInt(year[3])+parseInt(day[0])+parseInt(day[1])+parseInt(month[0])+parseInt(month[1]);
    
    let A = 0;
    if (master.includes(parseInt(t[2]))) {
      A = this.checkmaster(parseInt(t[2]));
    } else {
      A = this.checkmaster(sumY);
    }
    
    let C = 0;
    if (master.includes(parseInt(t[0]))) {
      C = this.checkmaster(parseInt(t[0]));
    } else {
      C = this.checkmaster(sumD);
    }
    
    let B = 0;
    if (master.includes(parseInt(t[1]))) {
      B = this.checkmaster(parseInt(t[1]));
    } else {
      B = this.checkmaster(sumM);
    }

    let D0 = master.includes(DN) 
      ? (sumD + sumY + sumM) 
      : (sumD + sumY + sumM).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let D = this.checkmaster(DN);
    let P1 = this.sumY(sumD, sumM);
    let P2 = this.sum(sumM, sumD);
    let P3 = this.sumY(P1, P2);
    
    let P4 = master.includes((this.cleanint(P1) + this.cleanint(P2) + this.cleanint(P3))) 
      ? (this.cleanint(P1) + this.cleanint(P2) + this.cleanint(P3)) 
      : (this.cleanint(P1) + this.cleanint(P2) + this.cleanint(P3)).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
    let top = this.sum(sumD, sumY);
    let P5 = this.sumY(top, D0);
    let N1 = this.subs(sumY, sumM);
    let N2 = this.subs(sumM, sumD);
    let N3 = this.subs(N1, N2);
    let N4 = this.sumY(this.subs(sumY, sumM), this.sumY(N2, N3));
    let bottom = this.subs(sumY, sumD);

    return {
      A: B,
      B: C,
      C: A,
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
      bottom: bottom,
    };
  },

  /**
   * Gets the calculation for a year
   */
  GetYear(birthdate) {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    
    const t = birthdate.split('/');
    const age = currentYear - parseInt(t[2]);
    const nextAge = age + 1;
    
    // Add Universal year calculation
    const universalYear = this.breakdown(currentYear);
    const nextUniversalYear = this.breakdown(nextYear);
    
    // Add Personal year calculation 
    const bday = parseInt(t[0]);
    const bmonth = parseInt(t[1]);
    const personalYear = this.breakdown(bday, bmonth + currentYear);
    const nextPersonalYear = this.breakdown(bday, bmonth + nextYear);
    
    // First Triangle
    const p1 = this.breakdown(personalYear, universalYear);
    const p2 = this.breakdown(universalYear, age);
    const p3 = this.breakdown(p1, p2);
    
    // Second Triangle 
    const nextp1 = this.breakdown(nextPersonalYear, nextUniversalYear);
    const nextp2 = this.breakdown(nextUniversalYear, nextAge);
    const nextp3 = this.breakdown(nextp1, nextp2);
    
    // Bottom 
    const pb = this.subs(universalYear, age);
    const nextpb = this.subs(nextUniversalYear, nextAge);
    
    // Center 
    const pc = this.breakdown(personalYear, p3);
    const nextpc = this.breakdown(nextPersonalYear, nextp3);
    
    return {
      Cage: age,
      NextPY: nextPersonalYear,
      NextUY: nextUniversalYear,
      NxAge: nextAge,
      NxP1: nextp1,
      NxP2: nextp2,
      NxP3: nextp3,
      NxPb: nextpb,
      NxPc: nextpc,
      P1: p1,
      P2: p2,
      P3: p3,
      Pb: pb,
      Pc: pc,
      PerY: personalYear,
      UniYear: universalYear,
    };
  },

  /**
   * Break down a number into a single digit
   */
  breakdown(dig0, dig1) {
    return this.sum(this.cleanint(dig0), this.cleanint(dig1));
  },

  /**
   * Calculate the master number value
   */
  MasterNo(master) {
    let res;
    let ismaster;
    
    switch(master) {
      case 99: {res=`99/9`; ismaster = true; break;}
      case 88: {res=`88/7`; ismaster = true; break;}
      case 77: {res=`77/5`; ismaster = true; break;}
      case 66: {res=`12/3`; ismaster = true; break;}
      case 55: {res=`55/1`; ismaster = true; break;}
      case 44: {res=`44/8`; ismaster = true; break;}
      case 33: {res=`33/6`; ismaster = true; break;}
      case 22: {res=`22/4`; ismaster = true; break;}
      case 11: {res=`11/2`; ismaster = true; break;}
      default: {
        ismaster = false; 
        res = master.toString().split("").map((t) => parseInt(t))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString();
        break;
      }
    }

    if (master.toString().length > 1) {
      let r = master.toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t) => parseInt(t))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      return {toshow: res, touse: r, ismaster};
    } else {
      return {toshow: res, touse: master, ismaster};
    }
  }
};

export default calculosUtils; 