import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import calculosUtils from '../../utils/calculosUtils';
import './TeamComponent.css';

// Import images directly
import leftDecoration from '../../assets/img/Lleft.png';
import rightDecoration from '../../assets/img/Lright.png';
import logoImage from '../../assets/img/logonumerana80.png';

const TeamComponent = () => {
  const navigate = useNavigate();
  
  // State for team members
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
  
  // Add team member
  const addTeamMember = () => {
    const currentLength = teamMembers.length;
    setTeamMembers([
      ...teamMembers, 
      { id: currentLength, name: '', birthdate: '' }
    ]);
  };
  
  // Remove team member
  const removeTeamMember = () => {
    if (teamMembers.length <= 3) {
      return;
    }
    
    setTeamMembers(teamMembers.slice(0, -1));
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
          const mainLine = calculosUtils.GetFirstLine(birthdate);
          
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
    <div className="containerBox" style={{
      border: '5px solid #858585', 
      borderRadius: '5px',
      display: !resultados && isVisible ? 'block' : 'none'
    }}>
      <div className="row">
        <div className="col-2 person resultado2">
          <img src={leftDecoration} className="Lleft" alt="Left decoration" />
        </div>
        <div className="col-8" style={{ textAlign: 'center' }}>
          <img src={logoImage} alt="numeranamx" className="logo" style={{ height: '80px' }} />
          <h1 className="titulom">Numerology | Numerología</h1>
        </div>
        <div className="col-2 person">
          <img src={rightDecoration} className="Lright" alt="Right decoration" />
        </div>
      </div>
      
      {teamMembers.map((member, index) => (
        <div className="row text-center" key={member.id}>
          <div className="col-md-2 text-center" style={{ marginTop: 'auto', marginBottom: 'auto', fontWeight: 700 }}>
            #{index + 1}
          </div>
          <div className="col-md-4">
            <label htmlFor={`Name_${member.id}`}><b>Name/Nombre</b></label>
            <input 
              type="text" 
              style={{ display: 'inline-table' }} 
              autoComplete="off" 
              className="form-control" 
              placeholder="Name/Nombre" 
              id={`Name_${member.id}`}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor={`Birthdate_${member.id}`}><b>Birthdate/Cumpleaños</b></label>
            <input
              className="form-control"
              style={{ display: 'inline-table' }}
              placeholder="dd/mm/yyyy"
              type="text"
              id={`Birthdate_${member.id}`}
            />
          </div>
          <div className="col-md-2"></div>
        </div>
      ))}
      
      <div className="row containerBox">
        <div className="col-3">
          <button 
            style={{ marginTop: '1rem' }} 
            type="button" 
            onClick={removeTeamMember} 
            className="btn btn-primary btn-lg btn-block send"
          >
            <i className="bi bi-dash-circle-fill" style={{ zoom: 2, lineHeight: 1 }}></i>
          </button>
        </div>
        <div className="col-1"></div>
        <div className="col-4">
          <button 
            style={{ marginTop: '1rem' }} 
            type="button" 
            onClick={handleSubmit} 
            className="btn btn-primary btn-lg btn-block send"
          >
            <i className="bi bi-play-btn-fill" style={{ zoom: 2, lineHeight: 1 }}></i>
          </button>
        </div>
        <div className="col-1"></div>
        <div className="col-3">
          <button 
            style={{ marginTop: '1rem' }} 
            type="button" 
            onClick={addTeamMember} 
            className="btn btn-primary btn-lg btn-block send"
          >
            <i className="bi bi-plus-circle-fill" style={{ zoom: 2, lineHeight: 1 }}></i>
          </button>
        </div>
      </div>
      
      <div className="row">
        <div className="col-2"></div>
        <div className="col-2"></div>
        <div className="col-8"><h2 className="website" style={{ fontSize: '11px' }}>www.numerana.com</h2></div>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-2"></div>
        <div className="col-8"><h2 className="website" style={{ fontSize: '11px' }}>By: Ana Dorotea</h2></div>
      </div>
    </div>
  );
  
  // Render the results
  const renderResults = () => (
    <div>
      <div className="containerBox" style={{
        border: '5px solid #858585', 
        borderRadius: '5px',
        display: resultados ? 'block' : 'none'
      }}>
        <div className="row">
          <div className="col-2 person resultado2">
            <img src={leftDecoration} className="Lleft" alt="Left decoration" />
          </div>
          <div className="col-8" style={{ textAlign: 'center' }}>
            <img src={logoImage} alt="numeranamx" className="logo" style={{ height: '80px' }} />
            <h1 className="titulom">Numerology | Numerología</h1>
          </div>
          <div className="col-2 person">
            <img src={rightDecoration} className="Lright" alt="Right decoration" />
          </div>
        </div>
        
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <button 
              type="button" 
              onClick={reload} 
              className="btn btn-primary btn-lg btn-block send"
            >
              <i className="bi bi-arrow-clockwise" style={{ zoom: 2, lineHeight: 1 }}></i>
            </button>
          </div>
          <div className="col-3"></div>
        </div>
        
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>
          <div className="col-8"><h2 className="website" style={{ fontSize: '11px' }}>www.numerana.com</h2></div>
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>
          <div className="col-8"><h2 className="website" style={{ fontSize: '11px' }}>By: Ana Dorotea</h2></div>
        </div>
      </div>
      
      <div className="results" style={{ marginTop: '2rem', display: resultados ? 'block' : 'none' }}>
        {sinastraE.map((sinastra, i) => (
          <div className="row" key={i}>
            <div className="col-1"></div>
            <div className="col-5">
              <p style={{ marginBottom: 0, fontWeight: 600 }}>{sinastra.nombre}</p>
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
        
        <br />
        
        <div className="row">
          <div className="col-1"></div>
          <div className="col-5">
            <p style={{ marginBottom: 0, fontWeight: 600 }}>Team Sinestry</p>
            <p style={{ fontWeight: 600 }}>Sinestria de Equipo</p>
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
      </div>
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