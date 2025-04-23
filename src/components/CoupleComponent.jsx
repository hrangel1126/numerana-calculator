import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import calculosUtils from '../utils/calculosUtils';
import PinaculoSvg from './PinaculoSvg';
import YearSvg from './YearSvg';
import MonthVisualizer from './MonthVisualizer';
import DayTable from './DayTable';
import './CoupleComponent.css';

// Import images directly
import leftDecoration from '../assets/img/Lleft.png';
import rightDecoration from '../assets/img/Lright.png';
import logoImage from '../assets/img/logonumerana80.png';

const CoupleComponent = () => {
  // State variables for person 1
  const [nombre, setNombre] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [birthdateShow, setBirthdateShow] = useState('');
  
  // State variables for person 2
  const [nombre2, setNombre2] = useState('');
  const [birthdate2, setBirthdate2] = useState('');
  const [birthdateShow2, setBirthdateShow2] = useState('');
  
  // Shared state variables
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [resultados, setResultados] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  
  // Results for person 1
  const [rpinaculo, setRpinaculo] = useState([]);
  const [pinYear, setPinYear] = useState([]);
  
  // Results for person 2
  const [rpinaculo2, setRpinaculo2] = useState([]);
  const [pinYear2, setPinYear2] = useState([]);
  
  // Couple combined results
  const [rpinaculoCouple, setRpinaculoCouple] = useState([]);
  
  // Screen width state for responsive display
  const [getScreenWidth, setGetScreenWidth] = useState(true);
  
  // Constants for years
  const thisY = new Date();
  const year = thisY.getFullYear();
  const nxYear = thisY.getFullYear() + 1;
  
  // Refs
  const contentRef = useRef(null);
  const birth1Ref = useRef(null);
  const birth2Ref = useRef(null);
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
    if ((nombre.length <= 1 && nombre2.length <= 1) || (!birthdate && !birthdate2)) {
      alert("At least one person's data must be complete.\nAl menos una persona debe tener datos completos.");
      return;
    }
    
    // Validate person 1
    let validPerson1 = false;
    let person1Data = null;
    
    if (nombre.length > 1 && birthdate) {
      const fixDate = birthdate.split('/');
      if (fixDate.length < 3) {
        alert("Check birthdate format for person 1.\nVerifica la fecha de la persona 1.");
        return;
      }
      
      const day = parseInt(fixDate[0]);
      const month = parseInt(fixDate[1]);
      const year = parseInt(fixDate[2]);
      
      if (isNaN(day) || isNaN(month) || isNaN(year) || 
          day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
        alert("Invalid date format for person 1. Please use DD/MM/YYYY format.");
        return;
      }
      
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
      
      setBirthdateShow(formattedDate);
      validPerson1 = true;
      person1Data = formattedDate;
    }
    
    // Validate person 2
    let validPerson2 = false;
    let person2Data = null;
    
    if (nombre2.length > 1 && birthdate2) {
      const fixDate = birthdate2.split('/');
      if (fixDate.length < 3) {
        alert("Check birthdate format for person 2.\nVerifica la fecha de la persona 2.");
        return;
      }
      
      const day = parseInt(fixDate[0]);
      const month = parseInt(fixDate[1]);
      const year = parseInt(fixDate[2]);
      
      if (isNaN(day) || isNaN(month) || isNaN(year) || 
          day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
        alert("Invalid date format for person 2. Please use DD/MM/YYYY format.");
        return;
      }
      
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
      
      setBirthdateShow2(formattedDate);
      validPerson2 = true;
      person2Data = formattedDate;
    }
    
    if (!validPerson1 && !validPerson2) {
      alert("At least one person's data must be valid.\nAl menos una persona debe tener datos válidos.");
      return;
    }
    
    setLoading(true);
    setIsVisible(false);
    
    // Calculate results
    try {
      // Process person 1 data if valid
      if (validPerson1) {
        const pinaculo = calculosUtils.GetFirstLine(person1Data);
        setRpinaculo([pinaculo]);
        
        const yearData = calculosUtils.GetYear(person1Data);
        setPinYear([yearData]);
      }
      
      // Process person 2 data if valid
      if (validPerson2) {
        const pinaculo2 = calculosUtils.GetFirstLine(person2Data);
        setRpinaculo2([pinaculo2]);
        
        const yearData2 = calculosUtils.GetYear(person2Data);
        setPinYear2([yearData2]);
      }
      
      // Calculate couple compatibility if both are valid
      if (validPerson1 && validPerson2) {
        // For a real implementation, you would have a specific couple calculation function
        // This is a simplified version that could be enhanced with actual compatibility logic
        const combinedData = {
          person1: validPerson1 ? rpinaculo[0] : null,
          person2: validPerson2 ? rpinaculo2[0] : null,
          compatibility: calculateCompatibility(
            validPerson1 ? rpinaculo[0] : null, 
            validPerson2 ? rpinaculo2[0] : null
          )
        };
        
        setRpinaculoCouple([combinedData]);
      }
      
      setResultados(true);
      
      // Scroll to results after rendering
      setTimeout(() => {
        if (myScrollContainerRef.current) {
          myScrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Error calculating results:', error);
      alert(`Calculation error: ${error.message || 'Please try again with valid dates.'}`);
      setLoading(false);
      setIsVisible(true);
      return;
    }
    
    setLoading(false);
  };
  
  // Simple compatibility calculation - this is a placeholder and could be enhanced
  const calculateCompatibility = (person1Data, person2Data) => {
    // This is a simplified compatibility calculation
    if (!person1Data || !person2Data) return {};
    
    return {
      emotional: determineCompatibilityLevel(person1Data.P1, person2Data.P1),
      mental: determineCompatibilityLevel(person1Data.P2, person2Data.P2),
      spiritual: determineCompatibilityLevel(person1Data.P3, person2Data.P3),
      overall: determineCompatibilityLevel(
        parseInt(person1Data.P1) + parseInt(person1Data.P2) + parseInt(person1Data.P3),
        parseInt(person2Data.P1) + parseInt(person2Data.P2) + parseInt(person2Data.P3)
      )
    };
  };
  
  // Helper function for compatibility calculation
  const determineCompatibilityLevel = (value1, value2) => {
    const diff = Math.abs(parseInt(value1) - parseInt(value2));
    if (diff === 0) return 'Excellent';
    if (diff <= 2) return 'Good';
    if (diff <= 4) return 'Average';
    return 'Challenging';
  };
  
  // Handle birthdate input with mask for person 1
  const handleBirthdate1Change = (e) => {
    let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    
    // Format with slashes in correct positions
    if (value.length > 0) {
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      
      if (value.length > 5) {
        value = value.substring(0, 5) + '/' + value.substring(5);
      }
      
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
    }
    
    setBirthdate(value);
  };
  
  // Handle birthdate input with mask for person 2
  const handleBirthdate2Change = (e) => {
    let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    
    // Format with slashes in correct positions
    if (value.length > 0) {
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      
      if (value.length > 5) {
        value = value.substring(0, 5) + '/' + value.substring(5);
      }
      
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
    }
    
    setBirthdate2(value);
  };
  
  // Reload function
  const reload = () => {
    setIsVisible(true);
    setResultados(false);
    setNombre('');
    setBirthdate('');
    setBirthdateShow('');
    setNombre2('');
    setBirthdate2('');
    setBirthdateShow2('');
    setRpinaculo([]);
    setPinYear([]);
    setRpinaculo2([]);
    setPinYear2([]);
    setRpinaculoCouple([]);
  };
  
  // Print function
  const downloadPdf = () => {
    if (typeof window !== 'undefined' && window.html2pdf && contentRef.current) {
      const content = contentRef.current;
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'CoupleCalculation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      window.html2pdf().set(opt).from(content).save();
    } else {
      alert('PDF generation is not available. Please check if the html2pdf library is loaded.');
    }
  };
  
  // Render the input form
  const renderForm = () => (
    <div className={`containerBox ${isVisible ? 'visible' : 'hidden'}`} style={{display: !resultados ? 'block' : 'none', border: '1px solid #ccc', borderRadius: '8px'}}>
      <div className="row person resultado2">
        <div className="col-md-2 col-2">
          <img src={leftDecoration} className="Lleft" alt="Left decoration" />
        </div>
        <div className="col-md-8 col-8" style={{ textAlign: 'center' }}>
          <img src={logoImage} alt="numeranamx" className="logo" />
          <h1 className="titulom">Numerology | Numerología</h1>
        </div>
        <div className="col-md-2 col-2">
          <img src={rightDecoration} className="Lright" alt="Right decoration" />
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 col-6 text-center">
          <div className="person-title">
            <span className="number">1</span> <i className="bi bi-person-fill"></i>
          </div>
        </div>
        <div className="col-md-6 col-6 text-center">
          <div className="person-title">
            <span className="number">2</span> <i className="bi bi-person-fill"></i>
          </div>
        </div>
      </div>
      
      <div className="row" id="name">
        <div className="col-md-6 col-6">
          <div className="form-group">
            <label htmlFor="Name"><b>Name/Nombre</b></label>
            <input 
              type="text" 
              className="form-control nombres" 
              name="Name" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Name/Nombre" 
              autoComplete="off"
            />
          </div>
        </div>
        <div className="col-md-6 col-6">
          <div className="form-group">
            <label htmlFor="Name2"><b>Name/Nombre</b></label>
            <input 
              type="text" 
              className="form-control nombres" 
              name="Name2" 
              value={nombre2}
              onChange={(e) => setNombre2(e.target.value)}
              placeholder="Name/Nombre" 
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 col-6">
          <div className="form-group">
            <label htmlFor="birth"><b>Birthdate/Cumple</b></label>
            <input
              className="form-control nombres"
              placeholder="dd/mm/yyyy"
              type="text"
              value={birthdate}
              onChange={handleBirthdate1Change}
              ref={birth1Ref}
              name="birth"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="col-md-6 col-6">
          <div className="form-group">
            <label htmlFor="birth2"><b>Birthdate/Cumple</b></label>
            <input
              className="form-control nombres"
              placeholder="dd/mm/yyyy"
              type="text"
              value={birthdate2}
              onChange={handleBirthdate2Change}
              ref={birth2Ref}
              name="birth2"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-4 col-2"></div>
        <div className="col-md-4 col-8">
          <button 
            style={{ marginTop: '1rem' }} 
            type="button" 
            onClick={handleSubmit} 
            className="btn btn-primary btn-lg btn-block send"
          >
            <i className="bi bi-play-btn-fill" style={{ marginRight: '5px' }}></i>
          </button>
        </div>
        <div className="col-md-4 col-2"></div>
      </div>
      
      <div className="row mt-3">
        <div className="col-md-8 col-8 offset-md-4 offset-4">
          <p className="website">www.numerana.com</p>
          <p className="website">By: Ana Dorotea</p>
        </div>
      </div>
    </div>
  );
  
  // Render the results header with calculations visualization
  const renderResults = () => (
    <div className="results-container">
      <div className={`containerBox ${resultados ? 'visible' : 'hidden'}`} style={{display: resultados ? 'block' : 'none', border: '1px solid #ccc', borderRadius: '8px'}}>
        <div className="row person resultado2">
          <div className="col-md-2 col-2">
            <img src={leftDecoration} className="Lleft" alt="Left decoration" />
          </div>
          <div className="col-md-8 col-8" style={{ textAlign: 'center' }}>
            <img src={logoImage} alt="numeranamx" className="logo" />
            <h1 className="titulom">Numerology | Numerología</h1>
          </div>
          <div className="col-md-2 col-2">
            <img src={rightDecoration} className="Lright" alt="Right decoration" />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 col-6 text-center">
            <div className="person-title">
              <span className="number">1</span> <i className="bi bi-person-fill"></i>
            </div>
            <h3 className="name">{nombre}</h3>
            <p>{birthdateShow}</p>
          </div>
          <div className="col-md-6 col-6 text-center">
            <div className="person-title">
              <span className="number">2</span> <i className="bi bi-person-fill"></i>
            </div>
            <h3 className="name">{nombre2}</h3>
            <p>{birthdateShow2}</p>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-4 col-2"></div>
          <div className="col-md-4 col-8">
            <button 
              style={{ marginTop: '1rem' }} 
              type="button" 
              onClick={reload} 
              className="btn btn-primary btn-lg btn-block send"
            >
              <i className="bi bi-arrow-clockwise" style={{ marginRight: '5px' }}></i>
            </button>
          </div>
          <div className="col-md-4 col-2"></div>
        </div>
        
        <div className="row mt-3">
          <div className="col-md-8 col-8 offset-md-4 offset-4">
            <p className="website">www.numerana.com</p>
            <p className="website">By: Ana Dorotea</p>
          </div>
        </div>
      </div>

      {/* Display the calculation results with SVG visualizations */}
      <div className="container mt-4" style={{ display: resultados ? 'block' : 'none' }}>
        <div className="section-divider"></div>
        <h3 className="section-title">Individual Calculations</h3>
        
        {/* Person 1 Calculations */}
        {rpinaculo.length > 0 && (
          <div className="row mb-4">
            <div className="col-md-6 col-12">
              <h4 className="person-title">{nombre}</h4>
              <div className="A">
                <PinaculoSvg pinaculo={rpinaculo[0]} />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="rside">
                <div className="centerVertHoriz">
                  <div style={{ margin: '0.5rem 0' }}>
                    <YearSvg year={year} years={pinYear[0]} />
                  </div>
                  <div style={{ margin: '0.5rem 0' }}>
                    <YearSvg year={nxYear} years={pinYear[0]} />
                  </div>
                </div>
                <div className="centerVertHoriz" style={{ marginBottom: '1rem' }}>
                  <MonthVisualizer birthdate={birthdate} year={year} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Person 2 Calculations */}
        {rpinaculo2.length > 0 && (
          <div className="row mb-4">
            <div className="col-md-6 col-12">
              <h4 className="person-title">{nombre2}</h4>
              <div className="A">
                <PinaculoSvg pinaculo={rpinaculo2[0]} />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="rside">
                <div className="centerVertHoriz">
                  <div style={{ margin: '0.5rem 0' }}>
                    <YearSvg year={year} years={pinYear2[0]} />
                  </div>
                  <div style={{ margin: '0.5rem 0' }}>
                    <YearSvg year={nxYear} years={pinYear2[0]} />
                  </div>
                </div>
                <div className="centerVertHoriz" style={{ marginBottom: '1rem' }}>
                  <MonthVisualizer birthdate={birthdate2} year={year} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Couple Compatibility Analysis */}
        {rpinaculo.length > 0 && rpinaculo2.length > 0 && (
          <>
            <div className="section-divider"></div>
            <h3 className="section-title">Compatibility Analysis</h3>
            
            <div className="compatibility-container">
              <div className="compatibility-chart">
                <h4>Numerological Compatibility</h4>
                <table className="compatibility-table">
                  <thead>
                    <tr>
                      <th>Aspect</th>
                      <th>{nombre}</th>
                      <th>{nombre2}</th>
                      <th>Compatibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Emotional (P1)</td>
                      <td>{rpinaculo[0].P1}</td>
                      <td>{rpinaculo2[0].P1}</td>
                      <td className={`compatibility-${rpinaculo[0].P1 === rpinaculo2[0].P1 ? 'excellent' : Math.abs(rpinaculo[0].P1 - rpinaculo2[0].P1) <= 2 ? 'good' : Math.abs(rpinaculo[0].P1 - rpinaculo2[0].P1) <= 4 ? 'average' : 'challenging'}`}>
                        {determineCompatibilityLevel(rpinaculo[0].P1, rpinaculo2[0].P1)}
                      </td>
                    </tr>
                    <tr>
                      <td>Mental (P2)</td>
                      <td>{rpinaculo[0].P2}</td>
                      <td>{rpinaculo2[0].P2}</td>
                      <td className={`compatibility-${rpinaculo[0].P2 === rpinaculo2[0].P2 ? 'excellent' : Math.abs(rpinaculo[0].P2 - rpinaculo2[0].P2) <= 2 ? 'good' : Math.abs(rpinaculo[0].P2 - rpinaculo2[0].P2) <= 4 ? 'average' : 'challenging'}`}>
                        {determineCompatibilityLevel(rpinaculo[0].P2, rpinaculo2[0].P2)}
                      </td>
                    </tr>
                    <tr>
                      <td>Spiritual (P3)</td>
                      <td>{rpinaculo[0].P3}</td>
                      <td>{rpinaculo2[0].P3}</td>
                      <td className={`compatibility-${rpinaculo[0].P3 === rpinaculo2[0].P3 ? 'excellent' : Math.abs(rpinaculo[0].P3 - rpinaculo2[0].P3) <= 2 ? 'good' : Math.abs(rpinaculo[0].P3 - rpinaculo2[0].P3) <= 4 ? 'average' : 'challenging'}`}>
                        {determineCompatibilityLevel(rpinaculo[0].P3, rpinaculo2[0].P3)}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Overall</strong></td>
                      <td>{parseInt(rpinaculo[0].P1) + parseInt(rpinaculo[0].P2) + parseInt(rpinaculo[0].P3)}</td>
                      <td>{parseInt(rpinaculo2[0].P1) + parseInt(rpinaculo2[0].P2) + parseInt(rpinaculo2[0].P3)}</td>
                      <td className={`compatibility-${determineCompatibilityLevel(parseInt(rpinaculo[0].P1) + parseInt(rpinaculo[0].P2) + parseInt(rpinaculo[0].P3), parseInt(rpinaculo2[0].P1) + parseInt(rpinaculo2[0].P2) + parseInt(rpinaculo2[0].P3)).toLowerCase()}`}>
                        {determineCompatibilityLevel(
                          parseInt(rpinaculo[0].P1) + parseInt(rpinaculo[0].P2) + parseInt(rpinaculo[0].P3),
                          parseInt(rpinaculo2[0].P1) + parseInt(rpinaculo2[0].P2) + parseInt(rpinaculo2[0].P3)
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="compatibility-summary">
                <h4>Summary</h4>
                <p>
                  This numerological analysis shows the compatibility between {nombre} and {nombre2} based on their birth dates. 
                  The emotional, mental, and spiritual aspects of their relationship are represented by the numbers above, 
                  with overall compatibility determined by the combination of these key factors.
                </p>
              </div>
            </div>
            
            {/* Download PDF Button */}
            <div className="row mt-4">
              <div className="col-12 text-center">
                <button 
                  type="button" 
                  onClick={downloadPdf} 
                  className="btn btn-primary btn-lg"
                  style={{ margin: '20px auto' }}
                >
                  <i className="bi bi-printer-fill" style={{ marginRight: '5px' }}></i> Download PDF
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
  // Render loading spinner
  const renderLoading = () => (
    <div className="loading" style={{display: loading ? 'flex' : 'none'}}>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  );

  return (
    <main className="main">
      <div ref={contentRef} className="content" id="content">
        {renderLoading()}
        
        {!resultados && renderForm()}
        
        {resultados && renderResults()}
        
        <div ref={myScrollContainerRef}></div>
      </div>
    </main>
  );
};

export default CoupleComponent; 