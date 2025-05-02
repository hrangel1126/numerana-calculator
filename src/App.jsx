import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Couple from './pages/couple/Couple';
import { Team } from './pages/team/Team';
import SingleBasic from './pages/singlebasic/SingleBasic';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { LanguageProvider } from './utils/i18n/LanguageContext';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home setShowMenu={setShowMenu} />} />
            <Route path="/single" element={<Single setShowMenu={setShowMenu} />} />
            <Route path="/singlebasic" element={<SingleBasic setShowMenu={setShowMenu} />} />
            <Route path="/reload" element={<Single setShowMenu={setShowMenu} />} />
            <Route path="/couple" element={<Couple setShowMenu={setShowMenu} />} />
            <Route path="/team" element={<Team setShowMenu={setShowMenu} />} />
            <Route path="/reloadc" element={<Single setShowMenu={setShowMenu} />} />
            <Route path="/reloadt" element={<Team setShowMenu={setShowMenu} />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App; 