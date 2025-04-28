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

// Import utility functions
import { calculosUtils } from '../utils/calculosUtils';

// Import Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import images
import leftDecoration from '../assets/img/Lleft.png';
import rightDecoration from '../assets/img/Lright.png';
import logoImage from '../assets/img/logonumerana80.png';

import './CoupleComponent.css';

const CoupleComponent = () => {
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
      setRpinaculo(pinaculo1);
      
      // Calculate for person 2
      const pinaculo2 = calculosUtils.GetFirstLine(birthdate2);
      console.log('.....bitrhdat2 .......', birthdate2, '..................', pinaculo2);
      setRpinaculo2(pinaculo2);
      
      // Calculate couple compatibility
      calculateCoupleCompatibility(pinaculo1, pinaculo2);
      
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
      
      setSinastra([combinedSinastra]);
      
      // Third combined result
      const combinedPinaculo = {
        A: calculosUtils.sum(parseInt(person1.A) || 0, parseInt(person2.A) || 0),
        B: calculosUtils.sum(parseInt(person1.B) || 0, parseInt(person2.B) || 0),
        C: calculosUtils.sum(parseInt(person1.C) || 0, parseInt(person2.C) || 0),
        D: calculosUtils.sum(parseInt(person1.D) || 0, parseInt(person2.D) || 0),
        top: calculosUtils.sum(parseInt(person1.top) || 0, parseInt(person2.top) || 0),
      };
      
      setRpinaculo3([combinedPinaculo]);
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
        // Implement month selection logic
        setSmallLoading(true);
        
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
    <div 
      className="calculator-container" 
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    >
      <div className="calculator-content">
        <div className="logo-container">
          <div className="corner-decoration">
            <img src={leftDecoration} alt="Left decoration" />
          </div>
          <div className="logo-center">
            <img src={logoImage} alt="numeranamx" className="logo" />
            <h1 className="title">Numerology | Numerología</h1>
          </div>
          <div className="corner-decoration">
            <img src={rightDecoration} alt="Right decoration" />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-column">
            <div className="person-icon-container">
              <div className="person-number">1</div>
              <div className="person-icon">
                <i className="bi bi-person-fill"></i>
              </div>
            </div>
            <h3 className="form-title">Person/Persona 1</h3>
            
            <div className="form-group">
              <label htmlFor="name1">Name/Nombre</label>
              <input 
                type="text" 
                id="name1"
                autoComplete="off" 
                className="form-control" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Name/Nombre" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="birth1">Birthdate/Cumple</label>
              <input
                className="form-control"
                id="birth1"
                autoComplete="off"
                placeholder="dd/mm/yyyy"
                type="text"
                value={birthdate}
                onChange={(e) => handleBirthdateChange(e, setBirthdate)}
                ref={birth1Ref}
              />
            </div>
          </div>
          
          <div className="form-column">
            <div className="person-icon-container">
              <div className="person-number">2</div>
              <div className="person-icon">
                <i className="bi bi-person-fill"></i>
              </div>
            </div>
            <h3 className="form-title">Person/Persona 2</h3>
            
            <div className="form-group">
              <label htmlFor="name2">Name/Nombre</label>
              <input 
                type="text" 
                id="name2"
                autoComplete="off" 
                className="form-control" 
                value={nombre2}
                onChange={(e) => setNombre2(e.target.value)}
                placeholder="Name/Nombre" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="birth2">Birthdate/Cumple</label>
              <input
                className="form-control"
                id="birth2"
                autoComplete="off"
                placeholder="dd/mm/yyyy"
                type="text"
                value={birthdate2}
                onChange={(e) => handleBirthdateChange(e, setBirthdate2)}
                ref={birth2Ref}
              />
            </div>
          </div>
        </div>
        
        <button 
          type="button" 
          onClick={subm} 
          className="submit-button"
        >
          <i className="bi bi-play-fill"></i>
          Calculate
        </button>
        
        <div className="footer">
          <div className="website">www.numerana.com</div>
          <div className="author">By: Ana Dorotea</div>
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
    <div 
      className="results-container" 
      style={{
        opacity: resultados ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
      ref={myScrollContainerRef}
    >
      <div className="logo-container">
        <div className="corner-decoration">
          <img src={leftDecoration} alt="Left decoration" />
        </div>
        <div className="logo-center">
          <img src={logoImage} alt="numeranamx" className="logo" />
          <h1 className="title">Numerology | Numerología</h1>
        </div>
        <div className="corner-decoration">
          <img src={rightDecoration} alt="Right decoration" />
        </div>
      </div>
      
      <div className="people-container">
        <div className="person-column">
          <div className="person-header">
            <div className="person-number">1</div>
          </div>
          <h2 className="person-name">{nombre}</h2>
          <h3 className="person-birthdate">{birthdate}</h3>
        </div>
        
        <div className="person-column">
          <div className="person-header">
            <div className="person-number">2</div>
          </div>
          <h2 className="person-name">{nombre2}</h2>
          <h3 className="person-birthdate">{birthdate2}</h3>
        </div>
      </div>
      
      {/* Compatibility Section */}
      <div className="compatibility-section">
        <h3 className="section-title">Compatibility | Compatibilidad</h3>
        
        <div className="compatibility-charts">
          {getScreenWidth ? (
            // Desktop view
            <div className="charts-desktop">
            <div className="col-8">
                <PinaculoChartComponent pinaculo={rpinaculo.length > 0 ? rpinaculo[0] : null} />
              </div>

             

              <div className="col-8">
                <PinaculoChartComponent pinaculo={rpinaculo2.length > 0 ? rpinaculo2[0] : null} />
              </div>

              <div className="col-8">
                <PinaculoChartComponent pinaculo={sinastra.length > 0 ? sinastra[0] : null} />
              </div>
            </div>
          ) : (
            // Mobile view
            <div className="charts-mobile">
              <Swiper
                ref={swiperMbRef}
                {...swiperConfig}
                className="swiper-container-mobile"
                onSlideChange={slideChangeMobil}
              >
                <SwiperSlide className="slide-chart">
                  <h4 className="chart-title">{nombre}</h4>
                  {rpinaculo.length > 0 && (
                    <div className="numerology-diagram">
                      <div className="number-node top">{rpinaculo[0]?.top}</div>
                      <div className="number-node left">{rpinaculo[0]?.A}</div>
                      <div className="number-node right">{rpinaculo[0]?.B}</div>
                      <div className="number-node bottom-left">{rpinaculo[0]?.C}</div>
                      <div className="number-node bottom-right">{rpinaculo[0]?.D}</div>
                    </div>
                  )}
                </SwiperSlide>
                
                <SwiperSlide className="slide-chart">
                  <h4 className="chart-title">{nombre2}</h4>
                  {rpinaculo2.length > 0 && (
                    <div className="numerology-diagram">
                      <div className="number-node top">{rpinaculo2[0]?.top}</div>
                      <div className="number-node left">{rpinaculo2[0]?.A}</div>
                      <div className="number-node right">{rpinaculo2[0]?.B}</div>
                      <div className="number-node bottom-left">{rpinaculo2[0]?.C}</div>
                      <div className="number-node bottom-right">{rpinaculo2[0]?.D}</div>
                    </div>
                  )}
                </SwiperSlide>
                
                <SwiperSlide className="slide-chart">
                  <h4 className="chart-title">Compatibility</h4>
                  {sinastra.length > 0 && (
                    <div className="compatibility-diagram">
                      <div className="comp-node top">{sinastra[0]?.E}</div>
                      <div className="comp-node left">{sinastra[0]?.A}</div>
                      <div className="comp-node right">{sinastra[0]?.B}</div>
                      <div className="comp-node bottom-left">{sinastra[0]?.C}</div>
                      <div className="comp-node bottom-right">{sinastra[0]?.D}</div>
                    </div>
                  )}
                </SwiperSlide>
              </Swiper>
            </div>
          )}
        </div>
      </div>
      
      {/* Monthly Forecast Section */}
      <div className="monthly-forecast-section">
        <h3 className="forecast-header">Monthly Forecast | Pronóstico Mensual {year}/{nxYear}</h3>
        
        {listMobileM.length > 0 && (
          <div className="forecast-content">
            {getScreenWidth ? (
              // Desktop view
                <div className="forecast-desktop">
                  <DesktopMonthGridComponent birthdate={birthdate} birthdate2={birthdate2} isCouple={true}/>
              </div>
            ) : (
              // Mobile view
              <div className="forecast-mobile">
                {listMobileM.length > 0 && (
                  <select 
                    className="month-select" 
                    onChange={(e) => callMesMobil(parseInt(e.target.value))}
                    aria-label="Select month"
                  >
                    {listMobileM.map((month, idx) => (
                      <option key={idx} value={idx}>
                        {month.name}, {month.year}
                      </option>
                    ))}
                  </select>
                )}
                
                <div className="forecast-card-mobile">
                  {smallLoading ? (
                    renderSmallLoading()
                  ) : (
                    listMobileM.length > 0 && renderMonthlyChart(listMobileM[indexMobil])
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="monthly-forecast-section">
        <h3 className="forecast-header">Monthly Forecast | Pronóstico Mensual {year}/{nxYear}</h3>
        
        {listMobileM.length > 0 && (
          <div className="forecast-content">
            {getScreenWidth ? (
              // Desktop view
                <div className="forecast-desktop">
                  <DesktopDayGridComponent birthdate={birthdate} birthdate2={birthdate2} isCouple={true}/>
              </div>
            ) : (
              // Mobile view
              <div className="forecast-mobile">
                {listMobileM.length > 0 && (
                  <select 
                    className="month-select" 
                    onChange={(e) => callMesMobil(parseInt(e.target.value))}
                    aria-label="Select month"
                  >
                    {listMobileM.map((month, idx) => (
                      <option key={idx} value={idx}>
                        {month.name}, {month.year}
                      </option>
                    ))}
                  </select>
                )}
                
                <div className="forecast-card-mobile">
                  {smallLoading ? (
                    renderSmallLoading()
                  ) : (
                    listMobileM.length > 0 && renderMonthlyChart(listMobileM[indexMobil])
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="footer">
        <div className="website">www.numerana.com</div>
        <div className="author">By: Ana Dorotea</div>
      </div>
    </div>
  );
  
  return (
    <div className="main">
      <div ref={contentRef} className="content">
        {loading && renderLoading()}
        
        {!resultados && renderForm()}
        
        {resultados && renderResults()}
      </div>
    </div>
  );
};

export default CoupleComponent; 