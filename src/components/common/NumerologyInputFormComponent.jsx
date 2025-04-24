import React from 'react';
import leftDecoration from '../../assets/img/Lleft.png';
import rightDecoration from '../../assets/img/Lright.png';
import logoImage from '../../assets/img/logonumerana80.png';
import './SingleComponent.css';

const NumerologyInputFormComponent = ({ 
  isVisible, 
  resultados, 
  nombre, 
  setNombre, 
  birthdate, 
  birthdateShow, 
  handleBirthdateChange, 
  handleSubmit, 
  birthRef 
}) => {
  return (
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
};

export default NumerologyInputFormComponent; 