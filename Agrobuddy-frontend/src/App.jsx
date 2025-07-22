import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import Disease from './pages/Disease';
import NotFound from './pages/NotFound';
import Marquee from './components/Marquee';
import './App.css';
import './index.css';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedState, setSelectedState] = useState('');

  return (
    <Router>
      <div className=" min-h-screen min-w-full bg-gray-900 text-white">
        <Header 
          selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage} 
          selectedState={selectedState} 
          setSelectedState={setSelectedState} 
        />
        <Marquee state={selectedState} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/disease" element={<Disease />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
