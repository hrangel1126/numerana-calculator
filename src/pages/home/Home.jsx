import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import { useTranslation } from '../../utils/i18n/LanguageContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import logo for navbar
import logoImage from '../../assets/img/logon.webp';
import spanishFlag from '../../assets/img/span.png';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="main">
      <HeaderMenu />
      <div className="content" style={{ marginTop: '11vh' }}>
        {loading ? (
          <div className="lds-ripple"><div></div><div></div></div>
        ) : (
          <div className="bntcontain">
            <div className="row">
              <div className="col-12 title">{t('home.personal')}</div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="button-container button-1">
                  <span className="mas">
                    <i className="bi bi-person-fill iconin"></i>
                  </span>
                  <Link to="/single">
                    <button type="button" name="Hover">
                      <i className="bi bi-person icon"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: '1.5rem' }}>
              <div className="col-12 title">{t('home.couple')}</div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="button-container button-2">
                  <span className="mas">
                    <i className="bi bi-people-fill iconin"></i>
                  </span>
                  <Link to="/couple">
                    <button type="button" name="Hover">
                      <i className="bi bi-people icon"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: '1.5rem' }}>
              <div className="col-12 title">{t('home.team')}</div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="button-container button-3">
                  <span className="mas">
                    <i className="bi bi-people-fill iconin"></i>
                    <i className="bi bi-people-fill iconin flipped"></i>
                  </span>
                  <Link to="/team">
                    <button type="button" name="Hover">
                      <i className="bi bi-people icon"></i>
                      <i className="bi bi-people icon flipped"></i>
                    </button>
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