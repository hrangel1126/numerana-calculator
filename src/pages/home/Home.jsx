import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this path is correct
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'; // Assuming path is correct
import { useTranslation } from '../../utils/i18n/LanguageContext'; // Assuming path is correct
import 'bootstrap-icons/font/bootstrap-icons.css';

// Unused imports commented out for clarity
// import logoImage from '../../assets/img/logon.webp';
// import spanishFlag from '../../assets/img/span.png';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Renamed: main -> Home-main
    <main className="Home-main">
      <HeaderMenu />
      {/* Renamed: content -> Home-content */}
      <div className="Home-content" style={{ marginTop: '11vh' }}>
        {loading ? (
          // Renamed: loader-container -> Home-loaderContainer
          <div className="Home-loaderContainer">
            {/* Kept lds-ripple as it's specific */}
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
        ) : (
          // Renamed: bntcontain -> Home-btnContain
          <div className="Home-btnContain">
            {/* --- Personal Button --- */}
             {/* Renamed: row -> Home-row */}

             <div className="Home-row" style={{ marginTop: '1rem' }}>
              <div className="Home-col12 Home-title">Single Basic</div>
            </div>
            <div className="Home-row">
              <div className="Home-col12 Home-dFlex Home-justifyCenter">
                <div className="Home-buttonContainer Home-button1">
                  <span className="Home-buttonHoverContent">
                    <i className="bi bi-person-fill Home-iconHover"></i>
                  </span>
                  <Link to="/singlebasic">
                    <span className="Home-buttonContent" aria-label="Single Basic">
                      <i className="bi bi-person Home-icon"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="Home-row">
               {/* Renamed: col-12 -> Home-col12, title -> Home-title */}
              <div className="Home-col12 Home-title">{t('home.personal')}</div>
            </div>
            <div className="Home-row">
               {/* Renamed: col-12 -> Home-col12, d-flex -> Home-dFlex, justify-content-center -> Home-justifyCenter */}
              <div className="Home-col12 Home-dFlex Home-justifyCenter">
                 {/* Renamed: button-container -> Home-buttonContainer, button-1 -> Home-button1 */}
                <div className="Home-buttonContainer Home-button1">
                  {/* Renamed: mas -> Home-buttonHoverContent */}
                  <span className="Home-buttonHoverContent">
                     {/* Renamed: iconin -> Home-iconHover */}
                    <i className="bi bi-person-fill Home-iconHover"></i>
                  </span>
                  <Link to="/single">
                     {/* Renamed: button-content -> Home-buttonContent */}
                    <span className="Home-buttonContent" aria-label={t('home.personal')}>
                       {/* Renamed: icon -> Home-icon */}
                      <i className="bi bi-person Home-icon"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* --- Single Basic Button --- */}
         

            {/* --- Couple/Pareja Button --- */}
            <div className="Home-row" style={{ marginTop: '1.5rem' }}>
              <div className="Home-col12 Home-title">{t('home.couple')}</div>
            </div>
            <div className="Home-row">
              <div className="Home-col12 Home-dFlex Home-justifyCenter">
                 {/* Renamed: button-container -> Home-buttonContainer, button-2 -> Home-button2 */}
                <div className="Home-buttonContainer Home-button2">
                  <span className="Home-buttonHoverContent">
                    <i className="bi bi-people-fill Home-iconHover"></i>
                  </span>
                  <Link to="/couple">
                    <span className="Home-buttonContent" aria-label={t('home.couple')}>
                      <i className="bi bi-people Home-icon"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* --- Team/Equipo Button --- */}
            <div className="Home-row" style={{ marginTop: '1.5rem' }}>
              <div className="Home-col12 Home-title">{t('home.team')}</div>
            </div>
            <div className="Home-row">
              <div className="Home-col12 Home-dFlex Home-justifyCenter">
                 {/* Renamed: button-container -> Home-buttonContainer, button-3 -> Home-button3 */}
                <div className="Home-buttonContainer Home-button3">
                  <span className="Home-buttonHoverContent">
                    <i className="bi bi-people-fill Home-iconHover"></i>
                    <i className="bi bi-person-fill Home-iconHover"></i>
                  </span>
                  <Link to="/team">
                    <span className="Home-buttonContent" aria-label={t('home.team')}>
                      <i className="bi bi-people Home-icon"></i>
                      <i className="bi bi-person Home-icon"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
};

export default Home;