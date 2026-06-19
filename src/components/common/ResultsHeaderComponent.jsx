import React from 'react';
import './SingleComponent.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import caracolIcon from '../../assets/img/caracol.png';

const ResultsHeaderComponent = ({ 
  resultados, 
  nombre, 
  birthdateShow, 
  reload, 
  downloadPdf, 
  getScreenWidth,
  print,
  t
}) => {
  return (
    <div className="Results-header">
      <div className="Results-headerContent">
        {/* Name and Date Section */}
        {/* <div className="Results-personInfo">
          <h1 className="Results-personName">{nombre}</h1>
          <p className="Results-birthdate">{birthdateShow}</p> */}
          
          {/* Info Text */}
          {/* <p className="Results-descriptionText Results-descriptionText--left">
            This map is generated from your birthdate and forms a structured pattern of your energy.<br />
            Each number is placed with intention, revealing how different aspects of your personality connect and influence one another.<br />
            The outer points reflect visible traits, while the inner connections represent deeper patterns.
          </p> */}
          
          {/* Call to Action */}
          {/* <p className="Results-ctaText">
            Download the result and if you're interested in learning more, we highly recommend taking a Numerology Courses and/or a personal session with our consultants.
          </p>
        </div> */}
      </div>
      
       {/* Action Buttons */}
       <div className="Results-actions">
         <button 
           type="button" 
           onClick={downloadPdf} 
           className="Results-btnPrimary Results-btnSecondary"
         >
           <img src={caracolIcon} alt="caracol" className="Results-caracolIcon" />
           Download PDF
         </button>
        <button 
          type="button" 
          onClick={reload} 
          className="Results-btnPrimary"
        >
          Learn Numerology ↓
        </button>
      </div>
    </div>
  );
};

export default ResultsHeaderComponent; 