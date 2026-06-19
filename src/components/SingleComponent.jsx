import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import calculosUtils from '../utils/calculosUtils';
import './SingleComponent.css';
import { useTranslation } from '../utils/i18n/LanguageContext';

// Import images
import heroNumerology from '../assets/img/hero-numerology.png';
import titleHead from '../assets/img/title-head.png';
import caracol from '../assets/img/caracol.png';
import annualCalcImg from '../assets/img/Annual-calculation.png';
import monthlyCalcImg from '../assets/img/monthly-calculation.png';
import dailyCalcImg from '../assets/img/daily-calculatiom-header.png';

// Import modular components
import ResultsHeaderComponent from '../components/common/ResultsHeaderComponent';
import PinaculoChartComponent from '../components/common/PinaculoChartComponent';
import YearChartComponent from '../components/common/YearChartComponent';
import MobileYearSliderComponent from '../components/common/MobileYearSliderComponent';
import MobileMonthDayViewComponent from '../components/common/MobileMonthDayViewComponent';
import DesktopMonthGridComponent from '../components/common/DesktopMonthGridComponent';
import DesktopDayGridComponent from '../components/common/DesktopDayGridComponent';
import LoadingComponent from '../components/common/LoadingComponent';
import CaptchaComponent from '../components/common/CaptchaComponent';

