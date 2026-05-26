import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import calculosUtils from '../utils/calculosUtils';
import './SingleComponent.css'; // Assuming shared CSS or adjust path
import { useTranslation } from '../utils/i18n/LanguageContext'; // Import the hook

// Import images
import heroNumerology from '../assets/img/hero-numerology.png';
import titleHead from '../assets/img/title-head.png';
import caracol from '../assets/img/caracol.png';

// Import modular components
import NumerologyInputFormComponent from '../components/common/NumerologyInputFormComponent';
import ResultsHeaderComponent from '../components/common/ResultsHeaderComponent';
import PinaculoChartComponent from '../components/common/PinaculoChartComponent';
import LoadingComponent from '../components/common/LoadingComponent';

const SingleBasicComponent = () => {
  const { t } = useTranslation(); // Get the translation function

  // State variables
  const [nombre, setNombre] = useState(''); // Start empty
  const [birthdate, setBirthdate] = useState(''); // Start empty
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
    // Note: This calculation might need adjustment based on how calculosUtils handles months
    calculosUtils.getTodaysMonth().then(currentMonth => {
        if (currentMonth === 1) { // Assuming Quarter 1
            setMonthsVisible({ CYQ1: true, CYQ2: true, CYQ3: true, NYQ: false });
        } else if (currentMonth === 2) { // Assuming Quarter 2
            setMonthsVisible({ CYQ1: true, CYQ2: true, CYQ3: true, NYQ: false }); // Example logic, adjust as needed
        } else if (currentMonth === 3) { // Assuming Quarter 3
            setMonthsVisible({ CYQ1: false, CYQ2: false, CYQ3: true, NYQ: true }); // Example logic, adjust as needed
        } else { // Default or Quarter 4
             setMonthsVisible({ CYQ1: false, CYQ2: false, CYQ3: true, NYQ: true }); // Example fallback
        }
    }).catch(err => {
        console.error("Error getting current month:", err);
         // Set a default visibility state on error
         setMonthsVisible({ CYQ1: false, CYQ2: false, CYQ3: true, NYQ: true });
    });


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Loading animation function
  const theLoading = (loadingTime = 1500) => { // Reduced default time
    return new Promise((resolve) => {
      if (loading) {
        setTimeout(() => {
          setLoading(false);
          return resolve(true);
        }, loadingTime);
      } else {
        setLoading(true); // Enable loading if it was off
        // If turning loading on, maybe resolve immediately or after a short delay
        setTimeout(() => {
             return resolve(true);
        }, 100); // Short delay example
      }
    });
  };

  // Form submission
  const handleSubmit = () => {
    if (nombre.length <= 1 || !birthdate) {
       // Use translated alert or a more robust notification system
      alert(t('singleBasic.validation.emptyFields'));
      return;
    }

    const fixDate = birthdate.split('/');
    if (fixDate.length < 3 || fixDate[0].length === 0 || fixDate[1].length === 0 || fixDate[2].length < 4) {
      alert(t('singleBasic.validation.invalidLength'));
      return;
    }

    // Validate date parts more strictly
    const day = parseInt(fixDate[0], 10);
    const month = parseInt(fixDate[1], 10);
    const yearInput = parseInt(fixDate[2], 10); // Renamed to avoid conflict

    if (isNaN(day) || isNaN(month) || isNaN(yearInput) ||
        day < 1 || day > 31 || month < 1 || month > 12 || yearInput < 1000 || yearInput > 9999) {
       alert(t('singleBasic.validation.invalidFormat'));
      return;
    }

     // Moment.js validation
     const dateMoment = moment(birthdate, 'DD/MM/YYYY', true); // Use strict parsing
     if (!dateMoment.isValid()) {
       alert(t('singleBasic.validation.invalidDateMoment'));
       return;
     }

    // Ensure the date parts have proper leading zeros if needed for display or calculation consistency
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDate = `${formattedDay}/${formattedMonth}/${yearInput}`; // Use yearInput here

    setLoading(true);
    setIsVisible(false);

    // Process the date
    setBirthdateShow(formattedDate); // Show the consistently formatted date

    // Calculate results
    try {
      console.log("Calculating with date:", formattedDate);
      const pinaculo = calculosUtils.GetFirstLine(formattedDate);
      console.log("Pinaculo result:", pinaculo);
      // Add validation for pinaculo structure if needed
      if (!pinaculo || pinaculo.length === 0 || typeof pinaculo[0] !== 'object') {
           throw new Error("Invalid Pinaculo result structure.");
      }
      setRpinaculo(pinaculo);

      const yearData = calculosUtils.GetYear(birthdate); // Pass original valid input 'birthdate' to GetYear if it expects MM/DD/YYYY
      console.log("Year data result:", yearData);
      // Add validation for yearData structure if needed
       if (!yearData || typeof yearData !== 'object' || Object.keys(yearData).length === 0) {
           throw new Error("Invalid Year data result structure.");
       }
      setPinYear([yearData]); // Ensure it's always an array

      setResultados(true);

      // Scroll to results after rendering
      setTimeout(() => {
        if (myScrollContainerRef.current) {
          myScrollContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Error calculating results:', error);
      alert(`${t('singleBasic.calculationError')}: ${error.message || t('singleBasic.tryAgain')}`);
      setLoading(false);
      setIsVisible(true); // Show form again on error
      setResultados(false); // Hide potentially incomplete results
      return;
    } finally {
       // Ensure loading is turned off even if scrolling fails
       setLoading(false);
    }
  };


  // Handle birthdate input with mask
  const handleBirthdateChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits

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

  // Reload function
  const reload = () => {
    setIsVisible(true);
    setResultados(false);
    setNombre('');
    setBirthdate('');
    setBirthdateShow('');
    setRpinaculo([]);
    setPinYear([]);
    // Reset mobile selection if needed
    setMobilMesSelect({ year: 0, Month: 0 });
    setListMobileM([]);
  };

 // Print function with PDF generation
 const downloadPdf = () => {
    // Temporarily set 'print' state for header visibility during PDF generation
    setPrint(true);

    // Ensure content is fully rendered before generating PDF
    setTimeout(() => {
        if (typeof window !== 'undefined' && window.html2pdf && contentRef.current) {
            const content = contentRef.current;
            const clonedContent = content.cloneNode(true); // Clone the node

            // --- Style adjustments specifically for PDF ---
            // Find elements to hide in the clone
            const buttonsToHide = clonedContent.querySelectorAll('.action-buttons, .btn, button'); 
            buttonsToHide.forEach(btn => btn.style.display = 'none');

            // Apply print-specific styles to the clone
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                .container { 
                    max-width: 100% !important;
                    padding: 10px !important;
                    margin: 0 !important;
                }
                .content {
                    margin-top: 0.5rem !important;
                    padding: 0 10px !important;
                    zoom: 1 !important;
                }
                .number-description {
                    page-break-inside: avoid;
                }
                .section-divider {
                    margin: 20px 0;
                    border-top: 1px solid #ccc;
                }
            `;
            clonedContent.appendChild(styleElement);

            const opt = {
                margin: [10, 10, 10, 10], // Slightly increased margins
                filename: `Numerology_${nombre || 'Calculation'}_${birthdateShow.replace(/\//g, '-')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 }, // Higher quality
                html2canvas: {
                    scale: 2, 
                    useCORS: true,
                    logging: false,
                    letterRendering: true // Improve text rendering
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait',
                    compress: true // Better compression
                }
            };

            window.html2pdf().set(opt).from(clonedContent).save().then(() => {
                setPrint(false);
                console.log("PDF generated");
            }).catch(err => {
                console.error("Error generating PDF:", err);
                setPrint(false);
                alert(t('singleBasic.pdfError'));
            });

        } else {
            alert(t('singleBasic.pdfLibraryError'));
            setPrint(false);
        }
    }, 800); // Increased delay to ensure complete rendering
};

 // Handle mobile year selection
 const handleYearSelect = (selectedYear) => {
    setSmallLoading(true); // Show loading indicator
    setMobilMesSelect({ year: selectedYear, Month: 0 }); // Reset month when year changes

    // Simulate fetching or processing month list for the selected year
    // Replace with actual logic if needed
    setTimeout(() => {
        const monthsForYear = [
           { month: 1, name: t('months.jan') }, { month: 2, name: t('months.feb') }, { month: 3, name: t('months.mar') },
           { month: 4, name: t('months.apr') }, { month: 5, name: t('months.may') }, { month: 6, name: t('months.jun') },
           { month: 7, name: t('months.jul') }, { month: 8, name: t('months.aug') }, { month: 9, name: t('months.sep') },
           { month: 10, name: t('months.oct') }, { month: 11, name: t('months.nov') }, { month: 12, name: t('months.dec') }
         ];
         // Add year to each month object
        const monthsWithYear = monthsForYear.map(m => ({ ...m, year: selectedYear }));
         setListMobileM([{ month: 0, year: selectedYear, name: t('singleBasic.selectMonth')}, ...monthsWithYear]); // Add "Select Month" option
        setSmallLoading(false);
    }, 300); // Simulating delay
};


  // Helper to generate description keys dynamically
  const getDescriptionKey = (num, type) => `singleBasic.numberDescriptions.num${num}_${type}`;

  // Array of numbers for easy looping in descriptions
  const descriptionNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];


  return (
    <main className="main">
      {/* Ensure contentRef wraps the entire content intended for PDF */}
      <div ref={contentRef} className="content">
        <LoadingComponent loading={loading} />

        {/* Only render input form if not showing results */}
        {!resultados && (
          <div className={`singleBasic-form-wrapper ${isVisible ? 'visible' : 'hidden'}`} style={{display: !resultados ? 'block' : 'none'}}>
            {/* Hero Section with Title and Form */}
            <div className="singleBasic-hero-container">
              {/* Left Side - Title Image and Form */}
              <div className="singleBasic-left-column">
                {/* Title Head Image (replaces text - already contains heading text) */}
                <div className="singleBasic-title-section">
                  <img src={titleHead} alt="title" className="singleBasic-title-img" />
                </div>

                {/* Form Fields */}
                <div className="singleBasic-form-content">
                  {/* Name Field */}
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

                  {/* Birthdate Field */}
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

                  {/* Email Field */}
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

                  {/* Submit Button */}
                  <button 
                    onClick={handleSubmit}
                    className="singleBasic-submit-btn"
                  >
                    <img src={caracol} alt="caracol" className="singleBasic-btn-icon" />
                    {t('singleBasic.submitButton')}
                  </button>
                </div>
              </div>

              {/* Right Side - Hero Image */}
              <div className="singleBasic-right-column">
                <img src={heroNumerology} alt="numerology" className="singleBasic-hero-img" />
              </div>
            </div>
          </div>
        )}


        {/* Results Section */}
        {resultados && (
           <div id="page1" className="page">
              {/* Pass print state to ResultsHeaderComponent */}
             <ResultsHeaderComponent
               resultados={resultados}
               nombre={nombre}
               birthdateShow={birthdateShow}
               reload={reload}
               downloadPdf={downloadPdf} // Keep download function here if button is inside header
               getScreenWidth={getScreenWidth}
               print={print} // Pass print state
               t={t} // Pass t function
             />

             <div className="container results-container" ref={myScrollContainerRef}> {/* Added class and ref */}
               <div className="row">
                 {/* Pinaculo Chart */}
                 <div className="col-12 col-md-8"> {/* Adjust columns for better layout */}
                   <PinaculoChartComponent pinaculo={rpinaculo.length > 0 ? rpinaculo[0] : null} />
                 </div>
               </div>



                {/* Number Descriptions Section */}
               <div className="section-divider"></div>
               <h3 className="section-title">{t('singleBasic.descriptionsTitle')}</h3>
               <div className="numerology-descriptions">
                 {descriptionNumbers.map(num => (
                   <div key={num} className="number-description">
                     <div className="description-half">
                       <h2>{t(getDescriptionKey(num, 'pos_title'))}</h2>
                       <p>{t(getDescriptionKey(num, 'pos_desc'))}</p>
                     </div>
                     <div className="description-half">
                       <h2>{t(getDescriptionKey(num, 'neg_title'))}</h2>
                       <p>{t(getDescriptionKey(num, 'neg_desc'))}</p>
                     </div>
                   </div>
                 ))}
               </div>


                {/* Action Buttons Section - Placed after all content */}
               <div className="action-buttons">
                 <button className="download-button" onClick={downloadPdf}>
                   {t('singleBasic.downloadButton')}
                 </button>
                 <button className="generate-button" onClick={reload}>
                   {t('singleBasic.reloadButton')}
                 </button>
               </div>

             </div> {/* End of .container .results-container */}
           </div> // End of #page1
        )}


      </div> {/* End of .content */}
    </main>
  );
};

export default SingleBasicComponent;