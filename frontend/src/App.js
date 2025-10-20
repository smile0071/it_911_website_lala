import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div className="App">
      <ParallaxProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </BrowserRouter>
      </ParallaxProvider>
    </div>
  );
}

export default App;