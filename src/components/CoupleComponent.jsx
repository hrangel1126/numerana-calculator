import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import PinaculoChartComponent from './common/PinaculoChartComponent';
import DesktopMonthGridComponent from './common/DesktopMonthGridComponent';
import DesktopDayGridComponent from './common/DesktopDayGridComponent';
import YearChartComponent from './common/YearChartComponent';
import ResultsHeaderComponent from './common/ResultsHeaderComponent';

// Import utility functions
import { calculosUtils } from '../utils/calculosUtils';
import { useTranslation } from '../utils/i18n/LanguageContext';

// Import Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import images
import leftDecoration from '../assets/img/Lleft.png';
import rightDecoration from '../assets/img/Lright.png';
import logoImage from '../assets/img/logonumerana80.png';
import annualCalcImg from '../assets/img/Annual-calculation.png';
import monthlyCalcImg from '../assets/img/monthly-calculation.png';
import dailyCalcImg from '../assets/img/daily-calculatiom-header.png';
import coupleHeaderImg from '../assets/img/couple-header.png';
import coupleBigImg from '../assets/img/couple-big.png';
import caracol from '../assets/img/caracol.png';
import relationshipStructureImg from '../assets/img/relationship-structure.png';

import './CoupleComponent.css';
import './SingleComponent.css';

