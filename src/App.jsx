import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeNumerana from './pages/numerana/HomeNumerana';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Couple from './pages/couple/Couple';
import { Team } from './pages/team/Team';
import SingleBasic from './pages/singlebasic/SingleBasic';
// import 'bootstrap/dist/css/bootstrap.min.css';
// BrowserRouter
import './App.css';
import { LanguageProvider } from './utils/i18n/LanguageContext';
import { MenuVisibilityProvider } from './utils/i18n/MenuVisibilityContext';

function App() {
  // Determine basename based on environment
  // Development (npm start): basename = '/'
  // Production (GitHub Pages): basename = '/numerana-calculator'
  const basename = process.env.NODE_ENV === 'production' 
    ? '/numerana-calculator' 
    : '/';

  return (
    <LanguageProvider>
      <MenuVisibilityProvider>
        <Router basename={basename}>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomeNumerana />} />
              <Route path="/home" element={<Home />} />
              <Route path="/homenumerana" element={<HomeNumerana />} />
              <Route path="/single" element={<Single />} />
              <Route path="/singlebasic" element={<SingleBasic />} />
              <Route path="/reload" element={<Single />} />
              <Route path="/couple" element={<Couple />} />
              <Route path="/team" element={<Team />} />
              <Route path="/reloadc" element={<Single />} />
              <Route path="/reloadt" element={<Team />} />
            </Routes>
          </div>
        </Router>
      </MenuVisibilityProvider>
    </LanguageProvider>
  );
}

export default App; 