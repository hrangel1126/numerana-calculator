import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import calculosUtils from '../../utils/calculosUtils';
import './TeamComponent.css';
import { useTranslation } from '../../utils/i18n/LanguageContext';
import PinaculoChartComponent from '../common/PinaculoChartComponent';
import ResultsHeaderComponent from '../common/ResultsHeaderComponent';

// Import images directly
import leftDecoration from '../../assets/img/Lleft.png';
import rightDecoration from '../../assets/img/Lright.png';
import logoImage from '../../assets/img/logonumerana80.png';
import teamHeaderImage from '../../assets/img/team-header.png';
import teamImage from '../../assets/img/team-image.png';
import teamHeaderGroupImage from '../../assets/img/team-header-group.png';
import teamNumerologyCalcHeader from '../../assets/img/team-numerology-calculation.png';
import annualCalcImg from '../../assets/img/Annual-calculation.png';
import monthlyCalcImg from '../../assets/img/monthly-calculation.png';
import dailyCalcImg from '../../assets/img/daily-calculatiom-header.png';

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
      <div className="results-header-wrapper">
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
      </div>
      
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
            <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
              <g id="Layer_1">
                <title>Sinastra Team</title>
                <g id="svg_11">
                  <rect stroke="#000" fill="#fff" x="4.99999" y="5.39999" width="44" height="42" id="svg_1" rx="10"/>
                  <text 
                    fill="#000000" 
                    strokeWidth="0" 
                    x="30.88344" 
                    y="35.65949" 
                    id="svg_2" 
                    fontSize={teamCalculo.al} 
                    fontFamily="'Rasa'" 
                    textAnchor="start" 
                    xmlSpace="preserve" 
                    stroke="#000" 
                    transform="matrix(2.24607 0 0 1.56781 -56.8742 -21.4045)" 
                    fontWeight="bold"
                  >
                    {teamCalculo.FA}
                  </text>
                </g>
                <g id="svg_14">
                  <rect stroke="#000" fill="#fff" x="52.99999" y="4.39999" width="44" height="42" id="svg_12" rx="10"/>
                  <text 
                    fill="#000000" 
                    strokeWidth="0" 
                    x="52.2541" 
                    y="35.02167" 
                    id="svg_13" 
                    fontSize={teamCalculo.bl} 
                    fontFamily="'Rasa'" 
                    textAnchor="start" 
                    xmlSpace="preserve" 
                    stroke="#000" 
                    transform="matrix(2.24607 0 0 1.56781 -56.8742 -21.4045)" 
                    fontWeight="bold"
                  >
                    {teamCalculo.FB}
                  </text>
                </g>
                <g id="svg_17">
                  <rect stroke="#000" fill="#fff" x="100.99999" y="5.39999" width="44" height="42" id="svg_15" rx="10"/>
                  <text 
                    fill="#000000" 
                    strokeWidth="0" 
                    x="73.62476" 
                    y="35.6595" 
                    id="svg_16" 
                    fontSize={teamCalculo.cl} 
                    fontFamily="'Rasa'" 
                    textAnchor="start" 
                    xmlSpace="preserve" 
                    stroke="#000" 
                    transform="matrix(2.24607 0 0 1.56781 -56.8742 -21.4045)" 
                    fontWeight="bold"
                  >
                    {teamCalculo.FC}
                  </text>
                </g>
                <g id="svg_20">
                  <rect stroke="#000" fill="#fff" x="148.99999" y="5.39999" width="44" height="42" id="svg_18" rx="10"/>
                  <text 
                    fill="#000000" 
                    strokeWidth="0" 
                    x="94.99542" 
                    y="35.6595" 
                    id="svg_19" 
                    fontSize={teamCalculo.dl} 
                    fontFamily="'Rasa'" 
                    textAnchor="start" 
                    xmlSpace="preserve" 
                    stroke="#000" 
                    transform="matrix(2.24607 0 0 1.56781 -56.8742 -21.4045)" 
                    fontWeight="bold"
                  >
                    {teamCalculo.FD}
                  </text>
                </g>
              </g>
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
              <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
                <g id="Layer_1">
                  <title>Sinastra Team</title>
                  <g id="svg_11">
                    <rect stroke="#000" fill="#fff" x="4.99999" y="5.39999" width="44" height="42" id="svg_1" rx="10"/>
                    <text 
                      fill="#000000" 
                      strokeWidth="0" 
                      x="30.88344" 
                      y="35.65949" 
                      id="svg_2" 
                      fontSize={sinastra.al} 
                      fontFamily="'Rasa'" 
                      textAnchor="start" 
                      xmlSpace="preserve" 
                      stroke="#000" 
                      transform="matrix(2.24607 0 0 1.56781 -56.8742 -21.4045)" 
                      fontWeight="bold"
                    >
                      {sinastra.A}
                    </text>
                  </g>
                  <g id="svg_14">
                    <rect stroke="#000" fill="#fff" x="52.99999" y="4.39999" width="44" height="42" id="svg_12" rx="10"/>
                    <text 
                      fill="#000000" 
                      strokeWidth="0" 
                      x="52.2541" 
                      y="35.02167" 
                      id="svg_13" 
                      fontSize={sinastra.bl} 
                      fontFamily="'Rasa'" 
                      textAnchor="start" 
                      xmlSpace="preserve" 
                      stroke="#000" 
                      transform="matrix(2.24607 0 0 1.56781 -56.8742 -21.4045)" 
                      fontWeight="bold"
                    >
                      {sinastra.B}
                    </text>
                  </g>
                  <g id="svg_17">
                    <rect stroke="#000" fill="#fff" x="100.99999" y="5.39999" width="44" height="42" id="svg_15" rx="10"/>
                    <text 
                      fill="#000000" 
                      strokeWidth="0" 
                      x="73.62476" 
                      y="35.6595" 
                      id="svg_16" 
                      fontSize={sinastra.cl} 
                      fontFamily="'Rasa'" 
                      textAnchor="start" 
                      xmlSpace="preserve" 
                      stroke="#000" 
                      transform="matrix(2.24607 0 0 1.56781 -56.8742 -21.4045)" 
                      fontWeight="bold"
                    >
                      {sinastra.C}
                    </text>
                  </g>
                  <g id="svg_20">
                    <rect stroke="#000" fill="#fff" x="148.99999" y="5.39999" width="44" height="42" id="svg_18" rx="10"/>
                    <text 
                      fill="#000000" 
                      strokeWidth="0" 
                      x="94.99542" 
                      y="35.6595" 
                      id="svg_19" 
                      fontSize={sinastra.dl} 
                      fontFamily="'Rasa'" 
                      textAnchor="start" 
                      xmlSpace="preserve" 
                      stroke="#000" 
                      transform="matrix(2.24607 0 0 1.56781 -56.8742 -21.4045)" 
                      fontWeight="bold"
                    >
                      {sinastra.D}
                    </text>
                  </g>
                </g>
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