import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import calculosUtils from '../../utils/calculosUtils';
import './TeamComponent.css';
import { useTranslation } from '../../utils/i18n/LanguageContext';
// import PinaculoChartComponent from '../common/PinaculoChartComponent';
// import ResultsHeaderComponent from '../common/ResultsHeaderComponent';
import CaptchaComponent from '../common/CaptchaComponent';

// Import images directly
// import leftDecoration from '../../assets/img/Lleft.png';
// import rightDecoration from '../../assets/img/Lright.png';
// import logoImage from '../../assets/img/logonumerana80.png';
import teamHeaderImage from '../../assets/img/team-header.png';
import teamImage from '../../assets/img/team-image.png';
import teamHeaderGroupImage from '../../assets/img/team-header-group.png';
import teamNumerologyCalcHeader from '../../assets/img/team-numerology-calculation.png';
// import annualCalcImg from '../../assets/img/Annual-calculation.png';
// import monthlyCalcImg from '../../assets/img/monthly-calculation.png';
// import dailyCalcImg from '../../assets/img/daily-calculatiom-header.png';

const TeamComponent = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  
  // Initialize with 3 team members
  const [teamMembers, setTeamMembers] = useState([
    { id: 0, name: '', birthdate: '' },
    { id: 1, name: '', birthdate: '' },
    { id: 2, name: '', birthdate: '' }
  ]);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [resultados, setResultados] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  
  // Calculation results
  const [sinastraE, setSinastraE] = useState([]);
  const [teamCalculo, setTeamCalculo] = useState({
    FA: 0,
    al: 18,
    FB: 0,
    bl: 18,
    FC: 0,
    cl: 18,
    FD: 0,
    dl: 18
  });
  
  // Refs
  const contentRef = useRef(null);
  const captchaRef = useRef(null);
  
  useEffect(() => {
    // Initial loading
    theLoading(1500).then(() => {
      setIsVisible(true);
    });
  }, []);
  
  // Loading animation function
  const theLoading = (loadingTime = 3500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        return resolve(true);
      }, loadingTime);
    });
  };
  
  // Add team member
  const addTeamMember = () => {
    const currentLength = teamMembers.length;
    setTeamMembers([
      ...teamMembers, 
      { id: currentLength, name: '', birthdate: '' }
    ]);
  };
  
  // Remove team member by ID
  const removeTeamMember = (memberId) => {
    if (teamMembers.length <= 3) {
      return;
    }
    
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
  };
  
  // Handle birthdate input with automatic formatting (DD/MM/YYYY)
  const handleBirthdateChange = (e, memberId) => {
    let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
    
    // Format with slashes
    if (value.length > 0) {
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 4) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      } else {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
      }
    }
    
    // Update the specific member's birthdate
    const updatedMembers = teamMembers.map(member => 
      member.id === memberId ? { ...member, birthdate: value } : member
    );
    setTeamMembers(updatedMembers);
  };
  
  // Determine font size based on digit length
  const determineLetterSize = (val) => {
    if (!val) return 18;
    
    const length = val.toString().length;
    return length > 1 ? 8 : 18;
  };
  
  // PDF download function
  const downloadPdf = () => {
    if (typeof window !== 'undefined' && window.html2pdf && contentRef.current) {
      const content = contentRef.current;
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'TeamNumerologyCalculation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      window.html2pdf().set(opt).from(content).save();
    } else {
      alert('PDF generation is not available. Please check if the html2pdf library is loaded.');
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Step 1: Validate Captcha FIRST
    if (captchaRef.current) {
      const userCaptchaInput = captchaRef.current.getUserInput();
      if (!captchaRef.current.validate(userCaptchaInput)) {
        alert(t('captcha.validationFailed'));
        return;
      }
    }

    // Step 2: Continue with form submission
    setIsVisible(false);
    setLoading(true);
    
    const tempTeam = [];
    
    // Process each team member's data
    for (let i = 0; i < teamMembers.length; i++) {
      const nameInput = document.getElementById(`Name_${i}`);
      const birthdateInput = document.getElementById(`Birthdate_${i}`);
      
      if (!nameInput || !birthdateInput) continue;
      
      const name = nameInput.value;
      const birthdate = birthdateInput.value;
      
      if (name.length > 0 && birthdate.length > 0) {
        // Validate date format
        const dateParts = birthdate.split('/');
        if (dateParts.length !== 3) {
          alert(`Invalid date format for ${name}. Please use DD/MM/YYYY format.`);
          setIsVisible(true);
          setLoading(false);
          return;
        }
        
        try {
          // Calculate numerology values
          const mainLine = calculosUtils.GetFirstLine(birthdate)[0];
          
          tempTeam.push({
            id: i,
            nombre: name,
            fecha: birthdate,
            birthdate: moment(birthdate, 'DD/MM/YYYY').format('MMM Do YYYY').toString(),
            A: mainLine.A,
            al: determineLetterSize(mainLine.A),
            B: mainLine.B,
            bl: determineLetterSize(mainLine.B),
            C: mainLine.C,
            cl: determineLetterSize(mainLine.C),
            D: mainLine.D,
            dl: determineLetterSize(mainLine.D)
          });
        } catch (error) {
          alert(`Calculation error for ${name}: ${error.message}`);
          setIsVisible(true);
          setLoading(false);
          return;
        }
      }
    }
    
    if (tempTeam.length === 0) {
      alert("Please enter at least one team member's data.");
      setIsVisible(true);
      setLoading(false);
      return;
    }
    
    // Calculate team synastry (combined energy)
    const newCalculo = {
      FA: 0,
      al: 18,
      FB: 0,
      bl: 18,
      FC: 0,
      cl: 18,
      FD: 0,
      dl: 18
    };
    
    // Sum each team member's values
    tempTeam.forEach((item) => {
      newCalculo.FA += calculosUtils.cleanint(item.A);
      newCalculo.FB += calculosUtils.cleanint(item.B);
      newCalculo.FC += calculosUtils.cleanint(item.C);
      newCalculo.FD += calculosUtils.cleanint(item.D);
    });
    
    // Reduce to single digits/master numbers
    newCalculo.FA = calculosUtils.breakdown(newCalculo.FA, 0);
    newCalculo.FB = calculosUtils.breakdown(newCalculo.FB, 0);
    newCalculo.FC = calculosUtils.breakdown(newCalculo.FC, 0);
    newCalculo.FD = calculosUtils.breakdown(newCalculo.FD, 0);
    
    // Update font sizes based on digit length
    newCalculo.al = determineLetterSize(newCalculo.FA);
    newCalculo.bl = determineLetterSize(newCalculo.FB);
    newCalculo.cl = determineLetterSize(newCalculo.FC);
    newCalculo.dl = determineLetterSize(newCalculo.FD);
    
    setSinastraE(tempTeam);
    setTeamCalculo(newCalculo);
    
    // Show results after loading
    theLoading(2000).then(() => {
      setResultados(true);
    });
  };
  
  // Reset form
  const reload = () => {
    navigate('/reloadt');
  };
  
  // Render the input form
  const renderForm = () => (
    <div className="team-form-wrapper" style={{ display: !resultados && isVisible ? 'block' : 'none' }}>
      {/* Main Form Container - 2 Column Layout */}
      <div className="team-form-container">
        {/* Left Column - Form */}
        <div className="team-form-left">
          {/* Team Header Image */}
          <img src={teamHeaderImage} alt="Team Header" className="team-header-img" />
          
          {/* Team Members Inputs */}
          <div className="team-members-section">
            {teamMembers.map((member, index) => (
              <div className="team-member-row" key={member.id}>
                {/* Delete Button - Left Side */}
                <div className="team-member-delete">
                  <button
                    type="button"
                    onClick={() => removeTeamMember(member.id)}
                    className="team-member-delete-btn"
                    title="Remove this member"
                    disabled={teamMembers.length <= 3}
                  >
                    <i className="bi bi-dash-circle-fill"></i>
                  </button>
                </div>
                
                <div className="team-member-label">
                  {t('team.member').replace('{number}', index + 1)}
                </div>
                <div className="team-input-group">
                  <label htmlFor={`Name_${member.id}`}>{t('team.name_label')}</label>
                  <input 
                    type="text" 
                    autoComplete="off" 
                    className="team-form-control" 
                    placeholder={t('team.placeholder.name')} 
                    id={`Name_${member.id}`}
                  />
                </div>
                <div className="team-input-group">
                  <label htmlFor={`Birthdate_${member.id}`}>{t('team.birthdate_label')}</label>
                  <input
                    className="team-form-control"
                    placeholder={t('team.placeholder.birthdate')}
                    type="text"
                    id={`Birthdate_${member.id}`}
                    value={member.birthdate}
                    onChange={(e) => handleBirthdateChange(e, member.id)}
                    autoComplete="off"
                  />
                </div>
              </div>
            ))}
          </div>

           {/* Add More Members - Clickable Link */}
           <div className="team-add-more-section">
             <button
               type="button"
               onClick={addTeamMember}
               className="team-add-more-btn"
               title="Add another team member"
             >
               <i className="bi bi-person-plus"></i> {t('team.addMoreMembers') || 'Add More Members'}
             </button>
           </div>

           {/* Captcha Component */}
           <div className="team-form-captcha">
             <label>Captcha Verification</label>
             <CaptchaComponent ref={captchaRef} />
           </div>

           {/* Calculate Button */}
           <button 
             type="button" 
             onClick={handleSubmit} 
             className="team-calculate-btn"
           >
             <i className="bi bi-play-btn-fill"></i> {t('team.calculateButton') || 'Calculate Now'}
           </button>
        </div>

        {/* Right Column - Team Image */}
        <div className="team-form-right">
          <img src={teamImage} alt="Team" className="team-img" />
        </div>
      </div>
    </div>
  );
    const uid = React.useId();
  
  // Render the results
  const renderResults = () => (
    
    <div>
      {/* Back Button */}
      <button 
        className="singleBasic-back-btn"
        onClick={() => navigate('/homenumerana')}
        aria-label="Go back"
        title="New Calculation"
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>

      {/* 2-Column Results Header Layout */}
      {/* <div className="results-header-wrapper">
        <div className="results-header-left">
          <ResultsHeaderComponent
            resultados={resultados}
            nombre={t('team.team_synergy_title') || 'Team Synergy'}
            birthdateShow={`${sinastraE.length} ${t('team.members') || 'Members'}`}
            reload={() => navigate('/homenumerana')}
            downloadPdf={downloadPdf}
            getScreenWidth={true}
            print={true}
            t={t}
          />
        </div>
        <div className="results-header-right">
          <PinaculoChartComponent 
            pinaculo={{
              A: teamCalculo.FA,
              B: teamCalculo.FB,
              C: teamCalculo.FC,
              D: teamCalculo.FD,
              top: calculosUtils.breakdown(teamCalculo.FA + teamCalculo.FB + teamCalculo.FC + teamCalculo.FD, 0)
            }} 
          />
          <p className="pinaculo-caption">{t('singleBasic.seeWhatYourNumbersReveal') || 'See what your numbers reveal →'}</p>
        </div>
      </div> */}
      
      <div className="results" style={{ marginTop: '2rem', display: resultados ? 'block' : 'none' }}>
        {/* Team Synergy Section - 2 Column Layout */}
        <div className="team-synergy-container">
          {/* Left Column: Header Image & Description */}
          <div className="team-synergy-left">
            {/* Header Image - No Text Title */}
            <img src={teamHeaderGroupImage} alt="Team Synergy" className="team-synergy-header-img" />
            
            {/* Description Text */}
            <div className="team-synergy-description">
              <p>{t('team.team_synastry_description') || 'The Team Synergy result combines the numerical patterns of each member into a shared calculation. This provides a collective numerical reference that can be explored through Numerology studies and advanced interpretation.'}</p>
              <p>{t('team.team_synastry_description_2') || 'This initial calculation is just the starting point. This report includes calculations for each person, helping you explore how the numbers interact across different cycles and time periods.'}</p>
            </div>
            
            {/* Buttons */}
            <div className="team-synergy-buttons">
              <button 
                type="button" 
                onClick={downloadPdf}
                className="team-synergy-btn team-synergy-btn-download"
              >
                <i className="bi bi-printer-fill"></i> {t('team.download_pdf')}
              </button>
              <button 
                type="button" 
                className="team-synergy-btn team-synergy-btn-learn-more"
              >
                {t('team.learn_more')} <i className="bi bi-chevron-down"></i>
              </button>
            </div>
          </div>
          
          {/* Right Column: Pinaculo Chart */}
          <div className="team-synergy-right">
       
            <svg
   version="1.1"
   style={{ display: 'block' }}
   viewBox="0 0 1276.6465 294.03772"
   width="319.16162"
   height="73.50943"
   preserveAspectRatio="none"
   id="svg334"
   xmlns="http://www.w3.org/2000/svg"
   xmlnsSvg="http://www.w3.org/2000/svg">
  <defs
     id="defs78">
    <rect
       x="-44.924969"
       y="17.503235"
       width="516.92883"
       height="233.37646"
       id="rect335" />
    <linearGradient
       id={`${uid}-Gradient1`}
       gradientUnits="userSpaceOnUse"
       x1="1035.05"
       y1="512.91699"
       x2="1030.95"
       y2="545.08301">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(101,36,17)"
         id="stop1" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(143,109,44)"
         id="stop2" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient2`}
       gradientUnits="userSpaceOnUse"
       x1="832.17902"
       y1="518.02399"
       x2="810.85498"
       y2="495.508">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(93,54,5)"
         id="stop3" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(127,83,33)"
         id="stop4" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient3`}
       gradientUnits="userSpaceOnUse"
       x1="757.28497"
       y1="628.539"
       x2="805.04901"
       y2="625.56">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(75,34,0)"
         id="stop5" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(105,64,14)"
         id="stop6" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient4`}
       gradientUnits="userSpaceOnUse"
       x1="765.91498"
       y1="617.66998"
       x2="1018.72"
       y2="601.52502">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(255,235,122)"
         id="stop7" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(254,251,190)"
         id="stop8" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient5`}
       gradientUnits="userSpaceOnUse"
       x1="935.89001"
       y1="654.53101"
       x2="985.88098"
       y2="743.19501">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(39,8,0)"
         id="stop9" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(97,57,7)"
         id="stop10" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient6`}
       gradientUnits="userSpaceOnUse"
       x1="865.46899"
       y1="715.03198"
       x2="954.79602"
       y2="501.33301">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(239,219,158)"
         id="stop11" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,237)"
         id="stop12" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient7`}
       gradientUnits="userSpaceOnUse"
       x1="1173.8199"
       y1="761.25098"
       x2="1148.16"
       y2="737.461">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(72,36,0)"
         id="stop13" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(120,80,25)"
         id="stop14" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient8`}
       gradientUnits="userSpaceOnUse"
       x1="1179.02"
       y1="655.94098"
       x2="1163.76"
       y2="658.90802">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(179,117,36)"
         id="stop15" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(199,148,58)"
         id="stop16" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient9`}
       gradientUnits="userSpaceOnUse"
       x1="1142.54"
       y1="546.30499"
       x2="1121.42"
       y2="550.50403">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(193,127,48)"
         id="stop17" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(201,151,54)"
         id="stop18" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient10`}
       gradientUnits="userSpaceOnUse"
       x1="1091.33"
       y1="403.258"
       x2="1071.67"
       y2="413.742">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(190,124,41)"
         id="stop19" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(196,148,54)"
         id="stop20" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient11`}
       gradientUnits="userSpaceOnUse"
       x1="685.41302"
       y1="542.23901"
       x2="694.59399"
       y2="546.74597">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(43,14,0)"
         id="stop21" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(66,27,1)"
         id="stop22" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient12`}
       gradientUnits="userSpaceOnUse"
       x1="1065.46"
       y1="324.11401"
       x2="1056.91"
       y2="304.95401">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(59,23,0)"
         id="stop23" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(97,60,2)"
         id="stop24" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient13`}
       gradientUnits="userSpaceOnUse"
       x1="863.10199"
       y1="341.65399"
       x2="958.13"
       y2="95.122803">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(237,217,153)"
         id="stop25" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,238)"
         id="stop26" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient14`}
       gradientUnits="userSpaceOnUse"
       x1="824.53198"
       y1="351.62701"
       x2="995.03497"
       y2="86.379601">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(255,235,116)"
         id="stop27" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,248,179)"
         id="stop28" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient15`}
       gradientUnits="userSpaceOnUse"
       x1="1527.61"
       y1="1296.99"
       x2="1791.16"
       y2="1145.09">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(113,66,12)"
         id="stop29" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(153,100,39)"
         id="stop30" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient16`}
       gradientUnits="userSpaceOnUse"
       x1="1545.51"
       y1="1300.33"
       x2="1696.24"
       y2="1037.1">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(233,213,158)"
         id="stop31" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,220)"
         id="stop32" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient17`}
       gradientUnits="userSpaceOnUse"
       x1="867.73499"
       y1="1731.6899"
       x2="953.19299"
       y2="1492.71">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(233,211,149)"
         id="stop33" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,236)"
         id="stop34" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient18`}
       gradientUnits="userSpaceOnUse"
       x1="1004.33"
       y1="1476.37"
       x2="998.92902"
       y2="1498.6899">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(95,39,5)"
         id="stop35" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(144,99,36)"
         id="stop36" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient19`}
       gradientUnits="userSpaceOnUse"
       x1="953.48297"
       y1="1665.29"
       x2="1031.46"
       y2="1729.95">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(14,0,0)"
         id="stop37" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(99,55,5)"
         id="stop38" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient20`}
       gradientUnits="userSpaceOnUse"
       x1="910.729"
       y1="1384.96"
       x2="933.62701"
       y2="1388.39">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(136,100,20)"
         id="stop39" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(153,117,65)"
         id="stop40" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient21`}
       gradientUnits="userSpaceOnUse"
       x1="1207.87"
       y1="949.966"
       x2="1215.76"
       y2="933.95398">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(0,0,0)"
         id="stop41" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(28,3,1)"
         id="stop42" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient22`}
       gradientUnits="userSpaceOnUse"
       x1="1215.9399"
       y1="923.789"
       x2="1203.34"
       y2="942.06">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(122,77,24)"
         id="stop43" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(149,103,32)"
         id="stop44" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient23`}
       gradientUnits="userSpaceOnUse"
       x1="1235.75"
       y1="919.20099"
       x2="1326.9399"
       y2="710.66101">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(231,209,146)"
         id="stop45" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,238)"
         id="stop46" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient24`}
       gradientUnits="userSpaceOnUse"
       x1="1390.78"
       y1="909.76801"
       x2="1330.3199"
       y2="814.81702">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(255,231,114)"
         id="stop47" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(253,253,209)"
         id="stop48" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient25`}
       gradientUnits="userSpaceOnUse"
       x1="1342.12"
       y1="685.64502"
       x2="1333.37"
       y2="715.79498">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(90,40,9)"
         id="stop49" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(136,94,33)"
         id="stop50" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient26`}
       gradientUnits="userSpaceOnUse"
       x1="1138.83"
       y1="808.71899"
       x2="1376.39"
       y2="819.51801">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(255,235,124)"
         id="stop51" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(253,250,184)"
         id="stop52" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient27`}
       gradientUnits="userSpaceOnUse"
       x1="1221.59"
       y1="918.47498"
       x2="1340.26"
       y2="710.026">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(85,50,14)"
         id="stop53" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(134,68,11)"
         id="stop54" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient28`}
       gradientUnits="userSpaceOnUse"
       x1="767.51099"
       y1="1182.8101"
       x2="803.43799"
       y2="1184.36">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(30,9,0)"
         id="stop55" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(124,58,2)"
         id="stop56" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient29`}
       gradientUnits="userSpaceOnUse"
       x1="869.64899"
       y1="1282.02"
       x2="959.40302"
       y2="1031.5">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(237,219,167)"
         id="stop57" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,224)"
         id="stop58" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient30`}
       gradientUnits="userSpaceOnUse"
       x1="796.427"
       y1="1170.95"
       x2="738.40399"
       y2="1163.24">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(10,0,0)"
         id="stop59" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(104,64,13)"
         id="stop60" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient31`}
       gradientUnits="userSpaceOnUse"
       x1="981.69299"
       y1="1268.8199"
       x2="995.12"
       y2="1318.42">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(49,26,1)"
         id="stop61" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(86,39,5)"
         id="stop62" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient32`}
       gradientUnits="userSpaceOnUse"
       x1="844.14801"
       y1="1517"
       x2="806.71802"
       y2="1480.95">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(66,32,0)"
         id="stop63" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(135,91,34)"
         id="stop64" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient33`}
       gradientUnits="userSpaceOnUse"
       x1="518.09003"
       y1="1537.01"
       x2="579.24902"
       y2="1451.11">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(14,11,1)"
         id="stop65" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(85,40,2)"
         id="stop66" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient34`}
       gradientUnits="userSpaceOnUse"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699"
       gradientTransform="translate(46.206181,-376.25033)">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(230,209,154)"
         id="stop67" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,251,213)"
         id="stop68" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient35`}
       gradientUnits="userSpaceOnUse"
       x1="665.62903"
       y1="812.94598"
       x2="690.00897"
       y2="804.48499">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(193,142,63)"
         id="stop69" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(214,182,110)"
         id="stop70" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient36`}
       gradientUnits="userSpaceOnUse"
       x1="344.56"
       y1="966.49902"
       x2="353.91699"
       y2="976.00098">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(53,24,0)"
         id="stop71" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(83,42,3)"
         id="stop72" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient37`}
       gradientUnits="userSpaceOnUse"
       x1="387.42401"
       y1="851.815"
       x2="441.802"
       y2="834.70203">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(84,45,2)"
         id="stop73" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(59,26,5)"
         id="stop74" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient38`}
       gradientUnits="userSpaceOnUse"
       x1="623.89697"
       y1="798.85999"
       x2="413.612"
       y2="833.69397">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(153,74,4)"
         id="stop75" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(88,49,17)"
         id="stop76" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient39`}
       gradientUnits="userSpaceOnUse"
       x1="505.289"
       y1="923.91803"
       x2="563.76801"
       y2="714.37701">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(231,210,150)"
         id="stop77" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(251,242,202)"
         id="stop78" />
    </linearGradient>
    <linearGradient
       id={`${uid}-linearGradient335`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(267.95589,-1032.3518)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
    <linearGradient
       inkscapeCollect="always"
       xlinkHf="#Gradient34"
       id={`${uid}-linearGradient3`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(588.90578,-1028.3518)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
    <linearGradient
       inkscapeCollect="always"
       xlinkHf="#Gradient34"
       id={`${uid}-linearGradient336`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(914.57005,-1026.9135)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
    <linearGradient
       inkscapeCollect="always"
       xlinkHf="#Gradient34"
       id={`${uid}-linearGradient7`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(46.206181,-376.25033)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
    <linearGradient
       inkscapeCollect="always"
       xlinkHf="#Gradient34"
       id={`${uid}-linearGradient386`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(-57.70837,-1033.79)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
  </defs>
  <path
     fill="#c89138"
     d="m 297.22663,67.11 c 0.695,-16.89 -1.037,-20.16 -3.02,-35.92 l 1.547,-0.25 c 12.079,10.12 6.404,80.11 6.733,98.51 l -1.526,1.1 -1.159,-0.66 c -0.395,-2.93 -0.826,-5.34 -1.397,-8.25 -0.54,-18.17 -0.933,-36.35 -1.178,-54.53 z"
     id="path116" />
  <path
     fill="#fbe990"
     d="m 204.06963,1.68 0.547,1.45 1.756,0.7 c 2.276,-0.92 2.625,-1.84 4.148,-3.83 4.619,2.15 9.35,-0.07 15.718,1.35 l -1.414,0.86 c 2.079,2.11 6.724,1.54 10.814,2.59 6.541,0.38 10.862,0.53 17.38,0.22 12.92,1.92 25.203,5.3 33.457,16.32 10.944,14.59 7.114,80.43 7.236,101.54 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53 0.375,37.07 0.091,55.61 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886001,3.41 -126.248401,-6.26 C 18.361029,276.38 9.5749291,257.6 3.5154291,244.03 l -2.2281,-0.66 c -1.13970004,-2.87 -1.14300004,-8.44 -1.12500004,-11.61 0.3502,-61.27 -0.7248,-122.62 0.2768,-183.88 0.094,-5.75 3.27180004,-12.99 5.74730004,-18.09 C 36.934129,-12.56 80.467629,3.97 127.07963,0.96 c 10.779,-0.7 71.885,-0.83 76.99,0.72 z"
     id="path118" />
  <path
     fill="#aa7525"
     d="m 6.1864291,29.79 c 5.1534999,2.18 4.5486999,2.42 4.3926999,8.46 C 8.3929291,50.11 9.1164291,68.89 9.1661291,81.57 l 0.2675,66.47 -0.0171,56.45 c -0.009,10.57 -0.976,29.58 1.2546999,39.31 4.4097,19.24 24.1571,31.72 43.0974,31.44 9.182,1.31 24.577,0.91 34.268,0.9 l 53.627001,-0.1 c 19.374,-0.03 117.419,2.22 130.184,-2.27 l 5.869,4.54 c -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886001,3.41 -126.248401,-6.26 C 18.361029,276.38 9.5749291,257.6 3.5154291,244.03 l -2.2281,-0.66 c -1.13970004,-2.87 -1.14300004,-8.44 -1.12500004,-11.61 0.3502,-61.27 -0.7248,-122.62 0.2768,-183.88 0.094,-5.75 3.27180004,-12.99 5.74730004,-18.09 z"
     id="path119" />
  <path
     fill="#4b2809"
     d="m 10.579129,38.25 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 6.822,-0.9 37.930001,-0.25 46.934001,-0.24 l 103.609,-0.01 c 15.983,-0.04 33.899,1.22 49.512,-2.35 6.167,-1.41 11.37,-4.23 15.936,-8.63 6.193,-5.96 10.801,-14.31 12.897,-22.63 4.895,-19.43 2.046,-89.05 2.315,-113.59 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53 0.375,37.07 0.091,55.61 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c -12.765,4.49 -110.81,2.24 -130.184,2.27 l -53.627001,0.1 c -9.691,0.01 -25.086,0.41 -34.268,-0.9 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2306999,-9.73 -1.2632999,-28.74 -1.2546999,-39.31 l 0.0171,-56.45 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.4129999,-43.32 z"
     id="path120" />
  <path
     fill="#2e1703"
     d="m 10.579129,38.25 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 7.059,2.38 27.193,-0.21 34.227,0.78 15.574001,2.2 111.833001,-3.15 120.096001,0.69 -7.689,0.72 -58.849,-0.11 -60.671,0.95 3.35,1.35 55.6,1.57 60.512,0.86 l 0.475,0.94 c -38.71,2.17 -82.273,-0.42 -121.368001,0.64 -10.218,0.27 -33.583,-1 -42.011,0.05 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2306999,-9.73 -1.2632999,-28.74 -1.2546999,-39.31 l 0.0171,-56.45 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.4129999,-43.32 z"
     id="path121" />
  <path
     fill="#1f0700"
     d="m 294.51663,123.09 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.013,4.67 0.122,9.13 -0.301,13.78 -1.85,3.35 -0.826,54.26 -2.288,64.91 l -0.841,0.23 c 0.358,0.74 -0.261,-40.91 -0.272,-44.4 z"
     id="path122" />
  <path
     fill="#7b7455"
     d="m 298.40463,121.64 c 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.145,-11.34 0.202,-22.68 0.169,-34.03 z"
     id="path123" />
  <path
     fill="#c89138"
     d="m 298.23563,155.67 c 1.43,6.05 3.364,6.59 4.886,14.11 0.345,18.53 0.375,37.07 0.091,55.61 -1.258,0.03 -1.664,-0.19 -2.918,-0.47 l -2.108,-3.97 c -0.589,-16.68 -0.274,-34.72 -0.252,-51.5 0.423,-4.65 0.314,-9.11 0.301,-13.78 z"
     id="path124" />
  <path
     fill="#fbeeb3"
     d="m 286.52763,259.36 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c 6.686,-4.95 10.39,-7.34 14.68,-14.41 z"
     id="path125" />
  <path
     fill="#c89138"
     d="m 298.18663,220.95 2.108,3.97 c 1.254,0.28 1.66,0.5 2.918,0.47 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c 0.442,-6.97 0.841,-13.94 1.199,-20.91 z"
     id="path126" />
  <path
     fill="#fbeeb3"
     d="m 91.022629,12.73 c 30.975001,-0.74 62.994001,-0.2 94.120001,-0.47 20.933,0.91 43.129,-2.04 63.743,1.99 28.329,5.54 29.355,26.83 29.608,49.91 l 0.267,111.27 c -0.014,17.38 0.425,37.24 -1.008,54.62 -1.119,6.1 -4.357,12.34 -8.787,16.64 -13.213,12.82 -36.165,10.26 -53.174,10.26 l -100.354,0.14 c -6.507,0.03 -13.073,0.15 -19.594001,0.07 -28.06,-0.35 -67.061,5.76 -67.3987,-34.64 -0.2817,-33.69 -0.008,-67.22 -0.0409,-100.81 l -0.0244,-47.95 c 0.002,-10.5 -0.442,-23.91 1.0624,-34.18 4.384,-29.93 39.2896,-26.78 61.5806,-26.85 z"
     id="path128" />
  <path
     fill={`url(#${uid}-Gradient34)`}
     d="m 64.318629,16.59 c 29.87,-1.91 67.130001,0.38 97.906001,-0.41 25.199,-0.65 53.663,0.15 78.991,0.54 5.837,0.55 15.663,2.68 20.156,5.97 17.152,12.58 13.058,38.78 13.031,59.32 l -0.101,61.7 c -0.018,22.65 0.048,45.45 0.22,68.09 0.164,21.59 -3.434,39.49 -29.277,41.54 -58.795,2.31 -120.275,0.29 -179.245001,0.24 -13.127,0.23 -30.0849,-9 -30.9249,-23.6 -3.4079,-59.2 -1.4911,-119.7 -1.1554,-179.05 0.1194,-21.12 9.6833,-31.37 30.3993,-34.34 z"
     id="path129"
     style={{fill: `url(#${uid}-linearGradient386)`}} />
  <text
     xmlSpace="preserve"
     style={{fontSize:'170px',textAlign:'center',writingMode:'lr-tb',direction:'ltr',textAnchor:'middle',display:'block',fill:'#f9e584',fillOpacity:'1',strokeWidth:'4'}}
     x="110"
     y="180.10535"
     id="text334-9-8-7-8"
     data-label="C"><tspan
       sodipodiRole="line"
       id="tspan334-4-2-1-6"
       style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'500',fontStretch:'normal',fontSize:'170px',fontFamily:'Rasa',fill:'#24221c',strokeWidth:'4'}}
       x="110"
       y="180.10535">  {teamCalculo.FA}</tspan></text>
  <path
     fill="#c89138"
     d="m 622.89089,68.54825 c 0.695,-16.89 -1.037,-20.16 -3.02,-35.92 l 1.547,-0.25 c 12.079,10.12 6.404,80.11 6.733,98.51 l -1.526,1.1 -1.159,-0.66 c -0.395,-2.93 -0.826,-5.34 -1.397,-8.25 -0.54,-18.17 -0.933,-36.35 -1.178,-54.53 z"
     id="path116-5"
     style={{display:'block'}} />
  <path
     fill="#fbe990"
     d="m 529.73389,3.11825 0.547,1.45 1.756,0.7 c 2.276,-0.92 2.625,-1.84 4.148,-3.83 4.619,2.15 9.35,-0.07 15.718,1.35 l -1.414,0.86 c 2.079,2.11 6.724,1.54 10.814,2.59 6.541,0.38 10.862,0.53 17.38,0.22 12.92,1.92 25.203,5.3 33.457,16.32 10.944,14.59 7.114,80.43 7.236,101.54 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53001 0.375,37.07001 0.091,55.61001 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.4852,-4.04 -25.2713,-22.82 -31.3308,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27001 -0.7248,-122.62001 0.2768,-183.88001 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 30.7477,-42.35 74.2812,-25.82 120.8932,-28.83 10.779,-0.7 71.885,-0.83 76.99,0.72 z"
     id="path118-4"
     style={{display:'block'}} />
  <path
     fill="#aa7525"
     d="m 331.85069,31.22825 c 5.1535,2.18 4.5487,2.42 4.3927,8.46 -2.1862,11.86 -1.4627,30.64 -1.413,43.32 l 0.2675,66.47 -0.0171,56.45001 c -0.009,10.57 -0.976,29.58 1.2547,39.31 4.4097,19.24 24.1571,31.72 43.0974,31.44 9.182,1.31 24.577,0.91 34.268,0.9 l 53.627,-0.1 c 19.374,-0.03 117.419,2.22 130.184,-2.27 l 5.869,4.54 c -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.4852,-4.04 -25.2713,-22.82 -31.3308,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27001 -0.7248,-122.62001 0.2768,-183.88001 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 z"
     id="path119-3"
     style={{display:'block'}} />
  <path
     fill="#4b2809"
     d="m 336.24339,39.68825 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68001 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 6.822,-0.9 37.93,-0.25 46.934,-0.24 l 103.609,-0.01 c 15.983,-0.04 33.899,1.22 49.512,-2.35 6.167,-1.41 11.37,-4.23 15.936,-8.63 6.193,-5.96 10.801,-14.31 12.897,-22.63 4.895,-19.43 2.046,-89.05001 2.315,-113.59001 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53001 0.375,37.07001 0.091,55.61001 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c -12.765,4.49 -110.81,2.24 -130.184,2.27 l -53.627,0.1 c -9.691,0.01 -25.086,0.41 -34.268,-0.9 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.0171,-56.45001 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path120-1"
     style={{display:'block'}} />
  <path
     fill="#2e1703"
     d="m 336.24339,39.68825 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68001 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 7.059,2.38 27.193,-0.21 34.227,0.78 15.574,2.2 111.833,-3.15 120.096,0.69 -7.689,0.72 -58.849,-0.11 -60.671,0.95 3.35,1.35 55.6,1.57 60.512,0.86 l 0.475,0.94 c -38.71,2.17 -82.273,-0.42 -121.368,0.64 -10.218,0.27 -33.583,-1 -42.011,0.05 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.0171,-56.45001 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path121-2"
     style={{display:'block'}} />
  <path
     fill="#1f0700"
     d="m 620.18089,124.52825 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.013,4.67 0.122,9.13 -0.301,13.78 -1.85,3.35 -0.826,54.26001 -2.288,64.91001 l -0.841,0.23 c 0.358,0.74 -0.261,-40.91 -0.272,-44.4 z"
     id="path122-3"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 624.06889,123.07825 c 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.145,-11.34 0.202,-22.68 0.169,-34.03 z"
     id="path123-3"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 623.89989,157.10825 c 1.43,6.05 3.364,6.59 4.886,14.11 0.345,18.53001 0.375,37.07001 0.091,55.61001 -1.258,0.03 -1.664,-0.19 -2.918,-0.47 l -2.108,-3.97 c -0.589,-16.68 -0.274,-34.72 -0.252,-51.50001 0.423,-4.65 0.314,-9.11 0.301,-13.78 z"
     id="path124-4"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 612.19189,260.79826 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c 6.686,-4.95 10.39,-7.34 14.68,-14.41 z"
     id="path125-1"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 623.85089,222.38826 2.108,3.97 c 1.254,0.28 1.66,0.5 2.918,0.47 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c 0.442,-6.97 0.841,-13.94 1.199,-20.91 z"
     id="path126-1"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 416.68689,14.16825 c 30.975,-0.74 62.994,-0.2 94.12,-0.47 20.933,0.91 43.129,-2.04 63.743,1.99 28.329,5.54 29.355,26.83 29.608,49.91 l 0.267,111.27 c -0.014,17.38001 0.425,37.24001 -1.008,54.62001 -1.119,6.1 -4.357,12.34 -8.787,16.64 -13.213,12.82 -36.165,10.26 -53.174,10.26 l -100.354,0.14 c -6.507,0.03 -13.073,0.15 -19.594,0.07 -28.06,-0.35 -67.061,5.76 -67.3987,-34.64 -0.2817,-33.69 -0.008,-67.22001 -0.0409,-100.81001 l -0.0244,-47.95 c 0.002,-10.5 -0.442,-23.91 1.0624,-34.18 4.384,-29.93 39.2896,-26.78 61.5806,-26.85 z"
     id="path128-3"
     style={{display:'block'}} />
  <path
     fill={`url(#${uid}-Gradient34)`}
     d="m 389.98289,18.02825 c 29.87,-1.91 67.13,0.38 97.906,-0.41 25.199,-0.65 53.663,0.15 78.991,0.54 5.837,0.55 15.663,2.68 20.156,5.97 17.152,12.58 13.058,38.78 13.031,59.32 l -0.101,61.7 c -0.018,22.65 0.048,45.45001 0.22,68.09001 0.164,21.59 -3.434,39.49 -29.277,41.54 -58.795,2.31 -120.275,0.29 -179.245,0.24 -13.127,0.23 -30.0849,-9 -30.9249,-23.6 -3.4079,-59.20001 -1.4911,-119.70001 -1.1554,-179.05001 0.1194,-21.12 9.6833,-31.37 30.3993,-34.34 z"
     id="path129-8"
     style={{display:'block',fill:`url(#${uid}-Gradient335)`}} />
  <text
     xmlSpace="preserve"
     style={{fontSize:'170px',textAlign:'center',writingMode:'lr-tb',direction:'ltr',textAnchor:'middle',display:'block',fill:'#f9e584',fillOpacity:'1',strokeWidth:'4'}}
     x="430"
     y="176.10529"
     id="text334-9-8-7-7"
     data-label="B"><tspan
       sodipodiRole="line"
       id="tspan334-4-2-1-4"
       style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'500',fontStretch:'normal',fontSize:'170px',fontFamily:'Rasa',fill:'#24221c',strokeWidth:'4'}}
       x="430"
       y="176.10529">  {teamCalculo.FB}</tspan></text>
  <path
     fill="#c89138"
     d="m 943.84075,72.54825 c 0.695,-16.89 -1.037,-20.16 -3.02,-35.92 l 1.547,-0.25 c 12.079,10.12 6.404,80.11 6.733,98.51 l -1.526,1.1 -1.159,-0.66 c -0.395,-2.93 -0.826,-5.34 -1.397,-8.25 -0.54,-18.17 -0.933,-36.35 -1.178,-54.53 z"
     id="path116-1"
     style={{display:'block'}} />
  <path
     fill="#fbe990"
     d="m 850.68378,7.11825 0.547,1.45 1.756,0.7 c 2.276,-0.92 2.625,-1.84 4.148,-3.83 4.619,2.15 9.35,-0.07 15.718,1.35 l -1.414,0.86 c 2.079,2.11 6.724,1.54 10.814,2.59 6.541,0.38 10.862,0.53 17.37997,0.22 12.92,1.92 25.203,5.3 33.457,16.32 10.944,14.59 7.114,80.43 7.236,101.54 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53001 0.375,37.07001 0.091,55.61001 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 -29.11597,11.42 -83.58597,8.56 -116.62197,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.4852,-4.04 -25.2713,-22.82 -31.3308,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27001 -0.7248,-122.62001 0.2768,-183.88001 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 30.7477,-42.35 74.2812,-25.82 120.8932,-28.83 10.779,-0.7 71.885,-0.83 76.99,0.72 z"
     id="path118-9"
     style={{display:'block'}} />
  <path
     fill="#aa7525"
     d="m 652.80058,35.22825 c 5.1535,2.18 4.5487,2.42 4.3927,8.46 -2.1862,11.86 -1.4627,30.64 -1.413,43.32 l 0.2675,66.47 -0.0171,56.45001 c -0.009,10.57 -0.976,29.58 1.2547,39.31 4.4097,19.24 24.1571,31.72 43.0974,31.44 9.182,1.31 24.577,0.91 34.268,0.9 l 53.627,-0.1 c 19.374,-0.03 117.41897,2.22 130.18397,-2.27 l 5.869,4.54 c -29.11597,11.42 -83.58597,8.56 -116.62197,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.4852,-4.04 -25.2713,-22.82 -31.3308,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27001 -0.7248,-122.62001 0.2768,-183.88001 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 z"
     id="path119-8"
     style={{display:'block'}} />
  <path
     fill="#4b2809"
     d="m 657.19328,43.68825 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68001 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 6.822,-0.9 37.93,-0.25 46.934,-0.24 l 103.609,-0.01 c 15.983,-0.04 33.899,1.22 49.51197,-2.35 6.167,-1.41 11.37,-4.23 15.936,-8.63 6.193,-5.96 10.801,-14.31 12.897,-22.63 4.895,-19.43 2.046,-89.05001 2.315,-113.59001 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53001 0.375,37.07001 0.091,55.61001 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c -12.765,4.49 -110.80997,2.24 -130.18397,2.27 l -53.627,0.1 c -9.691,0.01 -25.086,0.41 -34.268,-0.9 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.0171,-56.45001 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path120-6"
     style={{display:'block'}} />
  <path
     fill="#2e1703"
     d="m 657.19328,43.68825 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68001 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 7.059,2.38 27.193,-0.21 34.227,0.78 15.574,2.2 111.833,-3.15 120.096,0.69 -7.689,0.72 -58.849,-0.11 -60.671,0.95 3.35,1.35 55.6,1.57 60.512,0.86 l 0.475,0.94 c -38.71,2.17 -82.273,-0.42 -121.368,0.64 -10.218,0.27 -33.583,-1 -42.011,0.05 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.0171,-56.45001 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path121-5"
     style={{display:'block'}} />
  <path
     fill="#1f0700"
     d="m 941.13075,128.52825 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.013,4.67 0.122,9.13 -0.301,13.78 -1.85,3.35001 -0.826,54.26001 -2.288,64.91001 l -0.841,0.23 c 0.358,0.74 -0.261,-40.91 -0.272,-44.4 z"
     id="path122-0"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 945.01875,127.07825 c 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.145,-11.34 0.202,-22.68 0.169,-34.03 z"
     id="path123-2"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 944.84975,161.10825 c 1.43,6.05 3.364,6.59 4.886,14.11 0.345,18.53001 0.375,37.07001 0.091,55.61001 -1.258,0.03 -1.664,-0.19 -2.918,-0.47 l -2.108,-3.97 c -0.589,-16.68 -0.274,-34.72 -0.252,-51.50001 0.423,-4.65 0.314,-9.11 0.301,-13.78 z"
     id="path124-8"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 933.14175,264.79826 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c 6.686,-4.95 10.39,-7.34 14.68,-14.41 z"
     id="path125-6"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 944.80075,226.38826 2.108,3.97 c 1.254,0.28 1.66,0.5 2.918,0.47 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c 0.442,-6.97 0.841,-13.94 1.199,-20.91 z"
     id="path126-0"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 737.63678,18.16825 c 30.975,-0.74 62.994,-0.2 94.12,-0.47 20.933,0.91 43.129,-2.04 63.743,1.99 28.32897,5.54 29.35497,26.83 29.60797,49.91 l 0.267,111.27001 c -0.014,17.38 0.425,37.24 -1.008,54.62 -1.119,6.1 -4.357,12.34 -8.787,16.64 -13.213,12.82 -36.16497,10.26 -53.17397,10.26 l -100.354,0.14 c -6.507,0.03 -13.073,0.15 -19.594,0.07 -28.06,-0.35 -67.061,5.76 -67.3987,-34.64 -0.2817,-33.69 -0.008,-67.22001 -0.0409,-100.81001 l -0.0244,-47.95 c 0.002,-10.5 -0.442,-23.91 1.0624,-34.18 4.384,-29.93 39.2896,-26.78 61.5806,-26.85 z"
     id="path128-2"
     style={{display:'block'}} />
  <path
     fill={`url(#${uid}-Gradient34)`}
     d="m 710.93278,22.02825 c 29.87,-1.91 67.13,0.38 97.906,-0.41 25.199,-0.65 53.663,0.15 78.991,0.54 5.837,0.55 15.66297,2.68 20.15597,5.97 17.152,12.58 13.058,38.78 13.031,59.32 l -0.101,61.7 c -0.018,22.65 0.048,45.45001 0.22,68.09001 0.164,21.59 -3.434,39.49 -29.27697,41.54 -58.795,2.31 -120.275,0.29 -179.245,0.24 -13.127,0.23 -30.0849,-9 -30.9249,-23.6 -3.4079,-59.20001 -1.4911,-119.70001 -1.1554,-179.05001 0.1194,-21.12 9.6833,-31.37 30.3993,-34.34 z"
     id="path129-4"
     style={{display:'block',fill:`url(#${uid}-linearGradient3)`}} />
  <text
     xmlSpace="preserve"
     style={{fontSize:'170px',textAlign:'center',writingMode:'lr-tb',direction:'ltr',textAnchor:'middle',display:'block',fill:'#f9e584',fillOpacity:'1',strokeWidth:'4'}}
     x="760"
     y="180.10535"
     id="text334-9-8-7-8"
     data-label="C"><tspan
       sodipodiRole="line"
       id="tspan334-4-2-1-6"
       style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'500',fontStretch:'normal',fontSize:'170px',fontFamily:'Rasa',fill:'#24221c',strokeWidth:'4'}}
       x="760"
       y="180.10535">  {teamCalculo.FC}</tspan></text>
  <path
     fill="#c89138"
     d="m 1269.505,73.9865 c 0.695,-16.89 -1.037,-20.16 -3.02,-35.92 l 1.547,-0.25 c 12.079,10.12 6.404,80.11 6.733,98.51 l -1.526,1.1 -1.159,-0.66 c -0.395,-2.93 -0.826,-5.34 -1.397,-8.25 -0.54,-18.17 -0.933,-36.35 -1.178,-54.53 z"
     id="path116-5-5"
     style={{display:'block'}} />
  <path
     fill="#fbe990"
     d="m 1176.348,8.5565 0.547,1.45 1.756,0.7 c 2.276,-0.92 2.625,-1.84 4.148,-3.83 4.619,2.15 9.35,-0.07 15.718,1.35 l -1.414,0.86 c 2.079,2.11 6.724,1.54 10.814,2.59 6.541,0.38 10.862,0.53 17.38,0.22 12.92,1.92 25.203,5.3 33.457,16.32 10.944,14.59 7.114,80.43 7.236,101.54 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53006 0.375,37.07006 0.091,55.61006 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.48515,-4.04 -25.27125,-22.82 -31.33075,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27006 -0.7248,-122.62006 0.2768,-183.88006 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 30.74765,-42.35 74.28115,-25.82 120.89315,-28.83 10.779,-0.7 71.885,-0.83 76.99,0.72 z"
     id="path118-4-0"
     style={{display:'block'}} />
  <path
     fill="#aa7525"
     d="m 978.46485,36.6665 c 5.1535,2.18 4.5487,2.42 4.3927,8.46 -2.1862,11.86 -1.4627,30.64 -1.413,43.32 l 0.2675,66.47 -0.017,56.45006 c -0.01,10.57 -0.976,29.58 1.2547,39.31 4.4097,19.24 24.15705,31.72 43.09735,31.44 9.182,1.31 24.577,0.91 34.268,0.9 l 53.627,-0.1 c 19.374,-0.03 117.419,2.22 130.184,-2.27 l 5.869,4.54 c -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.48515,-4.04 -25.27125,-22.82 -31.33075,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27006 -0.7248,-122.62006 0.2768,-183.88006 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 z"
     id="path119-3-9"
     style={{display:'block'}} />
  <path
     fill="#4b2809"
     d="m 982.85755,45.1265 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.077,64.46 0.091,51.68006 c 0.072,44.17 -3.1242,67.3 48.39955,72.38 6.822,-0.9 37.93,-0.25 46.934,-0.24 l 103.609,-0.01 c 15.983,-0.04 33.899,1.22 49.512,-2.35 6.167,-1.41 11.37,-4.23 15.936,-8.63 6.193,-5.96 10.801,-14.31 12.897,-22.63 4.895,-19.43 2.046,-89.05006 2.315,-113.59006 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.52996 0.375,37.07006 0.091,55.61006 0.083,6.54 0.659,9.6599 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.6399 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.1501 l -4.374,2.5699 c -4.517,-0.4099 -8.683,3.6401 -13.755,6.23 l -5.869,-4.5399 c -12.765,4.49 -110.81,2.24 -130.184,2.2699 l -53.627,0.1001 c -9.691,0.01 -25.086,0.4099 -34.268,-0.9 -18.9403,0.28 -38.68765,-12.2001 -43.09735,-31.4401 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.3099 l 0.017,-56.45006 -0.2675,-66.47 c -0.05,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path120-1-0"
     style={{display:'block'}} />
  <path
     fill="#2e1703"
     d="m 982.85755,45.1265 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.077,64.46 0.091,51.68006 c 0.072,44.17 -3.1242,67.3 48.39955,72.38 7.059,2.38 27.193,-0.21 34.227,0.78 15.574,2.2 111.833,-3.15 120.096,0.69 -7.689,0.72 -58.849,-0.11 -60.671,0.95 3.35,1.35 55.6,1.57 60.512,0.86 l 0.475,0.94 c -38.71,2.17 -82.273,-0.42 -121.368,0.64 -10.218,0.27 -33.583,-1 -42.011,0.05 -18.9403,0.28 -38.68765,-12.2 -43.09735,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.017,-56.45006 -0.2675,-66.47 c -0.05,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path121-2-0"
     style={{display:'block'}} />
  <path
     fill="#1f0700"
     d="m 1266.795,129.9665 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.013,4.67 0.122,9.13 -0.301,13.78 -1.85,3.34996 -0.826,54.25996 -2.288,64.90996 l -0.841,0.23 c 0.358,0.74 -0.261,-40.91 -0.272,-44.4 z"
     id="path122-3-6"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 1270.683,128.5165 c 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.145,-11.34 0.202,-22.68 0.169,-34.03 z"
     id="path123-3-1"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 1270.514,162.5465 c 1.43,6.05 3.364,6.59 4.886,14.11 0.345,18.52996 0.375,37.07006 0.091,55.61006 -1.258,0.03 -1.664,-0.19 -2.918,-0.47 l -2.108,-3.97 c -0.589,-16.68 -0.274,-34.7201 -0.252,-51.50006 0.423,-4.65 0.314,-9.11 0.301,-13.78 z"
     id="path124-4-3"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 1258.806,266.23656 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c 6.686,-4.95 10.39,-7.34 14.68,-14.41 z"
     id="path125-1-8"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 1270.465,227.82656 2.108,3.97 c 1.254,0.28 1.66,0.5 2.918,0.47 0.083,6.54 0.659,9.6599 -2.012,15.69 l -4.213,0.78 c 0.442,-6.97 0.841,-13.94 1.199,-20.91 z"
     id="path126-1-9"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 1063.301,19.6065 c 30.975,-0.74 62.994,-0.2 94.12,-0.47 20.933,0.91 43.129,-2.04 63.743,1.99 28.329,5.54 29.355,26.83 29.608,49.91 l 0.267,111.26996 c -0.014,17.38 0.425,37.24 -1.008,54.62 -1.119,6.1 -4.357,12.34 -8.787,16.64 -13.213,12.8201 -36.165,10.26 -53.174,10.26 l -100.354,0.14 c -6.507,0.03 -13.073,0.15 -19.594,0.07 -28.06,-0.35 -67.061,5.76 -67.3987,-34.6399 -0.2817,-33.6901 -0.01,-67.22006 -0.041,-100.81006 l -0.024,-47.95 c 0,-10.5 -0.442,-23.91 1.0624,-34.18 4.384,-29.93 39.2896,-26.78 61.5806,-26.85 z"
     id="path128-3-3"
     style={{display:'block'}} />
  <path
     fill={`url(#${uid}-Gradient34)`}
     d="m 1036.597,23.4665 c 29.87,-1.91 67.13,0.38 97.906,-0.41 25.199,-0.65 53.663,0.15 78.991,0.54 5.837,0.55 15.663,2.68 20.156,5.97 17.152,12.58 13.058,38.78 13.031,59.32 l -0.101,61.7 c -0.018,22.65 0.048,45.45006 0.22,68.09006 0.164,21.59 -3.434,39.49 -29.277,41.54 -58.795,2.31 -120.275,0.29 -179.245,0.24 -13.127,0.23 -30.0849,-9 -30.9249,-23.6 -3.4079,-59.2001 -1.4911,-119.70006 -1.1554,-179.05006 0.1194,-21.12 9.6833,-31.37 30.3993,-34.34 z"
     id="path129-8-4"
     style={{display:'block',fill:`url(#${uid}-Gradient336)`}} />
  <text
     xmlSpace="preserve"
     style={{fontSize:'170px',textAlign:'center',writingMode:'lr-tb',direction:'ltr',textAnchor:'middle',display:'block',fill:'#f9e584',fillOpacity:'1',strokeWidth:'4'}}
     x="1090"
     y="181.54352"
     id="text334-9-8-7-7-4"
     data-label="D"><tspan
       sodipodiRole="line"
       id="tspan334-4-2-1-4-6"
       style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'500',fontStretch:'normal',fontSize:'170px',fontFamily:'Rasa',fill:'#24221c',strokeWidth:'4'}}
       x="1090"
       y="181.54352">  {teamCalculo.FA}</tspan></text>
  <text
     xmlSpace="preserve"
     transform="matrix(4,0,0,4,-103.91455,-657.53967)"
     id="text335"
     style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'normal',fontStretch:'normal',fontSize:'32px',fontFamily:'Imprint MT Shadow',fill:'#24221c',fillOpacity:'1'}} />
