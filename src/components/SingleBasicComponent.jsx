import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import calculosUtils from '../utils/calculosUtils';
import './SingleComponent.css';

// Import modular components
import NumerologyInputFormComponent from '../components/common/NumerologyInputFormComponent';
import ResultsHeaderComponent from '../components/common/ResultsHeaderComponent';
import PinaculoChartComponent from '../components/common/PinaculoChartComponent';
import YearChartComponent from '../components/common/YearChartComponent';
import MobileYearSliderComponent from '../components/common/MobileYearSliderComponent';
import MobileMonthDayViewComponent from '../components/common/MobileMonthDayViewComponent';
import DesktopMonthGridComponent from '../components/common/DesktopMonthGridComponent';
import DesktopDayGridComponent from '../components/common/DesktopDayGridComponent';
import LoadingComponent from '../components/common/LoadingComponent';

const SingleBasicComponent = () => {
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
      setRpinaculo(pinaculo);
      
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
        
        <NumerologyInputFormComponent
          isVisible={isVisible}
          resultados={resultados}
          nombre={nombre}
          setNombre={setNombre}
          birthdate={birthdate}
          birthdateShow={birthdateShow}
          handleBirthdateChange={handleBirthdateChange}
          handleSubmit={handleSubmit}
          birthRef={birthRef}
        />
        
        <div id="page1" className="page" style={{display: resultados ? 'block' : 'none'}}>
          <ResultsHeaderComponent
            resultados={resultados}
            nombre={nombre}
            birthdateShow={birthdateShow}
            reload={reload}
            downloadPdf={downloadPdf}
            getScreenWidth={getScreenWidth}
            print={print}
          />

          <div className="container">
            <div className="row">
              <div className="col-8">
                <PinaculoChartComponent pinaculo={rpinaculo.length > 0 ? rpinaculo[0] : null} />
              </div>
              <div className="col-4">
                <div className="rside">
                  <YearChartComponent 
                    year={year} 
                    data={pinYear.length > 0 ? pinYear[0] : null} 
                    isCurrentYear={true} 
                  />
                  <div className="selected">
                    <YearChartComponent 
                      year={nxYear} 
                      data={pinYear.length > 0 ? pinYear[0] : null} 
                      isCurrentYear={false} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {getScreenWidth ? (
              // Desktop view
              <>
                <DesktopMonthGridComponent birthdate={birthdate} />
                <DesktopDayGridComponent birthdate={birthdate} />
              </>
            ) : (
              // Mobile view
              <>
                <div className="section-divider"></div>
                <MobileYearSliderComponent
                  currentYear={year}
                  nextYear={nxYear}
                  onYearSelect={handleYearSelect}
                  listMobileM={listMobileM}
                  mobilMesSelect={mobilMesSelect}
                  setMobilMesSelect={setMobilMesSelect}
                />
                <MobileMonthDayViewComponent
                  birthdate={birthdate}
                  mobilMesSelect={mobilMesSelect}
                  smallLoading={smallLoading}
                />
              </>
            )}
          </div>
        </div>
        
        <div ref={myScrollContainerRef}></div>
      </div>
    </main>
  );
};

export default SingleBasicComponent; 