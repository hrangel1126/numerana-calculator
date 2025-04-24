import React from 'react';
import leftDecoration from '../../assets/img/Lleft.png';
import rightDecoration from '../../assets/img/Lright.png';
import logoImage from '../../assets/img/logonumerana80.png';
import './SingleComponent.css';

const ResultsHeaderComponent = ({ 
  resultados, 
  nombre, 
  birthdateShow, 
  reload, 
  downloadPdf, 
  getScreenWidth,
  print 
}) => {
  return (
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
  );
};

export default ResultsHeaderComponent; 