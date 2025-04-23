import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Couple from './pages/couple/Couple';
import Team from './pages/team/Team';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/single" element={<Single />} />
          <Route path="/reload" element={<Single />} />
          <Route path="/couple" element={<Couple />} />
          <Route path="/team" element={<Team />} />
          <Route path="/reloadc" element={<Single />} />
          <Route path="/reloadt" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 