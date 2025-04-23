import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Couple from './pages/couple/Couple';
import { Team } from './pages/team/Team';
import Menu from './components/Menu';
import './App.css';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  
  return (
    <Router>
      <div className="App">
        {showMenu && <div className="menudiv"><Menu /></div>}
        
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home setShowMenu={setShowMenu} />} />
          <Route path="/single" element={<Single setShowMenu={setShowMenu} />} />
          <Route path="/reload" element={<Single setShowMenu={setShowMenu} />} />
          <Route path="/couple" element={<Couple setShowMenu={setShowMenu} />} />
          <Route path="/team" element={<Team setShowMenu={setShowMenu} />} />
          <Route path="/reloadc" element={<Single setShowMenu={setShowMenu} />} />
          <Route path="/reloadt" element={<Team setShowMenu={setShowMenu} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 