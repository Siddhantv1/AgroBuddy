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

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language.label);

    if (language.value === 'en-US') {
      window.location.reload();
      return;
    }

    // render page before translating DOM
    setTimeout(async () => {
      const contentRoot = document.getElementById('page-content');
      if (!contentRoot) {
        console.error("Could not find page content to translate.");
        return;
      }

      const walker = document.createTreeWalker(
        contentRoot,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      //here we use the node traversal for DOM, which would identify all text content from componnets
      let node;
      const textNodes = [];
      while ((node = walker.nextNode())) {
        if (node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE') {
          if (node.nodeValue.trim() !== '') {
            textNodes.push(node);
          }
        }
      }

      for (const node of textNodes) {
        const originalText = node.nodeValue;
        try {
          const response = await fetch('http://localhost:5000/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: originalText,
              target_language: language.value,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.translated_text) {
              node.nodeValue = data.translated_text;
            }
          } else {
            console.error('Translation failed:', await response.text());
          }
        } catch (error) {
          console.error('Translation error:', error);
        }
      }
    }, 100); // 100ms delay to allow for rendering
  };

  return (
    <Router>
      <div className=" min-h-screen min-w-full bg-gray-900 text-white">
        <Header 
          selectedLanguage={selectedLanguage} 
          handleLanguageChange={handleLanguageChange} 
          selectedState={selectedState} 
          setSelectedState={setSelectedState} 
        />
        <Marquee state={selectedState} />
        <main id="page-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