const SingleComponent = () => {
  const { t } = useTranslation();
  // State variables
  const [nombre, setNombre] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [birthdateShow, setBirthdateShow] = useState('');
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [resultados, setResultados] = useState(false);
  const [resultadosMes, setResultadosMes] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  const [rpinaculo, setRpinaculo] = useState([]);
  const [pinYear, setPinYear] = useState([]);
  const [getScreenWidth, setGetScreenWidth] = useState(true);
  const [monthsVisible, setMonthsVisible] = useState({
    CYQ1: false,
    CYQ2: false,
    CYQ3: false,
    NYQ: false,
  });
  const [print, setPrint] = useState(true);
  
  // Constants
  const thisY = new Date();
  const year = thisY.getFullYear();
  const nxYear = thisY.getFullYear() + 1;
  const [listMobileM, setListMobileM] = useState([]);
  const [mobilMesSelect, setMobilMesSelect] = useState({
    year: 0,
    Month: 0,
  });
  
  // Refs
  const contentRef = useRef(null);
  const birthRef = useRef(null);
  const myScrollContainerRef = useRef(null);
  const captchaRef = useRef(null);
  
  // Effects
  useEffect(() => {
    setGetScreenWidth(window.innerWidth > 600);
    
    const handleResize = () => {
      setGetScreenWidth(window.innerWidth > 600);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Load initial data
    theLoading(1500).then(() => {
      setIsVisible(true);
    });
    
    // Get current month to determine which quarters to show
    const currentMonth = calculosUtils.getTodaysMonth();
    if (currentMonth === 1) {
      setMonthsVisible({
        CYQ1: true,
        CYQ2: true,
        CYQ3: true,
        NYQ: false
      });
    } else if (currentMonth === 2) {
      setMonthsVisible({
        CYQ1: true,
        CYQ2: true,
        CYQ3: true,
        NYQ: false
      });
    } else if (currentMonth === 3) {
      setMonthsVisible({
        CYQ1: false,
        CYQ2: false,
        CYQ3: true,
        NYQ: true
      });
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
  
  // Form submission
  const handleSubmit = () => {
    // Step 1: Validate Captcha FIRST
    if (captchaRef.current) {
      const userCaptchaInput = captchaRef.current.getUserInput();
      if (!captchaRef.current.validate(userCaptchaInput)) {
        alert(t('captcha.validationFailed'));
        return;
      }
    }

    // Step 2: Validate form fields
    if (nombre.length <= 1 || !birthdate) {
      alert("Name and birthdate can't be empty.\nNombre y cumpleaños no pueden estar vacios.");
      return;
    }
    
    const fixDate = birthdate.split('/');
    if (fixDate.length < 3) {
      alert("Check birthdate length.\nVerifica la fecha completa.");
      return;
    }
    
    // Validate date parts
    const day = parseInt(fixDate[0]);
    const month = parseInt(fixDate[1]);
    const year = parseInt(fixDate[2]);
    
    if (isNaN(day) || isNaN(month) || isNaN(year) || 
        day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
      alert("Invalid date format. Please use DD/MM/YYYY format.");
      return;
    }
    
    // Ensure the date parts have proper leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    
    setLoading(true);
    setIsVisible(false);
    
    // Process the date
    setBirthdateShow(formattedDate);
    
    // Calculate results
    try {
      console.log("Calculating with date:", formattedDate);
      const pinaculo = calculosUtils.GetFirstLine(formattedDate);
      console.log("Pinaculo result...................", pinaculo);
      setRpinaculo([pinaculo[0]]);
      
      const yearData = calculosUtils.GetYear(formattedDate);
      console.log("Year data result:", yearData);
      setPinYear([yearData]);
      
      setResultados(true);
      
      // Scroll to results after rendering
      setTimeout(() => {
        if (myScrollContainerRef.current) {
          myScrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Error calculating results:', error);
      alert(`Calculation error: ${error.message || 'Please try again with a valid date.'}` );
      setLoading(false);
      setIsVisible(true);
      return;
    }
    
    setLoading(false);
  };
  
  // Handle birthdate input with mask
  const handleBirthdateChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    
    // Format with slashes in correct positions
    if (value.length > 0) {
      // Add first slash after day (after first 2 digits)
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      
      // Add second slash after month (after first 5 chars: dd/mm)
      if (value.length > 5) {
        value = value.substring(0, 5) + '/' + value.substring(5);
      }
      
      // Limit to 10 chars (dd/mm/yyyy)
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
    }
    
    setBirthdate(value);
  };
  
  // Reload function
  const reload = () => {
    setIsVisible(true);
    setResultados(false);
    setNombre('');
    setBirthdate('');
    setBirthdateShow('');
    setRpinaculo([]);
    setPinYear([]);
  };
  
  // Print function with PDF generation
  const downloadPdf = () => {
    if (typeof window !== 'undefined' && window.html2pdf && contentRef.current) {
      const content = contentRef.current;
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'SingleNumerologyCalculation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      window.html2pdf().set(opt).from(content).save();
    } else {
      alert('PDF generation is not available. Please check if the html2pdf library is loaded.');
    }
  };
  
  // Handle mobile year selection
  const handleYearSelect = (selectedYear) => {
    setMobilMesSelect({ ...mobilMesSelect, year: selectedYear, Month: 0 });
    setListMobileM([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  };

  return (
    <main className="main">
      <div ref={contentRef} className="content">
        <LoadingComponent loading={loading} />
        
        {!resultados && (
          <div className={`singleBasic-form-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="singleBasic-hero-container">
              <div className="singleBasic-left-column">
                <div className="singleBasic-title-section">
                  <img src={titleHead} alt="title" className="singleBasic-title-img" />
                </div>
                <div className="singleBasic-form-content">
                  <div className="singleBasic-form-group">
                    <label htmlFor="name-input">{t('singleBasic.nameLabel')}</label>
                    <input
                      id="name-input"
                      type="text"
                      className="singleBasic-form-control"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder={t('singleBasic.namePlaceholder')}
                      autoComplete="off"
                    />
                  </div>
                  <div className="singleBasic-form-group">
                    <label htmlFor="birthdate-input">{t('singleBasic.birthdateLabel')}</label>
                    <input
                      id="birthdate-input"
                      className="singleBasic-form-control"
                      placeholder={t('singleBasic.birthdatePlaceholder')}
                      type="text"
                      value={birthdate}
                      onChange={handleBirthdateChange}
                      ref={birthRef}
                      autoComplete="off"
                    />
                  </div>
                   <div className="singleBasic-form-group">
                     <label htmlFor="email-input">{t('singleBasic.emailLabel')}</label>
                     <input
                       id="email-input"
                       className="singleBasic-form-control"
                       placeholder={t('singleBasic.emailPlaceholder')}
                       type="email"
                       autoComplete="off"
                     />
                   </div>
                   <div className="singleBasic-form-group">
                     <label>Captcha Verification</label>
                     <CaptchaComponent ref={captchaRef} />
                   </div>
                   <button onClick={handleSubmit} className="singleBasic-submit-btn">
                     <img src={caracol} alt="caracol" className="singleBasic-btn-icon" />
                     {t('singleBasic.submitButton')}
                   </button>
                </div>
              </div>
              <div className="singleBasic-right-column">
                <img src={heroNumerology} alt="numerology" className="singleBasic-hero-img" />
              </div>
            </div>
          </div>
        )}
        
         {/* Results Section */}
         {resultados && (
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
                   <p className="Results-title">Personal Numerology Cart</p>
                     <p className="Results-descriptionText Results-descriptionText--left title-descripcion">
                    This personalized report provides insights into your 
                    annual monthly, and daily numerology cycles.
                   </p>
             <div className="results-header-wrapper" style={{ left: '-10%', position: 'relative' }}>
               <div className="results-header-left">
             <PinaculoChartComponent pinaculo={rpinaculo.length > 0 ? rpinaculo[0] : null} style={{ position: 'relative', top: '-20px'}} />

                  <ResultsHeaderComponent
                    resultados={resultados}
                    nombre={nombre}
                    birthdateShow={birthdateShow}
                    reload={reload}
                    downloadPdf={downloadPdf}
                    getScreenWidth={getScreenWidth}
                    print={print}
                    t={t}
                  />
               </div>
               <div className="results-header-right">
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
                       data={pinYear.length > 0 ? pinYear[0] : null} 
                       isCurrentYear={false} 
                     />
                   </div>
                 </div>
               </div>
             </div>

             <div className="container results-container">
               {/* Annual Calculations Section */}
               {/* <div className="annual-section">
                 <div className="annual-header">
                   <img src={annualCalcImg} alt="Annual Calculations" className="annual-header-image" />
                 </div> */}
                 {/* {t('annual.description') || 'Explore your annual numerology cycles...'} */}
                 {/* <div className="annual-years-grid">
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
                       data={pinYear.length > 0 ? pinYear[0] : null} 
                       isCurrentYear={false} 
                     />
                   </div>
                 </div>
               </div> */}

                <div className="monthly-section">
                  <div className="monthly-header">
                    <img src={monthlyCalcImg} alt="" className="monthly-header-image" />
                  </div>
                  {/* {t('monthly.description') || 'Discover the monthly energy patterns...'} */}
                  {getScreenWidth ? (
                    <DesktopMonthGridComponent birthdate={birthdate} />
                  ) : (
                    <MobileYearSliderComponent
                      currentYear={year}
                      nextYear={nxYear}
                      onYearSelect={handleYearSelect}
                      listMobileM={listMobileM}
                      mobilMesSelect={mobilMesSelect}
                      setMobilMesSelect={setMobilMesSelect}
                    />
                  )}
                </div>

                <div className="daily-section">
                  <div className="daily-header">
                    <img src={dailyCalcImg} alt="" className="daily-header-image" />
                  </div>
                  {/* {t('daily.description') || 'Understand the daily numerical influences...'} */}
                  {getScreenWidth ? (
                    <DesktopDayGridComponent birthdate={birthdate} />
                  ) : (
                    <MobileMonthDayViewComponent
                      birthdate={birthdate}
                      mobilMesSelect={mobilMesSelect}
                      smallLoading={smallLoading}
                    />
                  )}
                </div>

               {/* Action Buttons */}
               <div className="action-buttons" style={{ marginTop: '2rem', textAlign: 'center' }}>
                 <button className="download-button" onClick={downloadPdf}>
                   Download PDF
                 </button>
                 <button className="generate-button" onClick={reload}>
                   New Calculation
                 </button>
               </div>
             </div>
           </div>
         )}

         <div></div>
      </div>
    </main>
  );
};

export default SingleComponent; 