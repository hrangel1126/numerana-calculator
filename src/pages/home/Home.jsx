import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import { useTranslation } from '../../utils/i18n/LanguageContext';
import NumerologyInputFormComponent from '../../components/common/NumerologyInputFormComponent';
import 'bootstrap-icons/font/bootstrap-icons.css';
import p3Image from '../../assets/img/p3.png';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [birthdateShow, setBirthdateShow] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBirthdateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    setBirthdate(value);
    setBirthdateShow(value);
  };

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      alert(t('validation.nameRequired') || 'Please enter your name');
      return;
    }
    if (!birthdate.trim()) {
      alert(t('validation.birthdateRequired') || 'Please enter your birthdate');
      return;
    }
    // Form submission will be handled by SingleComponent
  };

  return (
    <main className="Home-main">
      <HeaderMenu />
      <div className="Home-content">
        {loading ? (
          <div className="Home-loaderContainer">
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
        ) : (
          <div className="Home-container">
            {/* Left side - Form section */}
            <div className="Home-leftSection">
              <div className="Home-logo-badge">
                <i className="bi bi-star-fill"></i>
                <span>{t('home.numerologyCalculator') || 'NUMEROLOGY CALCULATOR'}</span>
              </div>
              
              <h1 className="Home-mainTitle">
                {t('home.mainTitle') || 'Find What Your Numbers Say About You'}
              </h1>
              
              <p className="Home-subtitle">
                {t('home.subtitle') || 'Enter your details and discover what your numbers reveal.'}
              </p>

              <div className="Home-formSection">
                <div className="Home-formGroup">
                  <label htmlFor="name">{t('home.nameLabel') || 'What name were you given at birth?'}</label>
                  <input
                    type="text"
                    id="name"
                    className="Home-formInput"
                    placeholder={t('home.namePlaceholder') || 'John Doe'}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="Home-formGroup">
                  <label htmlFor="birthdate">{t('home.birthdateLabel') || 'When did you soul enter this world?'}</label>
                  <input
                    type="text"
                    id="birthdate"
                    className="Home-formInput"
                    placeholder="dd/mm/yyyy"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                  />
                </div>

                <div className="Home-formGroup">
                  <label htmlFor="email">{t('home.emailLabel') || 'What is Your Email?'}</label>
                  <input
                    type="email"
                    id="email"
                    className="Home-formInput"
                    placeholder={t('home.emailPlaceholder') || 'ava.wright@gmail.com'}
                  />
                </div>

                <button className="Home-calculateBtn" onClick={handleSubmit}>
                  <i className="bi bi-calculator-fill"></i>
                  {t('home.calculateButton') || 'Calculate Now'}
                </button>
              </div>
            </div>

            {/* Right side - Hero image section (desktop only) */}
            <div className="Home-rightSection">
              <img src={p3Image} alt="Numerology" className="Home-heroImage" />
              <div className="Home-heroDecoration">
                <p className="Home-heroText">Clarity & Guidance</p>
                <p className="Home-heroTextBottom">Your Numbers Hold Meaning</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;