</svg>
            <p className="team-synergy-chart-label">{t('team.team_synastry_chart_label') || 'This is the combined result; check the details below.'}</p>
          </div>
        </div>

        {/* Team Results Header Section */}
        <div className="team-results-header">
          <img src={teamNumerologyCalcHeader} alt="Team Numerology Calculations" className="team-results-header-img" />
          {/* <p className="team-results-header-text">
            {t('team.team_numerology_description') || 'Explore the individual calculations of each team member and the combined Team Synergy result generated from the group.'}
          </p> */}
        </div>

        {/* Member Calculations */}
        {sinastraE.map((sinastra, i) => (
          <div className="row" key={i}>
            <div className="col-1"></div>
            <div className="col-5">
              <p className="team-member-name" style={{ marginBottom: 0, fontWeight: 600 }}>{sinastra.nombre}</p>
              <p>{sinastra.birthdate}</p>
            </div>
            <div className="col-6" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                          <svg
   version="1.1"
   style={{ display: 'block' }}
   viewBox="0 0 1276.6465 294.03772"
   width="319.16162"
   height="73.50943"
   preserveAspectRatio="none"
   id="svg334"
   xmlns="http://www.w3.org/2000/svg"
   xmlnsSvg="http://www.w3.org/2000/svg">
  <defs
     id="defs78">
    <rect
       x="-44.924969"
       y="17.503235"
       width="516.92883"
       height="233.37646"
       id="rect335" />
    <linearGradient
       id={`${uid}-Gradient1`}
       gradientUnits="userSpaceOnUse"
       x1="1035.05"
       y1="512.91699"
       x2="1030.95"
       y2="545.08301">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(101,36,17)"
         id="stop1" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(143,109,44)"
         id="stop2" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient2`}
       gradientUnits="userSpaceOnUse"
       x1="832.17902"
       y1="518.02399"
       x2="810.85498"
       y2="495.508">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(93,54,5)"
         id="stop3" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(127,83,33)"
         id="stop4" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient3`}
       gradientUnits="userSpaceOnUse"
       x1="757.28497"
       y1="628.539"
       x2="805.04901"
       y2="625.56">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(75,34,0)"
         id="stop5" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(105,64,14)"
         id="stop6" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient4`}
       gradientUnits="userSpaceOnUse"
       x1="765.91498"
       y1="617.66998"
       x2="1018.72"
       y2="601.52502">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(255,235,122)"
         id="stop7" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(254,251,190)"
         id="stop8" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient5`}
       gradientUnits="userSpaceOnUse"
       x1="935.89001"
       y1="654.53101"
       x2="985.88098"
       y2="743.19501">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(39,8,0)"
         id="stop9" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(97,57,7)"
         id="stop10" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient6`}
       gradientUnits="userSpaceOnUse"
       x1="865.46899"
       y1="715.03198"
       x2="954.79602"
       y2="501.33301">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(239,219,158)"
         id="stop11" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,237)"
         id="stop12" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient7`}
       gradientUnits="userSpaceOnUse"
       x1="1173.8199"
       y1="761.25098"
       x2="1148.16"
       y2="737.461">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(72,36,0)"
         id="stop13" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(120,80,25)"
         id="stop14" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient8`}
       gradientUnits="userSpaceOnUse"
       x1="1179.02"
       y1="655.94098"
       x2="1163.76"
       y2="658.90802">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(179,117,36)"
         id="stop15" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(199,148,58)"
         id="stop16" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient9`}
       gradientUnits="userSpaceOnUse"
       x1="1142.54"
       y1="546.30499"
       x2="1121.42"
       y2="550.50403">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(193,127,48)"
         id="stop17" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(201,151,54)"
         id="stop18" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient10`}
       gradientUnits="userSpaceOnUse"
       x1="1091.33"
       y1="403.258"
       x2="1071.67"
       y2="413.742">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(190,124,41)"
         id="stop19" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(196,148,54)"
         id="stop20" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient11`}
       gradientUnits="userSpaceOnUse"
       x1="685.41302"
       y1="542.23901"
       x2="694.59399"
       y2="546.74597">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(43,14,0)"
         id="stop21" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(66,27,1)"
         id="stop22" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient12`}
       gradientUnits="userSpaceOnUse"
       x1="1065.46"
       y1="324.11401"
       x2="1056.91"
       y2="304.95401">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(59,23,0)"
         id="stop23" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(97,60,2)"
         id="stop24" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient13`}
       gradientUnits="userSpaceOnUse"
       x1="863.10199"
       y1="341.65399"
       x2="958.13"
       y2="95.122803">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(237,217,153)"
         id="stop25" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,238)"
         id="stop26" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient14`}
       gradientUnits="userSpaceOnUse"
       x1="824.53198"
       y1="351.62701"
       x2="995.03497"
       y2="86.379601">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(255,235,116)"
         id="stop27" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,248,179)"
         id="stop28" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient15`}
       gradientUnits="userSpaceOnUse"
       x1="1527.61"
       y1="1296.99"
       x2="1791.16"
       y2="1145.09">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(113,66,12)"
         id="stop29" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(153,100,39)"
         id="stop30" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient16`}
       gradientUnits="userSpaceOnUse"
       x1="1545.51"
       y1="1300.33"
       x2="1696.24"
       y2="1037.1">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(233,213,158)"
         id="stop31" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,220)"
         id="stop32" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient17`}
       gradientUnits="userSpaceOnUse"
       x1="867.73499"
       y1="1731.6899"
       x2="953.19299"
       y2="1492.71">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(233,211,149)"
         id="stop33" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,236)"
         id="stop34" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient18`}
       gradientUnits="userSpaceOnUse"
       x1="1004.33"
       y1="1476.37"
       x2="998.92902"
       y2="1498.6899">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(95,39,5)"
         id="stop35" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(144,99,36)"
         id="stop36" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient19`}
       gradientUnits="userSpaceOnUse"
       x1="953.48297"
       y1="1665.29"
       x2="1031.46"
       y2="1729.95">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(14,0,0)"
         id="stop37" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(99,55,5)"
         id="stop38" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient20`}
       gradientUnits="userSpaceOnUse"
       x1="910.729"
       y1="1384.96"
       x2="933.62701"
       y2="1388.39">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(136,100,20)"
         id="stop39" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(153,117,65)"
         id="stop40" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient21`}
       gradientUnits="userSpaceOnUse"
       x1="1207.87"
       y1="949.966"
       x2="1215.76"
       y2="933.95398">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(0,0,0)"
         id="stop41" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(28,3,1)"
         id="stop42" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient22`}
       gradientUnits="userSpaceOnUse"
       x1="1215.9399"
       y1="923.789"
       x2="1203.34"
       y2="942.06">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(122,77,24)"
         id="stop43" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(149,103,32)"
         id="stop44" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient23`}
       gradientUnits="userSpaceOnUse"
       x1="1235.75"
       y1="919.20099"
       x2="1326.9399"
       y2="710.66101">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(231,209,146)"
         id="stop45" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,238)"
         id="stop46" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient24`}
       gradientUnits="userSpaceOnUse"
       x1="1390.78"
       y1="909.76801"
       x2="1330.3199"
       y2="814.81702">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(255,231,114)"
         id="stop47" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(253,253,209)"
         id="stop48" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient25`}
       gradientUnits="userSpaceOnUse"
       x1="1342.12"
       y1="685.64502"
       x2="1333.37"
       y2="715.79498">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(90,40,9)"
         id="stop49" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(136,94,33)"
         id="stop50" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient26`}
       gradientUnits="userSpaceOnUse"
       x1="1138.83"
       y1="808.71899"
       x2="1376.39"
       y2="819.51801">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(255,235,124)"
         id="stop51" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(253,250,184)"
         id="stop52" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient27`}
       gradientUnits="userSpaceOnUse"
       x1="1221.59"
       y1="918.47498"
       x2="1340.26"
       y2="710.026">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(85,50,14)"
         id="stop53" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(134,68,11)"
         id="stop54" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient28`}
       gradientUnits="userSpaceOnUse"
       x1="767.51099"
       y1="1182.8101"
       x2="803.43799"
       y2="1184.36">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(30,9,0)"
         id="stop55" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(124,58,2)"
         id="stop56" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient29`}
       gradientUnits="userSpaceOnUse"
       x1="869.64899"
       y1="1282.02"
       x2="959.40302"
       y2="1031.5">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(237,219,167)"
         id="stop57" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,255,224)"
         id="stop58" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient30`}
       gradientUnits="userSpaceOnUse"
       x1="796.427"
       y1="1170.95"
       x2="738.40399"
       y2="1163.24">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(10,0,0)"
         id="stop59" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(104,64,13)"
         id="stop60" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient31`}
       gradientUnits="userSpaceOnUse"
       x1="981.69299"
       y1="1268.8199"
       x2="995.12"
       y2="1318.42">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(49,26,1)"
         id="stop61" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(86,39,5)"
         id="stop62" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient32`}
       gradientUnits="userSpaceOnUse"
       x1="844.14801"
       y1="1517"
       x2="806.71802"
       y2="1480.95">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(66,32,0)"
         id="stop63" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(135,91,34)"
         id="stop64" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient33`}
       gradientUnits="userSpaceOnUse"
       x1="518.09003"
       y1="1537.01"
       x2="579.24902"
       y2="1451.11">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(14,11,1)"
         id="stop65" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(85,40,2)"
         id="stop66" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient34`}
       gradientUnits="userSpaceOnUse"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699"
       gradientTransform="translate(46.206181,-376.25033)">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(230,209,154)"
         id="stop67" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(255,251,213)"
         id="stop68" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient35`}
       gradientUnits="userSpaceOnUse"
       x1="665.62903"
       y1="812.94598"
       x2="690.00897"
       y2="804.48499">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(193,142,63)"
         id="stop69" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(214,182,110)"
         id="stop70" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient36`}
       gradientUnits="userSpaceOnUse"
       x1="344.56"
       y1="966.49902"
       x2="353.91699"
       y2="976.00098">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(53,24,0)"
         id="stop71" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(83,42,3)"
         id="stop72" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient37`}
       gradientUnits="userSpaceOnUse"
       x1="387.42401"
       y1="851.815"
       x2="441.802"
       y2="834.70203">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(84,45,2)"
         id="stop73" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(59,26,5)"
         id="stop74" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient38`}
       gradientUnits="userSpaceOnUse"
       x1="623.89697"
       y1="798.85999"
       x2="413.612"
       y2="833.69397">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(153,74,4)"
         id="stop75" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(88,49,17)"
         id="stop76" />
    </linearGradient>
    <linearGradient
       id={`${uid}-Gradient39`}
       gradientUnits="userSpaceOnUse"
       x1="505.289"
       y1="923.91803"
       x2="563.76801"
       y2="714.37701">
      <stop
         class="stop0"
         offset="0"
         stopOpacity="1"
         stopColor="rgb(231,210,150)"
         id="stop77" />
      <stop
         class="stop1"
         offset="1"
         stopOpacity="1"
         stopColor="rgb(251,242,202)"
         id="stop78" />
    </linearGradient>
    <linearGradient
       id={`${uid}-linearGradient335`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(267.95589,-1032.3518)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
    <linearGradient
       inkscapeCollect="always"
       xlinkHf="#Gradient34"
       id={`${uid}-linearGradient3`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(588.90578,-1028.3518)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
    <linearGradient
       inkscapeCollect="always"
       xlinkHf="#Gradient34"
       id={`${uid}-linearGradient336`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(914.57005,-1026.9135)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
    <linearGradient
       inkscapeCollect="always"
       xlinkHf="#Gradient34"
       id={`${uid}-linearGradient7`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(46.206181,-376.25033)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
    <linearGradient
       inkscapeCollect="always"
       xlinkHf="#Gradient34"
       id={`${uid}-linearGradient386`}
       gradientUnits="userSpaceOnUse"
       gradientTransform="translate(-57.70837,-1033.79)"
       x1="133.731"
       y1="1297.16"
       x2="288.827"
       y2="1040.5699" />
  </defs>
  <path
     fill="#c89138"
     d="m 297.22663,67.11 c 0.695,-16.89 -1.037,-20.16 -3.02,-35.92 l 1.547,-0.25 c 12.079,10.12 6.404,80.11 6.733,98.51 l -1.526,1.1 -1.159,-0.66 c -0.395,-2.93 -0.826,-5.34 -1.397,-8.25 -0.54,-18.17 -0.933,-36.35 -1.178,-54.53 z"
     id="path116" />
  <path
     fill="#fbe990"
     d="m 204.06963,1.68 0.547,1.45 1.756,0.7 c 2.276,-0.92 2.625,-1.84 4.148,-3.83 4.619,2.15 9.35,-0.07 15.718,1.35 l -1.414,0.86 c 2.079,2.11 6.724,1.54 10.814,2.59 6.541,0.38 10.862,0.53 17.38,0.22 12.92,1.92 25.203,5.3 33.457,16.32 10.944,14.59 7.114,80.43 7.236,101.54 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53 0.375,37.07 0.091,55.61 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886001,3.41 -126.248401,-6.26 C 18.361029,276.38 9.5749291,257.6 3.5154291,244.03 l -2.2281,-0.66 c -1.13970004,-2.87 -1.14300004,-8.44 -1.12500004,-11.61 0.3502,-61.27 -0.7248,-122.62 0.2768,-183.88 0.094,-5.75 3.27180004,-12.99 5.74730004,-18.09 C 36.934129,-12.56 80.467629,3.97 127.07963,0.96 c 10.779,-0.7 71.885,-0.83 76.99,0.72 z"
     id="path118" />
  <path
     fill="#aa7525"
     d="m 6.1864291,29.79 c 5.1534999,2.18 4.5486999,2.42 4.3926999,8.46 C 8.3929291,50.11 9.1164291,68.89 9.1661291,81.57 l 0.2675,66.47 -0.0171,56.45 c -0.009,10.57 -0.976,29.58 1.2546999,39.31 4.4097,19.24 24.1571,31.72 43.0974,31.44 9.182,1.31 24.577,0.91 34.268,0.9 l 53.627001,-0.1 c 19.374,-0.03 117.419,2.22 130.184,-2.27 l 5.869,4.54 c -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886001,3.41 -126.248401,-6.26 C 18.361029,276.38 9.5749291,257.6 3.5154291,244.03 l -2.2281,-0.66 c -1.13970004,-2.87 -1.14300004,-8.44 -1.12500004,-11.61 0.3502,-61.27 -0.7248,-122.62 0.2768,-183.88 0.094,-5.75 3.27180004,-12.99 5.74730004,-18.09 z"
     id="path119" />
  <path
     fill="#4b2809"
     d="m 10.579129,38.25 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 6.822,-0.9 37.930001,-0.25 46.934001,-0.24 l 103.609,-0.01 c 15.983,-0.04 33.899,1.22 49.512,-2.35 6.167,-1.41 11.37,-4.23 15.936,-8.63 6.193,-5.96 10.801,-14.31 12.897,-22.63 4.895,-19.43 2.046,-89.05 2.315,-113.59 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53 0.375,37.07 0.091,55.61 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c -12.765,4.49 -110.81,2.24 -130.184,2.27 l -53.627001,0.1 c -9.691,0.01 -25.086,0.41 -34.268,-0.9 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2306999,-9.73 -1.2632999,-28.74 -1.2546999,-39.31 l 0.0171,-56.45 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.4129999,-43.32 z"
     id="path120" />
  <path
     fill="#2e1703"
     d="m 10.579129,38.25 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 7.059,2.38 27.193,-0.21 34.227,0.78 15.574001,2.2 111.833001,-3.15 120.096001,0.69 -7.689,0.72 -58.849,-0.11 -60.671,0.95 3.35,1.35 55.6,1.57 60.512,0.86 l 0.475,0.94 c -38.71,2.17 -82.273,-0.42 -121.368001,0.64 -10.218,0.27 -33.583,-1 -42.011,0.05 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2306999,-9.73 -1.2632999,-28.74 -1.2546999,-39.31 l 0.0171,-56.45 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.4129999,-43.32 z"
     id="path121" />
  <path
     fill="#1f0700"
     d="m 294.51663,123.09 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.013,4.67 0.122,9.13 -0.301,13.78 -1.85,3.35 -0.826,54.26 -2.288,64.91 l -0.841,0.23 c 0.358,0.74 -0.261,-40.91 -0.272,-44.4 z"
     id="path122" />
  <path
     fill="#7b7455"
     d="m 298.40463,121.64 c 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.145,-11.34 0.202,-22.68 0.169,-34.03 z"
     id="path123" />
  <path
     fill="#c89138"
     d="m 298.23563,155.67 c 1.43,6.05 3.364,6.59 4.886,14.11 0.345,18.53 0.375,37.07 0.091,55.61 -1.258,0.03 -1.664,-0.19 -2.918,-0.47 l -2.108,-3.97 c -0.589,-16.68 -0.274,-34.72 -0.252,-51.5 0.423,-4.65 0.314,-9.11 0.301,-13.78 z"
     id="path124" />
  <path
     fill="#fbeeb3"
     d="m 286.52763,259.36 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c 6.686,-4.95 10.39,-7.34 14.68,-14.41 z"
     id="path125" />
  <path
     fill="#c89138"
     d="m 298.18663,220.95 2.108,3.97 c 1.254,0.28 1.66,0.5 2.918,0.47 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c 0.442,-6.97 0.841,-13.94 1.199,-20.91 z"
     id="path126" />
  <path
     fill="#fbeeb3"
     d="m 91.022629,12.73 c 30.975001,-0.74 62.994001,-0.2 94.120001,-0.47 20.933,0.91 43.129,-2.04 63.743,1.99 28.329,5.54 29.355,26.83 29.608,49.91 l 0.267,111.27 c -0.014,17.38 0.425,37.24 -1.008,54.62 -1.119,6.1 -4.357,12.34 -8.787,16.64 -13.213,12.82 -36.165,10.26 -53.174,10.26 l -100.354,0.14 c -6.507,0.03 -13.073,0.15 -19.594001,0.07 -28.06,-0.35 -67.061,5.76 -67.3987,-34.64 -0.2817,-33.69 -0.008,-67.22 -0.0409,-100.81 l -0.0244,-47.95 c 0.002,-10.5 -0.442,-23.91 1.0624,-34.18 4.384,-29.93 39.2896,-26.78 61.5806,-26.85 z"
     id="path128" />
  <path
     fill={`url(#${uid}-Gradient34)`}
     d="m 64.318629,16.59 c 29.87,-1.91 67.130001,0.38 97.906001,-0.41 25.199,-0.65 53.663,0.15 78.991,0.54 5.837,0.55 15.663,2.68 20.156,5.97 17.152,12.58 13.058,38.78 13.031,59.32 l -0.101,61.7 c -0.018,22.65 0.048,45.45 0.22,68.09 0.164,21.59 -3.434,39.49 -29.277,41.54 -58.795,2.31 -120.275,0.29 -179.245001,0.24 -13.127,0.23 -30.0849,-9 -30.9249,-23.6 -3.4079,-59.2 -1.4911,-119.7 -1.1554,-179.05 0.1194,-21.12 9.6833,-31.37 30.3993,-34.34 z"
     id="path129"
     style={{fill: `url(#${uid}-linearGradient386)`}} />
  <text
     xmlSpace="preserve"
     style={{fontSize:'170px',textAlign:'center',writingMode:'lr-tb',direction:'ltr',textAnchor:'middle',display:'block',fill:'#f9e584',fillOpacity:'1',strokeWidth:'4'}}
     x="140"
     y="174.66705"
     id="text334-AA-2564"
     data-label="A"><tspan
       sodipodiRole="line"
       id="tspan334-4-2-1"
       style={{fontStyle:'normal',fontSize:'128px',fontVariant:'normal',fontWeight:'500',fontStretch:'normal',fontFamily:'Rasa',fill:'#24221c',strokeWidth:'4'}}
       x="140"
       y="174.66705">  {sinastra.A}</tspan></text>
  <path
     fill="#c89138"
     d="m 622.89089,68.54825 c 0.695,-16.89 -1.037,-20.16 -3.02,-35.92 l 1.547,-0.25 c 12.079,10.12 6.404,80.11 6.733,98.51 l -1.526,1.1 -1.159,-0.66 c -0.395,-2.93 -0.826,-5.34 -1.397,-8.25 -0.54,-18.17 -0.933,-36.35 -1.178,-54.53 z"
     id="path116-5"
     style={{display:'block'}} />
  <path
     fill="#fbe990"
     d="m 529.73389,3.11825 0.547,1.45 1.756,0.7 c 2.276,-0.92 2.625,-1.84 4.148,-3.83 4.619,2.15 9.35,-0.07 15.718,1.35 l -1.414,0.86 c 2.079,2.11 6.724,1.54 10.814,2.59 6.541,0.38 10.862,0.53 17.38,0.22 12.92,1.92 25.203,5.3 33.457,16.32 10.944,14.59 7.114,80.43 7.236,101.54 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53001 0.375,37.07001 0.091,55.61001 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.4852,-4.04 -25.2713,-22.82 -31.3308,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27001 -0.7248,-122.62001 0.2768,-183.88001 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 30.7477,-42.35 74.2812,-25.82 120.8932,-28.83 10.779,-0.7 71.885,-0.83 76.99,0.72 z"
     id="path118-4"
     style={{display:'block'}} />
  <path
     fill="#aa7525"
     d="m 331.85069,31.22825 c 5.1535,2.18 4.5487,2.42 4.3927,8.46 -2.1862,11.86 -1.4627,30.64 -1.413,43.32 l 0.2675,66.47 -0.0171,56.45001 c -0.009,10.57 -0.976,29.58 1.2547,39.31 4.4097,19.24 24.1571,31.72 43.0974,31.44 9.182,1.31 24.577,0.91 34.268,0.9 l 53.627,-0.1 c 19.374,-0.03 117.419,2.22 130.184,-2.27 l 5.869,4.54 c -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.4852,-4.04 -25.2713,-22.82 -31.3308,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27001 -0.7248,-122.62001 0.2768,-183.88001 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 z"
     id="path119-3"
     style={{display:'block'}} />
  <path
     fill="#4b2809"
     d="m 336.24339,39.68825 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68001 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 6.822,-0.9 37.93,-0.25 46.934,-0.24 l 103.609,-0.01 c 15.983,-0.04 33.899,1.22 49.512,-2.35 6.167,-1.41 11.37,-4.23 15.936,-8.63 6.193,-5.96 10.801,-14.31 12.897,-22.63 4.895,-19.43 2.046,-89.05001 2.315,-113.59001 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53001 0.375,37.07001 0.091,55.61001 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c -12.765,4.49 -110.81,2.24 -130.184,2.27 l -53.627,0.1 c -9.691,0.01 -25.086,0.41 -34.268,-0.9 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.0171,-56.45001 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path120-1"
     style={{display:'block'}} />
  <path
     fill="#2e1703"
     d="m 336.24339,39.68825 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68001 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 7.059,2.38 27.193,-0.21 34.227,0.78 15.574,2.2 111.833,-3.15 120.096,0.69 -7.689,0.72 -58.849,-0.11 -60.671,0.95 3.35,1.35 55.6,1.57 60.512,0.86 l 0.475,0.94 c -38.71,2.17 -82.273,-0.42 -121.368,0.64 -10.218,0.27 -33.583,-1 -42.011,0.05 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.0171,-56.45001 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path121-2"
     style={{display:'block'}} />
  <path
     fill="#1f0700"
     d="m 620.18089,124.52825 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.013,4.67 0.122,9.13 -0.301,13.78 -1.85,3.35 -0.826,54.26001 -2.288,64.91001 l -0.841,0.23 c 0.358,0.74 -0.261,-40.91 -0.272,-44.4 z"
     id="path122-3"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 624.06889,123.07825 c 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0.003,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.145,-11.34 0.202,-22.68 0.169,-34.03 z"
     id="path123-3"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 623.89989,157.10825 c 1.43,6.05 3.364,6.59 4.886,14.11 0.345,18.53001 0.375,37.07001 0.091,55.61001 -1.258,0.03 -1.664,-0.19 -2.918,-0.47 l -2.108,-3.97 c -0.589,-16.68 -0.274,-34.72 -0.252,-51.50001 0.423,-4.65 0.314,-9.11 0.301,-13.78 z"
     id="path124-4"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 612.19189,260.79826 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c 6.686,-4.95 10.39,-7.34 14.68,-14.41 z"
     id="path125-1"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 623.85089,222.38826 2.108,3.97 c 1.254,0.28 1.66,0.5 2.918,0.47 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c 0.442,-6.97 0.841,-13.94 1.199,-20.91 z"
     id="path126-1"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 416.68689,14.16825 c 30.975,-0.74 62.994,-0.2 94.12,-0.47 20.933,0.91 43.129,-2.04 63.743,1.99 28.329,5.54 29.355,26.83 29.608,49.91 l 0.267,111.27 c -0.014,17.38001 0.425,37.24001 -1.008,54.62001 -1.119,6.1 -4.357,12.34 -8.787,16.64 -13.213,12.82 -36.165,10.26 -53.174,10.26 l -100.354,0.14 c -6.507,0.03 -13.073,0.15 -19.594,0.07 -28.06,-0.35 -67.061,5.76 -67.3987,-34.64 -0.2817,-33.69 -0.008,-67.22001 -0.0409,-100.81001 l -0.0244,-47.95 c 0.002,-10.5 -0.442,-23.91 1.0624,-34.18 4.384,-29.93 39.2896,-26.78 61.5806,-26.85 z"
     id="path128-3"
     style={{display:'block'}} />
  <path
     fill={`url(#${uid}-Gradient34)`}
     d="m 389.98289,18.02825 c 29.87,-1.91 67.13,0.38 97.906,-0.41 25.199,-0.65 53.663,0.15 78.991,0.54 5.837,0.55 15.663,2.68 20.156,5.97 17.152,12.58 13.058,38.78 13.031,59.32 l -0.101,61.7 c -0.018,22.65 0.048,45.45001 0.22,68.09001 0.164,21.59 -3.434,39.49 -29.277,41.54 -58.795,2.31 -120.275,0.29 -179.245,0.24 -13.127,0.23 -30.0849,-9 -30.9249,-23.6 -3.4079,-59.20001 -1.4911,-119.70001 -1.1554,-179.05001 0.1194,-21.12 9.6833,-31.37 30.3993,-34.34 z"
     id="path129-8"
     style={{display:'block',fill:`url(#${uid}-Gradient335)`}} />
  <text
     xmlSpace="preserve"
     style={{fontSize:'170px',textAlign:'center',writingMode:'lr-tb',direction:'ltr',textAnchor:'middle',display:'block',fill:'#f9e584',fillOpacity:'1',strokeWidth:'4'}}
     x="430"
     y="176.10529"
     id="text334-BB"
     data-label="B"><tspan
       sodipodiRole="line"
        fontSize={sinastra.bl} 
       id="tspan334-4-2-1-4"
       style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'500',fontStretch:'normal',fontSize:'170px',fontFamily:'Rasa',fill:'#24221c',strokeWidth:'4'}}
       x="430"
       y="176.10529">  {sinastra.B}</tspan></text>
  <path
     fill="#c89138"
     d="m 943.84075,72.54825 c 0.695,-16.89 -1.037,-20.16 -3.02,-35.92 l 1.547,-0.25 c 12.079,10.12 6.404,80.11 6.733,98.51 l -1.526,1.1 -1.159,-0.66 c -0.395,-2.93 -0.826,-5.34 -1.397,-8.25 -0.54,-18.17 -0.933,-36.35 -1.178,-54.53 z"
     id="path116-1"
     style={{display:'block'}} />
  <path
     fill="#fbe990"
     d="m 850.68378,7.11825 0.547,1.45 1.756,0.7 c 2.276,-0.92 2.625,-1.84 4.148,-3.83 4.619,2.15 9.35,-0.07 15.718,1.35 l -1.414,0.86 c 2.079,2.11 6.724,1.54 10.814,2.59 6.541,0.38 10.862,0.53 17.37997,0.22 12.92,1.92 25.203,5.3 33.457,16.32 10.944,14.59 7.114,80.43 7.236,101.54 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53001 0.375,37.07001 0.091,55.61001 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 -29.11597,11.42 -83.58597,8.56 -116.62197,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.4852,-4.04 -25.2713,-22.82 -31.3308,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27001 -0.7248,-122.62001 0.2768,-183.88001 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 30.7477,-42.35 74.2812,-25.82 120.8932,-28.83 10.779,-0.7 71.885,-0.83 76.99,0.72 z"
     id="path118-9"
     style={{display:'block'}} />
  <path
     fill="#aa7525"
     d="m 652.80058,35.22825 c 5.1535,2.18 4.5487,2.42 4.3927,8.46 -2.1862,11.86 -1.4627,30.64 -1.413,43.32 l 0.2675,66.47 -0.0171,56.45001 c -0.009,10.57 -0.976,29.58 1.2547,39.31 4.4097,19.24 24.1571,31.72 43.0974,31.44 9.182,1.31 24.577,0.91 34.268,0.9 l 53.627,-0.1 c 19.374,-0.03 117.41897,2.22 130.18397,-2.27 l 5.869,4.54 c -29.11597,11.42 -83.58597,8.56 -116.62197,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.4852,-4.04 -25.2713,-22.82 -31.3308,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27001 -0.7248,-122.62001 0.2768,-183.88001 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 z"
     id="path119-8"
     style={{display:'block'}} />
  <path
     fill="#4b2809"
     d="m 657.19328,43.68825 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68001 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 6.822,-0.9 37.93,-0.25 46.934,-0.24 l 103.609,-0.01 c 15.983,-0.04 33.899,1.22 49.51197,-2.35 6.167,-1.41 11.37,-4.23 15.936,-8.63 6.193,-5.96 10.801,-14.31 12.897,-22.63 4.895,-19.43 2.046,-89.05001 2.315,-113.59001 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53001 0.375,37.07001 0.091,55.61001 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c -12.765,4.49 -110.80997,2.24 -130.18397,2.27 l -53.627,0.1 c -9.691,0.01 -25.086,0.41 -34.268,-0.9 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.0171,-56.45001 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path120-6"
     style={{display:'block'}} />
  <path
     fill="#2e1703"
     d="m 657.19328,43.68825 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.0773,64.46 0.0912,51.68001 c 0.0723,44.17 -3.1242,67.3 48.3996,72.38 7.059,2.38 27.193,-0.21 34.227,0.78 15.574,2.2 111.833,-3.15 120.096,0.69 -7.689,0.72 -58.849,-0.11 -60.671,0.95 3.35,1.35 55.6,1.57 60.512,0.86 l 0.475,0.94 c -38.71,2.17 -82.273,-0.42 -121.368,0.64 -10.218,0.27 -33.583,-1 -42.011,0.05 -18.9403,0.28 -38.6877,-12.2 -43.0974,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.0171,-56.45001 -0.2675,-66.47 c -0.0497,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path121-5"
     style={{display:'block'}} />
  <path
     fill="#1f0700"
     d="m 941.13075,128.52825 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.013,4.67 0.122,9.13 -0.301,13.78 -1.85,3.35001 -0.826,54.26001 -2.288,64.91001 l -0.841,0.23 c 0.358,0.74 -0.261,-40.91 -0.272,-44.4 z"
     id="path122-0"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 945.01875,127.07825 c 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.145,-11.34 0.202,-22.68 0.169,-34.03 z"
     id="path123-2"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 944.84975,161.10825 c 1.43,6.05 3.364,6.59 4.886,14.11 0.345,18.53001 0.375,37.07001 0.091,55.61001 -1.258,0.03 -1.664,-0.19 -2.918,-0.47 l -2.108,-3.97 c -0.589,-16.68 -0.274,-34.72 -0.252,-51.50001 0.423,-4.65 0.314,-9.11 0.301,-13.78 z"
     id="path124-8"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 933.14175,264.79826 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c 6.686,-4.95 10.39,-7.34 14.68,-14.41 z"
     id="path125-6"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 944.80075,226.38826 2.108,3.97 c 1.254,0.28 1.66,0.5 2.918,0.47 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c 0.442,-6.97 0.841,-13.94 1.199,-20.91 z"
     id="path126-0"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 737.63678,18.16825 c 30.975,-0.74 62.994,-0.2 94.12,-0.47 20.933,0.91 43.129,-2.04 63.743,1.99 28.32897,5.54 29.35497,26.83 29.60797,49.91 l 0.267,111.27001 c -0.014,17.38 0.425,37.24 -1.008,54.62 -1.119,6.1 -4.357,12.34 -8.787,16.64 -13.213,12.82 -36.16497,10.26 -53.17397,10.26 l -100.354,0.14 c -6.507,0.03 -13.073,0.15 -19.594,0.07 -28.06,-0.35 -67.061,5.76 -67.3987,-34.64 -0.2817,-33.69 -0.008,-67.22001 -0.0409,-100.81001 l -0.0244,-47.95 c 0.002,-10.5 -0.442,-23.91 1.0624,-34.18 4.384,-29.93 39.2896,-26.78 61.5806,-26.85 z"
     id="path128-2"
     style={{display:'block'}} />
  <path
     fill={`url(#${uid}-Gradient34)`}
     d="m 710.93278,22.02825 c 29.87,-1.91 67.13,0.38 97.906,-0.41 25.199,-0.65 53.663,0.15 78.991,0.54 5.837,0.55 15.66297,2.68 20.15597,5.97 17.152,12.58 13.058,38.78 13.031,59.32 l -0.101,61.7 c -0.018,22.65 0.048,45.45001 0.22,68.09001 0.164,21.59 -3.434,39.49 -29.27697,41.54 -58.795,2.31 -120.275,0.29 -179.245,0.24 -13.127,0.23 -30.0849,-9 -30.9249,-23.6 -3.4079,-59.20001 -1.4911,-119.70001 -1.1554,-179.05001 0.1194,-21.12 9.6833,-31.37 30.3993,-34.34 z"
     id="path129-4"
     style={{display:'block',fill:`url(#${uid}-linearGradient3)`}} />
  <text
     xmlSpace="preserve"
     style={{fontSize:'170px',textAlign:'center',writingMode:'lr-tb',direction:'ltr',textAnchor:'middle',display:'block',fill:'#f9e584',fillOpacity:'1',strokeWidth:'4'}}
     x="760"
     y="180.10535"
     id="text334-CC"
     data-label="C"><tspan
       sodipodiRole="line"
       id="tspan334-4-2-1-6"
           fontSize={sinastra.cl} 
       style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'500',fontStretch:'normal',fontSize:'170px',fontFamily:'Rasa',fill:'#24221c',strokeWidth:'4'}}
       x="760"
       y="180.10535">  {sinastra.C}</tspan></text>
  <path
     fill="#c89138"
     d="m 1269.505,73.9865 c 0.695,-16.89 -1.037,-20.16 -3.02,-35.92 l 1.547,-0.25 c 12.079,10.12 6.404,80.11 6.733,98.51 l -1.526,1.1 -1.159,-0.66 c -0.395,-2.93 -0.826,-5.34 -1.397,-8.25 -0.54,-18.17 -0.933,-36.35 -1.178,-54.53 z"
     id="path116-5-5"
     style={{display:'block'}} />
  <path
     fill="#fbe990"
     d="m 1176.348,8.5565 0.547,1.45 1.756,0.7 c 2.276,-0.92 2.625,-1.84 4.148,-3.83 4.619,2.15 9.35,-0.07 15.718,1.35 l -1.414,0.86 c 2.079,2.11 6.724,1.54 10.814,2.59 6.541,0.38 10.862,0.53 17.38,0.22 12.92,1.92 25.203,5.3 33.457,16.32 10.944,14.59 7.114,80.43 7.236,101.54 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.53006 0.375,37.07006 0.091,55.61006 0.083,6.54 0.659,9.66 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.64 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.48515,-4.04 -25.27125,-22.82 -31.33075,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27006 -0.7248,-122.62006 0.2768,-183.88006 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 30.74765,-42.35 74.28115,-25.82 120.89315,-28.83 10.779,-0.7 71.885,-0.83 76.99,0.72 z"
     id="path118-4-0"
     style={{display:'block'}} />
  <path
     fill="#aa7525"
     d="m 978.46485,36.6665 c 5.1535,2.18 4.5487,2.42 4.3927,8.46 -2.1862,11.86 -1.4627,30.64 -1.413,43.32 l 0.2675,66.47 -0.017,56.45006 c -0.01,10.57 -0.976,29.58 1.2547,39.31 4.4097,19.24 24.15705,31.72 43.09735,31.44 9.182,1.31 24.577,0.91 34.268,0.9 l 53.627,-0.1 c 19.374,-0.03 117.419,2.22 130.184,-2.27 l 5.869,4.54 c -29.116,11.42 -83.586,8.56 -116.622,8.37 -40.773,-0.24 -86.886,3.41 -126.2484,-6.26 -16.48515,-4.04 -25.27125,-22.82 -31.33075,-36.39 l -2.2281,-0.66 c -1.1397,-2.87 -1.143,-8.44 -1.125,-11.61 0.3502,-61.27006 -0.7248,-122.62006 0.2768,-183.88006 0.094,-5.75 3.2718,-12.99 5.7473,-18.09 z"
     id="path119-3-9"
     style={{display:'block'}} />
  <path
     fill="#4b2809"
     d="m 982.85755,45.1265 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.077,64.46 0.091,51.68006 c 0.072,44.17 -3.1242,67.3 48.39955,72.38 6.822,-0.9 37.93,-0.25 46.934,-0.24 l 103.609,-0.01 c 15.983,-0.04 33.899,1.22 49.512,-2.35 6.167,-1.41 11.37,-4.23 15.936,-8.63 6.193,-5.96 10.801,-14.31 12.897,-22.63 4.895,-19.43 2.046,-89.05006 2.315,-113.59006 l 0.805,0.21 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c 0.345,18.52996 0.375,37.07006 0.091,55.61006 0.083,6.54 0.659,9.6599 -2.012,15.69 l -4.213,0.78 c -1.567,4.58 -2.556,8.37 -5.467,12.3 l -1.53,0.79 -0.414,1.46 c -2.348,1.23 -1.688,1.08 -4.204,1.6399 l 1.155,1.31 c 3.295,1.23 6.266,6.81 9.318,10.1501 l -4.374,2.5699 c -4.517,-0.4099 -8.683,3.6401 -13.755,6.23 l -5.869,-4.5399 c -12.765,4.49 -110.81,2.24 -130.184,2.2699 l -53.627,0.1001 c -9.691,0.01 -25.086,0.4099 -34.268,-0.9 -18.9403,0.28 -38.68765,-12.2001 -43.09735,-31.4401 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.3099 l 0.017,-56.45006 -0.2675,-66.47 c -0.05,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path120-1-0"
     style={{display:'block'}} />
  <path
     fill="#2e1703"
     d="m 982.85755,45.1265 1.7144,-1.48 c 2.3143,1.57 1.3125,0.59 2.484,3.51 -1.2701,12.58 -0.8456,28.64 -0.837,41.53 l 0.077,64.46 0.091,51.68006 c 0.072,44.17 -3.1242,67.3 48.39955,72.38 7.059,2.38 27.193,-0.21 34.227,0.78 15.574,2.2 111.833,-3.15 120.096,0.69 -7.689,0.72 -58.849,-0.11 -60.671,0.95 3.35,1.35 55.6,1.57 60.512,0.86 l 0.475,0.94 c -38.71,2.17 -82.273,-0.42 -121.368,0.64 -10.218,0.27 -33.583,-1 -42.011,0.05 -18.9403,0.28 -38.68765,-12.2 -43.09735,-31.44 -2.2307,-9.73 -1.2633,-28.74 -1.2547,-39.31 l 0.017,-56.45006 -0.2675,-66.47 c -0.05,-12.68 -0.7732,-31.46 1.413,-43.32 z"
     id="path121-2-0"
     style={{display:'block'}} />
  <path
     fill="#1f0700"
     d="m 1266.795,129.9665 c 0.912,-15.03 0.283,-39.64 0.314,-55.29 0.783,3.24 0.69,17.15 0.752,21.3 1.051,-7.75 -0.09,-14.77 1.644,-21.99 0.245,18.18 0.638,36.36 1.178,54.53 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.013,4.67 0.122,9.13 -0.301,13.78 -1.85,3.34996 -0.826,54.25996 -2.288,64.90996 l -0.841,0.23 c 0.358,0.74 -0.261,-40.91 -0.272,-44.4 z"
     id="path122-3-6"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 1270.683,128.5165 c 0.571,2.91 1.002,5.32 1.397,8.25 l 1.159,0.66 1.526,-1.1 1.865,1.45 c 0,5.06 0.234,7.28 -1.061,12.25 l -1.329,0.11 c 0.528,6.56 0.99,13.13 1.385,19.71 l -0.225,6.81 c -1.522,-7.52 -3.456,-8.06 -4.886,-14.11 0.145,-11.34 0.202,-22.68 0.169,-34.03 z"
     id="path123-3-1"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 1270.514,162.5465 c 1.43,6.05 3.364,6.59 4.886,14.11 0.345,18.52996 0.375,37.07006 0.091,55.61006 -1.258,0.03 -1.664,-0.19 -2.918,-0.47 l -2.108,-3.97 c -0.589,-16.68 -0.274,-34.7201 -0.252,-51.50006 0.423,-4.65 0.314,-9.11 0.301,-13.78 z"
     id="path124-4-3"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 1258.806,266.23656 c 3.295,1.23 6.266,6.81 9.318,10.15 l -4.374,2.57 c -4.517,-0.41 -8.683,3.64 -13.755,6.23 l -5.869,-4.54 c 6.686,-4.95 10.39,-7.34 14.68,-14.41 z"
     id="path125-1-8"
     style={{display:'block'}} />
  <path
     fill="#c89138"
     d="m 1270.465,227.82656 2.108,3.97 c 1.254,0.28 1.66,0.5 2.918,0.47 0.083,6.54 0.659,9.6599 -2.012,15.69 l -4.213,0.78 c 0.442,-6.97 0.841,-13.94 1.199,-20.91 z"
     id="path126-1-9"
     style={{display:'block'}} />
  <path
     fill="#fbeeb3"
     d="m 1063.301,19.6065 c 30.975,-0.74 62.994,-0.2 94.12,-0.47 20.933,0.91 43.129,-2.04 63.743,1.99 28.329,5.54 29.355,26.83 29.608,49.91 l 0.267,111.26996 c -0.014,17.38 0.425,37.24 -1.008,54.62 -1.119,6.1 -4.357,12.34 -8.787,16.64 -13.213,12.8201 -36.165,10.26 -53.174,10.26 l -100.354,0.14 c -6.507,0.03 -13.073,0.15 -19.594,0.07 -28.06,-0.35 -67.061,5.76 -67.3987,-34.6399 -0.2817,-33.6901 -0.01,-67.22006 -0.041,-100.81006 l -0.024,-47.95 c 0,-10.5 -0.442,-23.91 1.0624,-34.18 4.384,-29.93 39.2896,-26.78 61.5806,-26.85 z"
     id="path128-3-3"
     style={{display:'block'}} />
  <path
     fill={`url(#${uid}-Gradient34)`}
     d="m 1036.597,23.4665 c 29.87,-1.91 67.13,0.38 97.906,-0.41 25.199,-0.65 53.663,0.15 78.991,0.54 5.837,0.55 15.663,2.68 20.156,5.97 17.152,12.58 13.058,38.78 13.031,59.32 l -0.101,61.7 c -0.018,22.65 0.048,45.45006 0.22,68.09006 0.164,21.59 -3.434,39.49 -29.277,41.54 -58.795,2.31 -120.275,0.29 -179.245,0.24 -13.127,0.23 -30.0849,-9 -30.9249,-23.6 -3.4079,-59.2001 -1.4911,-119.70006 -1.1554,-179.05006 0.1194,-21.12 9.6833,-31.37 30.3993,-34.34 z"
     id="path129-8-4"
     style={{display:'block',fill:`url(#${uid}-Gradient336)`}} />
  <text
     xmlSpace="preserve"
     style={{fontSize:'170px',textAlign:'center',writingMode:'lr-tb',direction:'ltr',textAnchor:'middle',display:'block',fill:'#f9e584',fillOpacity:'1',strokeWidth:'4'}}
     x="1090"
     y="181.54352"
     id="text334-DD"
     data-label="D"><tspan
       sodipodiRole="line"
       id="tspan334-4-2-1-4-6"
       fontSize={sinastra.dl} 
       style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'500',fontStretch:'normal',fontSize:'170px',fontFamily:'Rasa',fill:'#24221c',strokeWidth:'4'}}
       x="1090"
       y="181.54352">  {sinastra.D}</tspan></text>
  <text
     xmlSpace="preserve"
     transform="matrix(4,0,0,4,-103.91455,-657.53967)"
     id="text335"
     style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'normal',fontStretch:'normal',fontSize:'32px',fontFamily:'Imprint MT Shadow',fill:'#24221c',fillOpacity:'1'}} />
</svg>
            </div>
          </div>
        ))}

      </div>
      <br></br>
      <br></br>
    </div>
  );
  
  // Render loading spinner
  const renderLoading = () => (
    <div className="lds-ripple" style={{ display: loading ? 'block' : 'none' }}>
      <div></div>
      <div></div>
    </div>
  );
  
  return (
    <main className="main">
      <div ref={contentRef} className="content">
        {renderLoading()}
        {renderForm()}
        {renderResults()}
      </div>
    </main>
  );
};

export default TeamComponent; 