const CoupleComponent = () => {
  const { t } = useTranslation();
  // State variables for person 1
  const [nombre, setNombre] = useState('saurav');
  const [birthdate, setBirthdate] = useState('11/11/1984');
  
  // State variables for person 2
  const [nombre2, setNombre2] = useState('kumar');
  const [birthdate2, setBirthdate2] = useState('11/01/1999');
  
  // UI state variables
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [resultados, setResultados] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  
  // Mobile month/year selection state
  const [mobilMesSelect, setMobilMesSelect] = useState({
    year: 0,
    Month: 0,
  });
  
  // Pinaculo data for both individuals
  const [rpinaculo, setRpinaculo] = useState([]);
  const [rpinaculo2, setRpinaculo2] = useState([]);
  const [rpinaculo3, setRpinaculo3] = useState([]);
  
  // Year data for both individuals
  const [pinYear, setPinYear] = useState([]);
  const [pinYear2, setPinYear2] = useState([]);
  
  // Sinastra data (couple compatibility)
  const [sinastra, setSinastra] = useState([]);
  
  // Monthly data
  const [listMobileM, setListMobileM] = useState([]);
  
  // Swiper indices
  const [index, setIndex] = useState(0);
  const [indexMobil, setIndexMobil] = useState(0);
  const [indexSina, setIndexSina] = useState(0);
  
  // Screen size detection
  const [getScreenWidth, setGetScreenWidth] = useState(true);
  
  // Constants for current year data
  const thisY = new Date();
  const year = thisY.getFullYear();
  const nxYear = thisY.getFullYear() + 1;
  
  // Month visibility state
  const [monthsVisible, setMonthsVisible] = useState({
    CYQ1: false,
    CYQ2: false,
    CYQ3: false,
    NYQ: false,
  });
  
  // Refs
  const contentRef = useRef(null);
  const birth1Ref = useRef(null);
  const birth2Ref = useRef(null);
  const myScrollContainerRef = useRef(null);
  const swiperRef = useRef(null);
  const swiperAnoRef = useRef(null);
  const swiperSinaRef = useRef(null);
  const swiperMbRef = useRef(null);
  
  // Swiper configurations
  const swiperConfig = {
    spaceBetween: 10,
    navigation: true,
    modules: [Navigation],
  };
  
  const swiperConfigSina = {
    spaceBetween: 5,
    navigation: true,
    modules: [Navigation],
  };

  const yearSliderSettings = {
    modules: [Navigation], // Add Pagination if you want dots: import { Navigation, Pagination } from 'swiper/modules';
    spaceBetween: 10,
    slidesPerView: 1,
    navigation: true, // Shows arrows
    // pagination: { clickable: true }, // Uncomment and import Pagination + CSS if you want dots
    loop: false, // Set to true if you want it to loop
  };
  
  // Initialize the component
  useEffect(() => {
    // Set screen width detection
    const handleResize = () => {
      setGetScreenWidth(window.innerWidth > 600);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Initial loading animation
    theLoading(1500).then(() => {
      setIsVisible(true);
    });
    
    // Determine current month and set visibility
    getCurrentMonth();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Update swiper indexes when they change
  useEffect(() => {
    if (resultados && swiperRef.current && swiperSinaRef.current && swiperMbRef.current) {
      if (getScreenWidth) {
        swiperRef.current.swiper.slideTo(index);
        swiperSinaRef.current.swiper.slideTo(indexSina);
      } else {
        swiperMbRef.current.swiper.slideTo(indexMobil);
      }
    }
  }, [resultados, index, indexMobil, indexSina, getScreenWidth]);
  
  // Update mobilMesSelect when listMobileM changes
  useEffect(() => {
    if (listMobileM.length > 1 && mobilMesSelect.year === 0) {
      // Initialize with the first valid month
      setMobilMesSelect({
        year: listMobileM[1].year,
        Month: listMobileM[1].month
      });
    }
  }, [listMobileM, mobilMesSelect.year]);
  
  // Loading animation function
  const theLoading = (loadingTime = 3500) => {
    return new Promise((resolve) => {
      if (loading) {
        setTimeout(() => {
          setLoading(false);
          return resolve(true);
        }, loadingTime);
      } else {
        setLoading(true);
        return resolve(true);
      }
    });
  };
  
  // Get current month and set visibilities
  const getCurrentMonth = async () => {
    try {
      const meshoy = await calculosUtils.getTodaysMonth();
      if (meshoy === 1 || meshoy === 2) {
        setMonthsVisible({
          CYQ1: true,
          CYQ2: true,
          CYQ3: true,
          NYQ: false,
        });
      } else if (meshoy === 3) {
        setMonthsVisible({
          CYQ1: false,
          CYQ2: false,
          CYQ3: true,
          NYQ: true,
        });
      }
    } catch (error) {
      console.error('Error getting current month:', error);
    }
  };
  
  // Form submission
  const subm = () => {
    console.log('nombre', nombre);
    console.log('birthdate', birthdate);
    console.log('nombre2', nombre2);
    console.log('birthdate2', birthdate2);
    
    if (!birthdate || !birthdate2) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        html: "Both birthdates are required.<br>Ambas fechas de nacimiento son necesarias.",
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    
    // Parse dates
    const fixDate = birthdate.split('/');
    const fixDate2 = birthdate2.split('/');
    
    if (fixDate.length < 3 || fixDate2.length < 3) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        html: "Check birthdate format (DD/MM/YYYY).<br>Verifica el formato de fecha (DD/MM/AAAA).",
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    
    // Validate dates
    const dateString1 = `${fixDate[1]}-${fixDate[0]}-${fixDate[2]}`;
    const dateString2 = `${fixDate2[1]}-${fixDate2[0]}-${fixDate2[2]}`;
    
    // Process calculations
    setLoading(true);
    setIsVisible(false);
    
    try {
      // Calculate for person 1
      const pinaculo1 = calculosUtils.GetFirstLine(birthdate);
      console.log('.....bitrhdat .......', birthdate, '..................', pinaculo1);
      setRpinaculo([pinaculo1[0]]);
      
      // Calculate for person 2
      const pinaculo2 = calculosUtils.GetFirstLine(birthdate2);
      console.log('.....bitrhdat2 .......', birthdate2, '..................', pinaculo2);
      setRpinaculo2([pinaculo2[0]]);
      
      // Calculate couple compatibility
      calculateCoupleCompatibility(pinaculo1[0], pinaculo2[0]);
      
      // Calculate year data
      const yearData1 = calculosUtils.GetYear(birthdate);
      setPinYear([yearData1]);
      
      const yearData2 = calculosUtils.GetYear(birthdate2);
      setPinYear2([yearData2]);
      
      // List months
      listMonths();
      
      // Show results
      setResultados(true);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        if (myScrollContainerRef.current) {
          myScrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } catch (error) {
      console.error('Error in calculations:', error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Calculation Error",
        html: "An error occurred during calculations.<br>Ocurrió un error durante los cálculos.",
        showConfirmButton: false,
        timer: 2500
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate couple compatibility
  const calculateCoupleCompatibility = (person1, person2) => {
    try {
      // Enhanced implementation with proper algorithm
      const combinedSinastra = {
        A: calculosUtils.sum(parseInt(person1.A) || 0, parseInt(person2.A) || 0),
        B: calculosUtils.sum(parseInt(person1.B) || 0, parseInt(person2.B) || 0),
        C: calculosUtils.sum(parseInt(person1.C) || 0, parseInt(person2.C) || 0),
        D: calculosUtils.sum(parseInt(person1.D) || 0, parseInt(person2.D) || 0),
        E: calculosUtils.sum(parseInt(person1.top) || 0, parseInt(person2.top) || 0),
        NA: person1.A,
        NB: person1.B,
        NC: person1.C,
        ND: person1.D,
        NE: person2.A,
        NF: person2.B,
        NG: person2.C,
        NH: person2.D
      };
      console.log('Combined Sinastra:', combinedSinastra);
      
      setSinastra([combinedSinastra]);
      
      // Third combined result
      const combinedPinaculo = {
        A: calculosUtils.sum(parseInt(person1.A) || 0, parseInt(person2.A) || 0),
        B: calculosUtils.sum(parseInt(person1.B) || 0, parseInt(person2.B) || 0),
        C: calculosUtils.sum(parseInt(person1.C) || 0, parseInt(person2.C) || 0),
        D: calculosUtils.sum(parseInt(person1.D) || 0, parseInt(person2.D) || 0),
        top: calculosUtils.sum(parseInt(person1.top) || 0, parseInt(person2.top) || 0),
        E: calculosUtils.sum(parseInt(person1.top) || 0, parseInt(person2.top) || 0),
        N1: person1.A,
        N2: person1.B,
        N3: person1.C,
        N4: person1.D,
        P1: person2.A,
        P2: person2.B,
        P3: person2.C,
        P4: person2.D,
        P5:calculosUtils.sum(parseInt(person1.bottom) || 0, parseInt(person2.bottom) || 0),
      bottom: calculosUtils.sum(parseInt(person1.bottom) || 0, parseInt(person2.bottom) || 0)
      };
      console.log('pina 3', combinedPinaculo);
      
      setRpinaculo3([combinedPinaculo]);
      // setRpinaculo3([combinedSinastra]);
      
    } catch (error) {
      console.error('Error in compatibility calculation:', error);
    }
  };
  
  // List months data
  const listMonths = () => {
    setListMobileM([]);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
    
    // Generate months for the current year and next year
    const months = [];
    
    // Add a placeholder option
    months.push({
      month: 0,
      year: 0,
      name: "Month/Mes",
      data: null
    });
    
    // Current year months
    for (let m = 1; m <= 12; m++) {
      if (m >= currentMonth - 1) { // Include one month before current month
        months.push({
          month: m,
          year: currentYear,
          name: getMonthName(m),
          data: calculateMonthData(m, currentYear)
        });
      }
    }
    
    // Next year months for the first quarter
    for (let m = 1; m <= 3; m++) {
      months.push({
        month: m,
        year: currentYear + 1,
        name: getMonthName(m),
        data: calculateMonthData(m, currentYear + 1)
      });
    }
    
    setListMobileM(months);
    
    // Initialize mobilMesSelect with first valid month if not already set
    if (mobilMesSelect.year === 0 && months.length > 1) {
      setMobilMesSelect({
        year: months[1].year,
        Month: months[1].month
      });
    }
  };
  
  // Get month name in English/Spanish
  const getMonthName = (month) => {
    const monthNames = [
      'JAN/ENE', 'FEB', 'MAR', 'APR/ABR', 'MAY', 'JUN',
      'JUL', 'AUG/AGO', 'SEP', 'OCT', 'NOV', 'DEC/DIC'
    ];
    
    return monthNames[month - 1] || '';
  };
  
  // Calculate numerological data for a specific month
  const calculateMonthData = (month, year) => {
    if (!birthdate || !birthdate2) return null;
    
    try {
      // Simple placeholder calculation - this should be expanded with the actual algorithm
      const monthNumber = calculosUtils.sum(month, year % 10);
      
      const data1 = calculosUtils.sum(
        calculosUtils.cleanint(rpinaculo[0]?.top) || 0,
        parseInt(monthNumber) || 0
      );
      
      const data2 = calculosUtils.sum(
        calculosUtils.cleanint(rpinaculo2[0]?.top) || 0,
        parseInt(monthNumber) || 0
      );
      
      return {
        combined: calculosUtils.sum(data1, data2),
        person1: data1,
        person2: data2
      };
    } catch (error) {
      console.error('Error in month calculation:', error);
      return null;
    }
  };
  
  // Handle month selection in mobile view
  const callMesMobil = (event) => {
    console.log('Selected month:', event);
    
    try {
      const selectedMonth = listMobileM[event] || null;
      if (selectedMonth) {
        // Set loading state
        setSmallLoading(true);
        
        // Update mobile month selection state
        setMobilMesSelect({
          year: selectedMonth.year || 0,
          Month: selectedMonth.month || 0
        });
        
        // Process the data (placeholder)
        setTimeout(() => {
          setSmallLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error('Error in month selection:', error);
      setSmallLoading(false);
    }
  };
  
  // Reload page
  const reload = () => {
    setNombre('');
    setNombre2('');
    setBirthdate('');
    setBirthdate2('');
    setRpinaculo([]);
    setRpinaculo2([]);
    setRpinaculo3([]);
    setPinYear([]);
    setPinYear2([]);
    setSinastra([]);
    setListMobileM([]);
    setResultados(false);
    setIsVisible(true);
    setIndex(0);
    setIndexMobil(0);
    setIndexSina(0);
  };
  
  // Handle Swiper slide changes
  const slideChange = (swiper) => {
    setIndex(swiper.activeIndex);
  };
  
  const slideChangeMobil = (swiper) => {
    setIndexMobil(swiper.activeIndex);
  };
  
  const slideChangeSina = (swiper) => {
    setIndexSina(swiper.activeIndex);
  };
  
  // Handle birthdate input with mask
  const handleBirthdateChange = (e, setPerson) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    // Format with slashes
    if (value.length > 0) {
      if (value.length <= 2) {
        setPerson(value);
      } else if (value.length <= 4) {
        setPerson(`${value.slice(0, 2)}/${value.slice(2)}`);
      } else {
        setPerson(`${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`);
      }
    } else {
      setPerson('');
    }
  };
  
  // Render loading animation
  const renderLoading = () => (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
  
  // Render input form
  const renderForm = () => (
    <div className={`singleBasic-form-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="singleBasic-hero-container">
        <div className="singleBasic-left-column">
          <div className="singleBasic-title-section">
            <img src={coupleHeaderImg} alt="" className="singleBasic-title-img" />
          </div>
          <div className="singleBasic-form-content">
            <div className="couple-form-wrapper">
              <div className="couple-form-column">
                <div className="singleBasic-form-group">
                  <label htmlFor="name1">Enter your name</label>
                  <input 
                    type="text" 
                    id="name1"
                    autoComplete="off" 
                    className="singleBasic-form-control" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="John Doe" 
                  />
                </div>
                <div className="singleBasic-form-group">
                  <label htmlFor="name2">Enter your partner's name</label>
                  <input 
                    type="text" 
                    id="name2"
                    autoComplete="off" 
                    className="singleBasic-form-control" 
                    value={nombre2}
                    onChange={(e) => setNombre2(e.target.value)}
                    placeholder="John Doe" 
                  />
                </div>
              </div>
              <div className="couple-form-column">
                <div className="singleBasic-form-group">
                  <label htmlFor="birth1">Enter your DOB</label>
                  <input
                    className="singleBasic-form-control"
                    id="birth1"
                    autoComplete="off"
                    placeholder="dd/mm/yyyy"
                    type="tel"
                    value={birthdate}
                    onChange={(e) => handleBirthdateChange(e, setBirthdate)}
                    ref={birth1Ref}
                  />
                </div>
                <div className="singleBasic-form-group">
                  <label htmlFor="birth2">Enter your partner's DOB</label>
                  <input
                    className="singleBasic-form-control"
                    id="birth2"
                    autoComplete="off"
                    placeholder="dd/mm/yyyy"
                    type="tel"
                    value={birthdate2}
                    onChange={(e) => handleBirthdateChange(e, setBirthdate2)}
                    ref={birth2Ref}
                  />
                </div>
              </div>
            </div>
            <button onClick={subm} className="singleBasic-submit-btn">
              <img src={caracol} alt="caracol" className="singleBasic-btn-icon" />
              {t('singleBasic.submitButton') || 'Calculate Now'}
            </button>
          </div>
        </div>
        <div className="singleBasic-right-column">
          <img src={coupleBigImg} alt="" className="singleBasic-hero-img" />
        </div>
      </div>
    </div>
  );

  // Render monthly chart for desktop view
  const renderMonthlyChart = (month) => {
    if (!month || !month.data) return null;
    
    return (
      <div className="month-forecast">
        <div className="month-detail">
          <div className="forecast-row">
            <div className="forecast-column">
              <p className="month-person">{nombre}</p>
              <div className="month-value">
                {month.data.person1}
              </div>
            </div>
            <div className="forecast-column center">
              <p className="month-combined">Combined</p>
              <div className="month-value combined">
                {month.data.combined}
              </div>
            </div>
            <div className="forecast-column">
              <p className="month-person">{nombre2}</p>
              <div className="month-value">
                {month.data.person2}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render small loading indicator
  const renderSmallLoading = () => (
    <div className="small-loading">
      <div className="spinner-border spinner-border-sm" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  // Render results
  const renderResults = () => (
    <>
    <div id="page1" className="page" ref={myScrollContainerRef}>
      {/* Back Button */}
      <button 
        className="singleBasic-back-btn"
        onClick={reload}
        aria-label="Go back"
        title="New Calculation"
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>

      {/* 2-Column Results Header Layout */}
      <div className="results-header-wrapper">
        <div className="results-header-left">
          <h1 className="couple-results-title">{nombre} & {nombre2}</h1>
          <p className="couple-results-dates">
            <span className="couple-date">{moment(birthdate, 'DD/MM/YYYY').format('MMM D, YYYY')}</span> • <span className="couple-date">{moment(birthdate2, 'DD/MM/YYYY').format('MMM D, YYYY')}</span>
          </p>
          <p className="couple-results-description">
            This analysis merges the numerical data from both individuals into a detailed outcome. Delve into personal patterns, relationship metrics, yearly cycles, monthly trends, and daily numerical insights.
          </p>
          <p className="couple-results-description">
            This initial calculation is just the starting point. This report includes individual calculations for each person alongside a combined relationship calculation, helping you explore how the numbers interact across different cycles and time periods.
          </p>
          <div className="couple-results-actions">
            <button className="couple-btn-download">
              <i className="bi bi-download"></i> Download PDF
            </button>
            <button className="couple-btn-learn-more">
              Learn More ↓
            </button>
          </div>
        </div>
        <div className="results-header-right">
          {rpinaculo3.length > 0 && (
            <PinaculoChartComponent pinaculo={rpinaculo3[0]} />
          )}
          <p className="couple-results-caption">This is the combined result; check the details below.</p>
        </div>
      </div>
      
      {/* Relationship Structure Section */}
      <div className="couple-compatibility-section">
        <div className="couple-section-header">
          <img src={relationshipStructureImg} alt="" className="couple-section-header-img" />
        </div>
        <p className="couple-section-subtitle">The charts below display the individual calculations for each person generated from both profiles.</p>
        
        <div className="couple-compatibility-charts">
          {getScreenWidth ? (
            // Desktop view
            <div className="couple-charts-desktop">
               <div className="couple-chart-row">
                 <div className="couple-chart-column">
                   <PinaculoChartComponent pinaculo={rpinaculo.length > 0 ? rpinaculo[0] : null} />
                   <h4 className="couple-chart-title">{nombre}</h4>
                 </div>

                 <div className="couple-chart-column">
                   <PinaculoChartComponent pinaculo={rpinaculo2.length > 0 ? rpinaculo2[0] : null} />
                   <h4 className="couple-chart-title">{nombre2}</h4>
                 </div>

                 <div className="couple-chart-column">
                   <PinaculoChartComponent pinaculo={rpinaculo3.length > 0 ? rpinaculo3[0] : null} />
                   <h4 className="couple-chart-title">Combined | Combinado</h4>
                 </div>
               </div>
              
            </div>
          ) : (
            // Mobile view
            <div className="couple-charts-mobile">
              <Swiper
                ref={swiperMbRef}
                {...swiperConfig}
                className="couple-swiper-container-mobile"
                onSlideChange={slideChangeMobil}
              >
                <SwiperSlide className="couple-slide-chart">
                   <PinaculoChartComponent pinaculo={rpinaculo.length > 0 ? rpinaculo[0] : null} />
                   <h4 className="couple-chart-title">{nombre}</h4>
                 </SwiperSlide>
                 
                 <SwiperSlide className="couple-slide-chart">
                   <PinaculoChartComponent pinaculo={rpinaculo2.length > 0 ? rpinaculo2[0] : null} />
                   <h4 className="couple-chart-title">{nombre2}</h4>
                 </SwiperSlide>
                 
                 <SwiperSlide className="couple-slide-chart">
                   <PinaculoChartComponent pinaculo={rpinaculo3.length > 0 ? rpinaculo3[0] : null} />
                   <h4 className="couple-chart-title">Combined | Combinado</h4>
                 </SwiperSlide>
                
                <SwiperSlide className="couple-slide-chart">
                  <h4 className="couple-chart-title">Compatibility | Compatibilidad</h4>
                  {sinastra.length > 0 && (
                    <div className="couple-compatibility-table-container couple-mobile">
                      <table className="couple-compatibility-table">
                        <thead>
                          <tr>
                            <th>Area</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Emotional</td>
                            <td className={parseInt(sinastra[0]?.A) > 7 ? 'couple-compatibility-excellent' : 'couple-compatibility-average'}>
                              {sinastra[0]?.A}
                            </td>
                          </tr>
                          <tr>
                            <td>Mental</td>
                            <td className={parseInt(sinastra[0]?.B) > 7 ? 'couple-compatibility-excellent' : 'couple-compatibility-average'}>
                              {sinastra[0]?.B}
                            </td>
                          </tr>
                          <tr>
                            <td>Physical</td>
                            <td className={parseInt(sinastra[0]?.C) > 7 ? 'couple-compatibility-excellent' : 'couple-compatibility-average'}>
                              {sinastra[0]?.C}
                            </td>
                          </tr>
                          <tr>
                            <td>Spiritual</td>
                            <td className={parseInt(sinastra[0]?.D) > 7 ? 'couple-compatibility-excellent' : 'couple-compatibility-average'}>
                              {sinastra[0]?.D}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </SwiperSlide>
              </Swiper>
            </div>
          )}
        </div>
      </div>

      {/* Annual Calculations Section */}
      <div className="annual-section">
        <div className="annual-header">
          <img src={annualCalcImg} alt="Annual Calculations" className="annual-header-image" />
        </div>
         {/* HIDDEN: Using couple-year-charts-section with Swiper sliders below instead (year labels on top of pinaculos) */}
         <div className="annual-years-grid">
           <div className="annual-year-block">
             <h3 className="annual-year-title">{year}</h3>
             <YearChartComponent 
               year={year} 
               data={pinYear.length > 0 ? pinYear[0] : null} 
               isCurrentYear={true} 
             />
           </div>
           <div className="annual-year-block">
             <h3 className="annual-year-title">{nxYear}</h3>
             <YearChartComponent 
               year={nxYear} 
               data={pinYear2.length > 0 ? pinYear2[0] : null} 
               isCurrentYear={false} 
             />
           </div>
         </div>
      </div>

      {/* Year Chart Section */}
      <div className="couple-year-charts-section">

        <div className="couple-year-charts-container">
          <div className="couple-year-charts-row"> {/* Ensure this row has flex display in CSS */}

            {/* --- Person 1 Year Chart Slider --- */}
            <div className="couple-person-year-charts">
              {pinYear.length > 0 ? (
                <div className="year-slider-wrapper">
                  <Swiper {...yearSliderSettings} className="person-year-swiper">
                    {[
                      { yearValue: year, dataValue: pinYear[0], isCurrent: true },
                      { yearValue: nxYear, dataValue: pinYear[0], isCurrent: false },
                    ].map((yearData, index) => (
                      <SwiperSlide key={`${nombre}-year-${yearData.yearValue}-${index}`} className="year-chart-slide">
                        <p className="year-label">{yearData.yearValue}</p>
                        <YearChartComponent
                          year={yearData.yearValue}
                          data={yearData.dataValue}
                          isCurrentYear={yearData.isCurrent}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="no-data-placeholder">No year data for {nombre}.</div>
              )}
             </div>

             {/* --- Person 2 Year Chart Slider --- */}
             <div className="couple-person-year-charts">
               {pinYear2.length > 0 ? (
                 <div className="year-slider-wrapper">
                   <Swiper {...yearSliderSettings} className="person-year-swiper">
                     {[
                       { yearValue: year, dataValue: pinYear2[0], isCurrent: true },
                       { yearValue: nxYear, dataValue: pinYear2[0], isCurrent: false },
                     ].map((yearData, index) => (
                       <SwiperSlide key={`${nombre2}-year-${yearData.yearValue}-${index}`} className="year-chart-slide">
                         <p className="year-label">{yearData.yearValue}</p>
                         <YearChartComponent
                           year={yearData.yearValue}
                           data={yearData.dataValue}
                           isCurrentYear={yearData.isCurrent}
                         />
                       </SwiperSlide>
                     ))}
                   </Swiper>
                 </div>
               ) : (
                 <div className="no-data-placeholder">No year data for {nombre2}.</div>
               )}
             </div>

          </div> {/* End of couple-year-charts-row */}
        </div> {/* End of couple-year-charts-container */}
      </div> {/* End of couple-year-charts-section */}

      <div className="monthly-section">
        <div className="monthly-header">
          <img src={monthlyCalcImg} alt="" className="monthly-header-image" />
        </div>
        {listMobileM.length > 0 && (
          <div className="couple-forecast-content">
            {getScreenWidth ? (
              // Desktop view
              <div className="couple-forecast-desktop">
                <DesktopMonthGridComponent birthdate={birthdate} birthdate2={birthdate2} isCouple={true}/>
              </div>
            ) : (
              // Mobile view
              <div className="couple-forecast-mobile">
                {listMobileM.length > 0 && (
                  <div className="couple-mobile-year-month-selector">
                    <div className="couple-year-selector">
                      <button 
                        className={`couple-year-btn ${mobilMesSelect?.year === year ? 'couple-active' : ''}`}
                        onClick={() => setMobilMesSelect(prev => ({ ...prev, year: year }))}
                      >
                        {year}
                      </button>
                      <button 
                        className={`couple-year-btn ${mobilMesSelect?.year === nxYear ? 'couple-active' : ''}`}
                        onClick={() => setMobilMesSelect(prev => ({ ...prev, year: nxYear }))}
                      >
                        {nxYear}
                      </button>
                    </div>
                    
                    <select 
                      className="couple-month-select" 
                      onChange={(e) => callMesMobil(parseInt(e.target.value))}
                      value={indexMobil}
                      aria-label="Select month"
                    >
                      {listMobileM.map((month, idx) => (
                        <option key={idx} value={idx}>
                          {month.name}, {month.year || ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="couple-forecast-card-mobile">
                  {smallLoading ? (
                    renderSmallLoading()
                  ) : (
                    listMobileM.length > 0 && (
                      <div className="couple-mobile-month-details">
                        <h4 className="couple-mobile-month-title">
                          {listMobileM[indexMobil]?.name || ''} {listMobileM[indexMobil]?.year || ''}
                        </h4>
                        
                        {renderMonthlyChart(listMobileM[indexMobil])}
                        
                        <div className="couple-mobile-day-forecast">
                          <h5 className="couple-mobile-day-title">Daily Forecast | Pronóstico Diario</h5>
                          {listMobileM[indexMobil] && (
                            <div className="couple-day-forecast-container">
                              <table className="couple-day-table">
                                <thead>
                                  <tr>
                                    <th>Day | Día</th>
                                    <th>{nombre}</th>
                                    <th>{nombre2}</th>
                                    <th>Combined</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <tr key={i}>
                                      <td>{i + 1}</td>
                                      <td>{calculosUtils.sum(parseInt(rpinaculo[0]?.top) || 0, i + 1)}</td>
                                      <td>{calculosUtils.sum(parseInt(rpinaculo2[0]?.top) || 0, i + 1)}</td>
                                      <td>{calculosUtils.sum(
                                        calculosUtils.sum(parseInt(rpinaculo[0]?.top) || 0, i + 1),
                                        calculosUtils.sum(parseInt(rpinaculo2[0]?.top) || 0, i + 1)
                                      )}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="couple-see-more-days">
                                <button 
                                  className="couple-see-more-btn" 
                                  onClick={() => {
                                    // Handle showing full day view - placeholder
                                    console.log("Show full day view");
                                  }}
                                >
                                  See All Days
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="daily-section">
        <div className="daily-header">
          <img src={dailyCalcImg} alt="" className="daily-header-image" />
        </div>
        {listMobileM.length > 0 && (
          <div className="couple-forecast-content">
            {getScreenWidth ? (
              // Desktop view
              <div className="couple-forecast-desktop">
                <DesktopDayGridComponent birthdate={birthdate} birthdate2={birthdate2} isCouple={true}/>
              </div>
            ) : (
              // Mobile view - second instance
              <div className="couple-forecast-mobile">
                {/* Mobile view content for daily forecast */}
                {/* This content is similar to the monthly forecast mobile view */}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="couple-footer">
        <div className="couple-website">www.numerana.com</div>
        <div className="couple-author">By: Ana Dorotea</div>
      </div>
    </div>
    </>
  );
  
  return (
    <div className="couple-main">
      {loading && <div className="couple-lds-ripple"><div></div><div></div></div>}
      
      <div ref={contentRef} className="couple-content">
        {!resultados && renderForm()}
        
        {resultados && (
          <>
            {renderResults()}
          </>
        )}
      </div>
    </div>
  );
};

export default CoupleComponent; 