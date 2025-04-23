import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import calculosUtils from '../utils/calculosUtils';
import PinaculoSvg from './PinaculoSvg';
import YearSvg from './YearSvg';
import './SingleComponent.css';

// Import images directly
import leftDecoration from '../assets/img/Lleft.png';
import rightDecoration from '../assets/img/Lright.png';
import logoImage from '../assets/img/logonumerana80.png';

const SingleComponent = () => {
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
    calculosUtils.getTodaysMonth().then((meshoy) => {
      if (meshoy === 1) {
        setMonthsVisible({
          CYQ1: true,
          CYQ2: true,
          CYQ3: true,
          NYQ: false
        });
      } else if (meshoy === 2) {
        setMonthsVisible({
          CYQ1: true,
          CYQ2: true,
          CYQ3: true,
          NYQ: false
        });
      } else if (meshoy === 3) {
        setMonthsVisible({
          CYQ1: false,
          CYQ2: false,
          CYQ3: true,
          NYQ: true
        });
      }
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
    if (nombre.length <= 1 || !birthdate) {
      alert("Name and birthdate can't be empty.\nNombre y cumpleaños no pueden estar vacios.");
      return;
    }
    
    const fixDate = birthdate.split('/');
    if (fixDate.length < 3) {
      alert("Check birthdate length.\nVerifica la fecha completa.");
      return;
    }
    
    setLoading(true);
    setIsVisible(false);
    
    // Process the date
    const processedDate = `${fixDate[0]}/${fixDate[1]}/${fixDate[2]}`;
    setBirthdateShow(processedDate);
    
    // Calculate results
    try {
      const pinaculo = calculosUtils.GetFirstLine(processedDate);
      setRpinaculo([pinaculo]);
      
      const yearData = calculosUtils.GetYear(processedDate);
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
      alert('Error in calculations. Please try again.');
    } finally {
      setLoading(false);
    }
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
  
  // Print function (simplified for this example)
  const downloadPdf = () => {
    alert('PDF download functionality would be implemented here');
  };
  
  // Render the input form
  const renderForm = () => (
    <div className={`containerBox ${isVisible ? 'visible' : 'hidden'}`} style={{display: !resultados ? 'flex' : 'none'}}>
      <div className="row">
        <div className="col-8 person resultado2" style={{ border: '5px solid #858585', borderRadius: '5px' }}>
          <div className="row">
            <div className="col-2">
              <img src={leftDecoration} className="Lleft" alt="Left decoration" />
            </div>
            <div className="col-8">
              <img src={logoImage} alt="numeranamx" className="logo" />
              <h1 className="numerologia">Numerology | Numerología</h1>
            </div>
            <div className="col-2">
              <img src={rightDecoration} className="Lright" alt="Right decoration" />
            </div>
          </div>
          
          <h2 className="name bold">{nombre}</h2>
          <h2 className="bold footerbox">{birthdateShow}</h2>
          <br />
          
          <div className="row" id="name">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="Name"><b>Name/Nombre</b></label>
                <input 
                  type="text" 
                  className="form-control textomv" 
                  name="Name" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Name/Nombre" 
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="birth"><b>Birthdate/Cumpleaños</b></label>
                <input
                  className="form-control textomv"
                  placeholder="dd/mm/yyyy"
                  type="text"
                  value={birthdate}
                  onChange={handleBirthdateChange}
                  ref={birthRef}
                  name="birth"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          
          <div className="row" style={{ marginBottom: '1rem' }}>
            <div className="col-3"></div>
            <div className="col-6">
              <button 
                style={{ marginTop: '1rem' }} 
                type="button" 
                onClick={handleSubmit} 
                className="btn btn-primary btn-lg btn-block send"
              >
                <i className="bi bi-play-btn-fill" style={{ zoom: 2, lineHeight: 1 }}></i>
              </button>
            </div>
            <div className="col-3">
              <div className="row">
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-6"><h2 className="website www" style={{ fontSize: '11px', right: '30px' }}>www.numerana.com</h2></div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-8"><h2 className="website ana" style={{ fontSize: '11px' }}>By: Ana Dorotea</h2></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the results header with calculations visualization
  const renderResults = () => (
    <div id="page1" className="page">
      <div className={`containerBox ${resultados ? 'visible' : 'hidden'}`} style={{display: print ? 'block' : 'none'}}>
        <div className="row">
          <div className="col-8 person resultado2" style={{ border: '5px solid #858585', borderRadius: '5px' }}>
            <div className="row">
              <div className="col-2">
                <img src={leftDecoration} className="Lleft" alt="Left decoration" />
              </div>
              <div className="col-8">
                <img src={logoImage} alt="numeranamx" className="logo" />
                <h1 className="numerologia">Numerology | Numerología</h1>
              </div>
              <div className="col-2">
                <img src={rightDecoration} className="Lright" alt="Right decoration" />
              </div>
            </div>
            
            <h2 className="name bold">{nombre}</h2>
            <h2 className="bold footerbox">{birthdateShow}</h2>
            
            <div className="row" style={{ marginBottom: '1rem' }}>
              <div className="col-3"></div>
              <div className="col-3">
                <button type="button" onClick={reload} className="btn btn-primary btn-lg btn-block send">
                  <i className="bi bi-arrow-clockwise" style={{ zoom: 2, lineHeight: 1 }}></i>
                </button>
              </div>
              <div className="col-3">
                <button type="button" onClick={downloadPdf} className="btn btn-primary btn-lg btn-block send">
                  <i className="bi bi-printer-fill" style={{ zoom: 2, lineHeight: 1 }}></i>
                </button>
              </div>
              <div className="col-3" style={{ display: getScreenWidth ? 'block' : 'none' }}>
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-3"></div>
                  <div className="col-6"><h2 className="website www" style={{ fontSize: '11px', right: '30px' }}>www.numerana.com</h2></div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-2"></div>
                  <div className="col-8"><h2 className="website ana" style={{ fontSize: '11px' }}>By: Ana Dorotea</h2></div>
                </div>
              </div>
            </div>
            
            <div className="row" style={{ display: !getScreenWidth ? 'flex' : 'none' }}>
              <div className="col-3"></div>
              <div className="col-5">
                <h2 className="website www" style={{ fontSize: '11px', right: '30px' }}>www.numerana.com</h2><br />
              </div>
              <div className="col-4">
                <h2 className="website ana" style={{ fontSize: '11px' }}>By: Ana Dorotea</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display the calculation results with SVG visualizations */}
      <div className="container" style={{ display: resultados ? 'block' : 'none' }}>
        <div className="row">
          <div className="col-8">
            <div className="A">
              {rpinaculo.length > 0 && <PinaculoSvg pinaculo={rpinaculo[0]} />}
            </div>
          </div>
          <div className="col-4">
            <div className="rside">
              <div className="centerVertHoriz">
                <p><span style={{ fontWeight: '800', fontSize: '2rem' }}>{year}</span></p>
                {pinYear.length > 0 && <YearSvg year={year} data={pinYear[0]} isCurrentYear={true} />}
              </div>
              <div className="selected centerVertHoriz">
                <p><span style={{ fontWeight: '800', fontSize: '2rem' }}>{nxYear}</span></p>
                {pinYear.length > 0 && <YearSvg year={nxYear} data={pinYear[0]} isCurrentYear={false} />}
              </div>
            </div>
          </div>
        </div>
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
      {renderLoading()}
      
      {!resultados && renderForm()}
      
      {resultados && renderResults()}
    </main>
  );
};

export default SingleComponent; 